import React from 'react';
import { CheckCircle } from 'lucide-react';
import { replace, useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const navigate = useNavigate()
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <div className="payment-success-icon">
          <CheckCircle size={64} color="#4CAF50" />
        </div>
        <h1 className="payment-success-title">Payment Successful!</h1>
        <p className="payment-success-message">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <button className="payment-success-button" onClick={()=>{navigate("/",{replace:true})}}>Back to Home</button>
      </div>
      <style jsx>{`
        .payment-success-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f0f2f5;
          font-family: Arial, sans-serif;
        }
        .payment-success-card {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 40px;
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        .payment-success-icon {
          margin-bottom: 24px;
        }
        .payment-success-title {
          color: #333;
          font-size: 28px;
          margin-bottom: 16px;
        }
        .payment-success-message {
          color: #666;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 24px;
        }
        .payment-success-details {
          background-color: #f9f9f9;
          border-radius: 4px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .payment-success-details p {
          margin: 8px 0;
          color: #666;
        }
        .payment-success-detail-value {
          font-weight: bold;
          color: #333;
        }
        .payment-success-button {
          background-color: #4CAF50;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          padding: 12px 24px;
          transition: background-color 0.3s ease;
        }
        .payment-success-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccessPage;