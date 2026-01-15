'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types';
import Header from '@/components/Header';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      router.push('/cart');
      return;
    }
    setCartItems(cart);
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      ...formData
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        router.push('/order-success');
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div>
      <Header />
      
      <div className="checkout-page">
        <div className="container">
          <h1>Checkout</h1>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-sections">
              <div className="form-section">
                <h2>Shipping Information</h2>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                  <div className="form-group">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2>Payment Information</h2>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="input"
                    maxLength={19}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      required
                      className="input"
                      maxLength={5}
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="input"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.product.id} className="summary-item">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary submit-btn"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .checkout-page {
          padding: 40px 0 80px;
          min-height: calc(100vh - 80px);
        }

        h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .checkout-form {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }

        .form-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        .form-section h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #374151;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .order-summary {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .order-summary h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .summary-items {
          margin-bottom: 20px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 14px;
          color: #6b7280;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: 700;
          padding-top: 16px;
          border-top: 2px solid #e5e7eb;
          margin-bottom: 24px;
        }

        .submit-btn {
          width: 100%;
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 968px) {
          .checkout-form {
            grid-template-columns: 1fr;
          }

          .order-summary {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
