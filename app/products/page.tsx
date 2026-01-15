'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from '@/types';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setSelectedCategory(category);

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
  }, [searchParams]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const categories = ['all', 'furniture', 'decor', 'lighting', 'textiles', 'accessories'];

  return (
    <div>
      <Header />
      
      <div className="products-page">
        <div className="container">
          <h1>Our Products</h1>
          
          <div className="filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">No products found in this category.</div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .products-page {
          padding: 40px 0 80px;
          min-height: calc(100vh - 80px);
        }

        h1 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 30px;
        }

        .filters {
          display: flex;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          background: white;
          border: 2px solid #e5e7eb;
          color: #6b7280;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #2563eb;
          color: #2563eb;
        }

        .filter-btn.active {
          background: #2563eb;
          border-color: #2563eb;
          color: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }

        .loading,
        .no-products {
          text-align: center;
          padding: 60px;
          font-size: 18px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div>
        <Header />
        <div className="loading">Loading...</div>
        <style jsx>{`
          .loading {
            text-align: center;
            padding: 60px;
            font-size: 18px;
            color: #6b7280;
          }
        `}</style>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
