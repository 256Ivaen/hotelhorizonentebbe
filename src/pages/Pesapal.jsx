// Example usage in your parent component file (e.g., PesapalPage.jsx)
import React, { useState } from 'react';
import PesapalPayment from '../components/Payment/PesapalPayment';

const PesapalPage = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(null);
  
  // Example data for the payment
  const paymentData = {
    amount: 1000, // Make sure this is a number
    description: "Order payment",
    reference: "ORD-" + Date.now(),
    customerEmail: "customer@example.com",
    customerName: "John Doe",
    customerPhone: "256700123456"
  };
  
  const handlePaymentComplete = (info) => {
    console.log('Payment completed:', info);
    setPaymentInfo(info);
    setPaymentComplete(true);
    // You can redirect to a thank you page or update your order status here
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      {paymentComplete ? (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-green-200">
          <h2 className="text-2xl text-green-700 font-semibold mb-4 text-center">Payment Successful!</h2>
          <p className="text-center mb-4">Thank you for your payment.</p>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><strong>Reference:</strong> {paymentInfo?.reference}</p>
            <p><strong>Transaction ID:</strong> {paymentInfo?.transactionId}</p>
            <p><strong>Status:</strong> {paymentInfo?.status}</p>
          </div>
        </div>
      ) : (
        <PesapalPayment 
          amount={paymentData.amount}
          description={paymentData.description}
          reference={paymentData.reference}
          customerEmail={paymentData.customerEmail}
          customerName={paymentData.customerName}
          customerPhone={paymentData.customerPhone}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default PesapalPage;