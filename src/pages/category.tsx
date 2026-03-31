import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const CATEGORIES = [
    { name: 'Túi Xách Tay', image: '/img/hero-bg.jpg', count: '120 sản phẩm' },
    { name: 'Túi Đeo Chéo', image: '/img/products-grid.png', count: '85 sản phẩm' },
    { name: 'Ví & Bóp', image: '/img/hero-bg.jpg', count: '45 sản phẩm' },
    { name: 'Balo Thời Trang', image: '/img/products-grid.png', count: '30 sản phẩm' },
];

export default function Category(): JSX.Element {
    return (
        <Layout title="Danh mục sản phẩm">
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>DANH MỤC SẢN PHẨM</h1>
                <div className="product-grid">
                    {CATEGORIES.map((cat, i) => (
                        <div key={i} className="product-card" style={{ cursor: 'pointer' }}>
                            <img src={useBaseUrl(cat.image)} alt={cat.name} className="product-image" />
                            <div className="product-info">
                                <h3>{cat.name}</h3>
                                <p>{cat.count}</p>
                                <a href={useBaseUrl('/products')} className="btn-premium">Xem ngay</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
