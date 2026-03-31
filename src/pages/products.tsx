import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const PRODUCTS = [
    { name: 'Hapas Luxe Gold', price: '1.250.000đ', image: '/img/products-grid.png' },
    { name: 'Hapas Chic Black', price: '950.000đ', image: '/img/hero-bg.jpg' },
    { name: 'Hapas Urban Red', price: '1.100.000đ', image: '/img/products-grid.png' },
    { name: 'Hapas Minimalist', price: '850.000đ', image: '/img/hero-bg.jpg' },
    { name: 'Hapas Vintage Brown', price: '1.450.000đ', image: '/img/products-grid.png' },
    { name: 'Hapas Modern Blue', price: '1.050.000đ', image: '/img/hero-bg.jpg' },
];

export default function Products(): JSX.Element {
    return (
        <Layout title="Tất cả sản phẩm">
            <div style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>SẢN PHẨM CHI TIẾT</h1>
                <div className="product-grid">
                    {PRODUCTS.map((p, i) => (
                        <div key={i} className="product-card">
                            <img src={useBaseUrl(p.image)} alt={p.name} className="product-image" />
                            <div className="product-info">
                                <h3 className="product-name">{p.name}</h3>
                                <p className="product-price">{p.price}</p>
                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                                    <button className="btn-premium" style={{ border: 'none', cursor: 'pointer' }}>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
