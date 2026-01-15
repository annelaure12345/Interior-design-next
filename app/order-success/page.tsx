'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import { FiCheckCircle } from 'react-icons/fi';

export default function OrderSuccessPage() {
  return (
    <div>
      <Header />
      
      <div className="success-page">
        <div className="container">
          <div className="success-content">
            <FiCheckCircle size={80} color="#10b981" />
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. We'll send you a confirmation email shortly.</p>
            <div className="success-actions">
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn btn-outline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .success-page {
          padding: 80px 0;
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
        }

        .success-content {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          background: white;
          padding: 60px 40px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .success-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin: 24px 0 16px;
        }

        .success-content p {
          font-size: 18px;
          color: #6b7280;
          margin-bottom: 40px;
        }

        .success-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .success-actions {
            flex-direction: column;
          }

          .success-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
