import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md mx-auto px-4">

        <h1 className="text-8xl font-light text-gray-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Page Not Found</h2>

        <p className="text-gray-600 text-xs leading-relaxed mb-4">
          Sorry, the page you're looking for doesn't exist or has been moved. Let's get you back to exploring our hotel.
        </p>

        <p className="text-gray-500 text-xs mb-8">
          Redirecting to homepage in <span className="font-semibold text-[#b97a38]">{countdown}</span> {countdown === 1 ? 'second' : 'seconds'}...
        </p>

        <div className="flex gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-[#b97a38] text-white px-8 py-3 rounded-lg hover:bg-[#a06830] transition-colors font-medium w-full text-xs uppercase"
          >
            Back to Home
          </Link>

          <Link
            to="/rooms"
            className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium w-full text-xs uppercase"
          >
            View Rooms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
