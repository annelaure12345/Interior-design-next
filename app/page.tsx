'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { FiHome, FiStar } from 'react-icons/fi';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Space</h1>
          <p>Discover premium interior design products that bring style and comfort to your home</p>
          <Link href="/products" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <Link href="/products" className="view-all">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories-grid">
            {['furniture', 'decor', 'lighting', 'textiles'].map(category => (
              <Link key={category} href={`/products?category=${category}`} className="category-card">
                <div className="category-icon">
                  <FiHome size={32} />
                </div>
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 120px 20px;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 48px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .hero-content p {
          font-size: 20px;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .section {
          padding: 80px 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .section-header h2 {
          font-size: 32px;
          font-weight: 700;
        }

        .view-all {
          color: #2563eb;
          font-weight: 600;
          font-size: 16px;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .loading {
          text-align: center;
          padding: 60px;
          font-size: 18px;
          color: #6b7280;
        }

        .categories-section {
          background: white;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .category-card {
          padding: 40px;
          text-align: center;
          background: #f9fafb;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          background: #f3f4f6;
          transform: translateY(-4px);
        }

        .category-icon {
          margin-bottom: 16px;
          color: #2563eb;
        }

        .category-card h3 {
          font-size: 20px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
