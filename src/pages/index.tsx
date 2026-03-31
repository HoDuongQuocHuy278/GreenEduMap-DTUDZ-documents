import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Hapas - Túi xách thời trang cao cấp"
      description="Thương hiệu túi xách hàng đầu Việt Nam">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap" rel="stylesheet" />
      </Head>
      <main>
        <div className="hero-container">
          <img
            src={useBaseUrl('/img/hero-bg.jpg')}
            alt="Hapas Hero Bag"
            className="hero-image"
          />
          <div className="hero-content">
            <h1 className="hero-title">HAPAS</h1>
            <p style={{ fontSize: '1.5rem', letterSpacing: '2px', fontWeight: 300 }}>
              SỰ TINH TẾ TRONG TỪNG ĐƯỜNG NÉT
            </p>
            <a href={useBaseUrl('/products')} className="btn-premium">
              Khám phá ngay
            </a>
          </div>
        </div>

        <div style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#111' }}>VỀ CHÚNG TÔI</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#555', lineHeight: '1.8' }}>
            Hapas không chỉ là một thương hiệu túi xách, mà là biểu tượng của phong cách sống hiện đại.
            Mỗi sản phẩm của chúng tôi đều được chế tác từ những chất liệu cao cấp nhất,
            mang đến sự tự tin và sang trọng cho người phụ nữ Việt.
          </p>
        </div>
      </main>
    </Layout>
  );
}
