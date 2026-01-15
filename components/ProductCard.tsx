'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { FiStar } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <FiStar fill="#fbbf24" color="#fbbf24" size={16} />
          <span>{product.rating}</span>
          <span className="reviews">({product.reviews} reviews)</span>
        </div>
        <div className="product-footer">
          <span className="price">${product.price.toFixed(2)}</span>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          display: block;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #f3f4f6;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .out-of-stock {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .product-info {
          padding: 20px;
        }

        .product-info h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .product-description {
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .reviews {
          color: #6b7280;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 24px;
          font-weight: 700;
          color: #2563eb;
        }
      `}</style>
    </Link>
  );
}
