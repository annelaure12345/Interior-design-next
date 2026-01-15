'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/types';
import Header from '@/components/Header';
import { FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.product.id !== productId);
    updateCart(updatedCart);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    const updatedCart = cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div className="empty-cart">
          <div className="container">
            <h1>Shopping Cart</h1>
            <div className="empty-cart-content">
              <p>Your cart is empty</p>
              <Link href="/products" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          .empty-cart {
            padding: 80px 0;
            min-height: calc(100vh - 80px);
          }

          h1 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 40px;
          }

          .empty-cart-content {
            text-align: center;
            padding: 60px 20px;
          }

          .empty-cart-content p {
            font-size: 20px;
            color: #6b7280;
            margin-bottom: 30px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="cart-page">
        <div className="container">
          <h1>Shopping Cart</h1>

          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.product.id} className="cart-item">
                  <img src={item.product.image} alt={item.product.name} />
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-price">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <FiMinus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <FiPlus size={16} />
                      </button>
                    </div>
                    <div className="item-total">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="remove-btn"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="btn btn-primary checkout-btn"
              >
                Proceed to Checkout
              </button>
              <Link href="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-page {
          padding: 40px 0 80px;
          min-height: calc(100vh - 80px);
        }

        h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 40px;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 40px;
        }

        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          display: flex;
          gap: 20px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .cart-item img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .item-price {
          color: #6b7280;
          font-size: 14px;
        }

        .item-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 6px 12px;
        }

        .quantity-controls button {
          background: none;
          color: #2563eb;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity-controls span {
          min-width: 30px;
          text-align: center;
          font-weight: 600;
        }

        .item-total {
          font-size: 18px;
          font-weight: 700;
          color: #2563eb;
        }

        .remove-btn {
          background: #fee2e2;
          color: #ef4444;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .remove-btn:hover {
          background: #fecaca;
        }

        .cart-summary {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .cart-summary h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 16px;
        }

        .summary-row.total {
          font-size: 20px;
          font-weight: 700;
          padding-top: 16px;
          border-top: 2px solid #e5e7eb;
          margin-top: 16px;
        }

        .checkout-btn {
          width: 100%;
          margin-top: 24px;
          margin-bottom: 16px;
        }

        .continue-shopping {
          display: block;
          text-align: center;
          color: #2563eb;
          font-weight: 500;
        }

        .continue-shopping:hover {
          text-decoration: underline;
        }

        @media (max-width: 968px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .cart-item {
            flex-direction: column;
          }

          .cart-item img {
            width: 100%;
            height: 200px;
          }

          .item-controls {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
