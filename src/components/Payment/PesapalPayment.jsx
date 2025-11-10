import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://api.hotelhorizonug.com/payment-api.php'; // Correct path to your API file

const PesapalPayment = ({ 
  amount = 0, 
  description = 'Payment', 
  reference = '', 
  customerEmail = '', 
  customerName = '', 
  customerPhone = '',
  onPaymentComplete = () => {}
}) => {
  const [paymentUrl, setPaymentUrl] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(customerPhone || '');
  const [orderReference, setOrderReference] = useState(reference);
  
  // Generate a reference if not provided
  useEffect(() => {
    if (!orderReference) {
      const generatedRef = 'ORDER-' + Date.now();
      setOrderReference(generatedRef);
    }
  }, []);

  const handleCardPayment = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Requesting payment URL for:', {
        amount,
        reference: orderReference,
        email: customerEmail
      });
      
      const response = await axios.post(`${API_BASE_URL}?action=generate-payment`, {
        amount,
        description,
        reference: orderReference,
        email: customerEmail,
        first_name: customerName?.split(' ')[0] || '',
        last_name: customerName?.split(' ').slice(1).join(' ') || '',
        phone: customerPhone,
        currency: 'UGX',
        callback_url: window.location.origin + '/payment-complete'
      });
      
      console.log('Payment URL response:', response.data);
      
      if (response.data.iframe_url) {
        setPaymentUrl(response.data.iframe_url);
      } else {
        setError('Failed to generate payment URL: ' + (response.data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Payment API error:', err);
      setError(
        'Error connecting to payment service: ' + 
        (err.response?.data?.error || err.message || 'Network error')
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleMobileMoneyPayment = async () => {
    setIsLoading(true);
    setError('');
    
    if (!phoneNumber || phoneNumber.trim() === '') {
      setError('Please enter a valid phone number');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Requesting mobile money payment for:', {
        phone: phoneNumber,
        amount,
        reference: orderReference
      });
      
      const response = await axios.post(`${API_BASE_URL}?action=mobile-money`, {
        phone: phoneNumber,
        amount,
        reference: orderReference,
        description
      });
      
      console.log('Mobile money response:', response.data);
      
      if (response.data.status === 'SUCCESS' || response.data.status === 'PENDING') {
        onPaymentComplete({
          method: 'mobile_money',
          status: response.data.status,
          reference: orderReference,
          transactionId: response.data.transaction_id
        });
      } else {
        setError(response.data.message || response.data.error || 'Failed to process mobile money payment');
      }
    } catch (err) {
      console.error('Mobile Money API error:', err);
      setError(
        'Error connecting to payment service: ' + 
        (err.response?.data?.error || err.message || 'Network error')
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  const checkPaymentStatus = async (reference, trackingId) => {
    try {
      console.log('Checking payment status for:', { reference, trackingId });
      
      const response = await axios.get(
        `${API_BASE_URL}?action=status&reference=${reference}&tracking_id=${trackingId}`
      );
      
      console.log('Status response:', response.data);
      
      if (response.data.status) {
        onPaymentComplete({
          method: 'card',
          status: response.data.status,
          reference,
          transactionId: trackingId
        });
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
    }
  };
  
  // Handle postMessage events from the iframe
  useEffect(() => {
    const handleMessage = (event) => {
      console.log('Received postMessage event:', event);
      
      // Verify the origin to ensure security
      if (event.origin !== 'https://demo.pesapal.com' && event.origin !== 'https://www.pesapal.com') {
        console.log('Ignoring message from untrusted origin:', event.origin);
        return;
      }
      
      // Process the payment completion message
      if (event.data && event.data.pesapalTrackingId) {
        console.log('Payment completed with tracking ID:', event.data.pesapalTrackingId);
        checkPaymentStatus(orderReference, event.data.pesapalTrackingId);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [orderReference]);
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl text-gray-800 font-semibold mb-6 pb-4 text-center border-b border-gray-200">Payment Details</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <p className="my-2 text-base"><span className="font-semibold">Amount:</span> UGX {Number(amount).toLocaleString()}</p>
        <p className="my-2 text-base"><span className="font-semibold">Description:</span> {description || 'Not specified'}</p>
        <p className="my-2 text-base"><span className="font-semibold">Reference:</span> {orderReference}</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg text-gray-700 font-medium mb-4">Select Payment Method</h3>
        <div className="flex gap-3 mb-6">
          <button 
            className={`flex-1 py-3 px-4 rounded-md text-base transition-colors duration-200 border ${
              paymentMethod === 'card' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            Credit/Debit Card
          </button>
          <button 
            className={`flex-1 py-3 px-4 rounded-md text-base transition-colors duration-200 border ${
              paymentMethod === 'mobile' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
            }`}
            onClick={() => setPaymentMethod('mobile')}
          >
            Mobile Money (Uganda)
          </button>
        </div>
      </div>
      
      {paymentMethod === 'mobile' && (
        <div className="mt-6">
          <div className="mb-4">
            <label htmlFor="phone-number" className="block mb-2 font-semibold text-gray-700">Mobile Money Number:</label>
            <input 
              type="text"
              id="phone-number"
              placeholder="e.g., 256700123456"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <small className="block mt-1 text-gray-500 text-sm">Enter your MTN or Airtel Uganda number</small>
          </div>
          
          <button 
            className={`w-full py-4 px-4 rounded-md font-semibold text-base text-white ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={handleMobileMoneyPayment}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay with Mobile Money'}
          </button>
        </div>
      )}
      
      {paymentMethod === 'card' && (
        <div className="mt-6">
          {!paymentUrl ? (
            <button 
              className={`w-full py-4 px-4 rounded-md font-semibold text-base text-white ${
                isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
              onClick={handleCardPayment}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Pay with Card'}
            </button>
          ) : (
            <div className="mt-6 border border-gray-200 rounded-md overflow-hidden">
              <iframe 
                src={paymentUrl}
                className="w-full h-96 md:h-screen md:max-h-96"
                frameBorder="0"
                scrolling="no"
                title="Pesapal Payment Page"
              ></iframe>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default PesapalPayment;