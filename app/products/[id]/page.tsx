'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import Header from '@/components/Header';
import { FiStar, FiShoppingCart } from 'react-icons/fi';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setLoading(false);
        });
    }
  }, [params.id]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="error">Product not found</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <div className="product-detail">
        <div className="container">
          <button onClick={() => router.back()} className="back-btn">
            ← Back
          </button>

          <div className="product-detail-content">
            <div className="product-image-large">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-details">
              <h1>{product.name}</h1>
              
              <div className="product-rating">
                <FiStar fill="#fbbf24" color="#fbbf24" size={20} />
                <span>{product.rating}</span>
                <span className="reviews">({product.reviews} reviews)</span>
              </div>

              <div className="price">${product.price.toFixed(2)}</div>

              <p className="description">{product.description}</p>

              <div className="product-meta">
                <div className="meta-item">
                  <strong>Category:</strong> {product.category}
                </div>
                <div className="meta-item">
                  <strong>Availability:</strong>{' '}
                  <span className={product.inStock ? 'in-stock' : 'out-of-stock'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>

                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="btn btn-primary add-to-cart-btn"
                >
                  <FiShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-detail {
          padding: 40px 0 80px;
          min-height: calc(100vh - 80px);
        }

        .back-btn {
          background: none;
          color: #2563eb;
          font-size: 16px;
          margin-bottom: 30px;
          padding: 8px 0;
        }

        .back-btn:hover {
          text-decoration: underline;
        }

        .product-detail-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .product-image-large {
          width: 100%;
          height: 600px;
          border-radius: 12px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .product-image-large img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-details h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          font-size: 16px;
        }

        .reviews {
          color: #6b7280;
        }

        .price {
          font-size: 36px;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 24px;
        }

        .description {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 30px;
        }

        .product-meta {
          margin-bottom: 30px;
        }

        .meta-item {
          margin-bottom: 12px;
          font-size: 16px;
        }

        .in-stock {
          color: #10b981;
          font-weight: 600;
        }

        .out-of-stock {
          color: #ef4444;
          font-weight: 600;
        }

        .add-to-cart-section {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px 16px;
        }

        .quantity-selector button {
          background: none;
          font-size: 20px;
          font-weight: 600;
          color: #2563eb;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity-selector span {
          font-size: 18px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }

        .add-to-cart-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .add-to-cart-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading,
        .error {
          text-align: center;
          padding: 60px;
          font-size: 18px;
        }

        .error {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .product-detail-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .product-image-large {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
}
