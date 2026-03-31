import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Manufacturer(): JSX.Element {
    return (
        <Layout title="Thông tin nhà sản xuất">
            <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ marginBottom: '1rem' }}>NHÀ SẢN XUẤT ĐỐI TÁC</h1>
                <p style={{ color: '#666', marginBottom: '3rem' }}>Chúng tôi tự hào hợp tác với những nghệ nhân hàng đầu thế giới.</p>
                <div className="manufacturer-grid">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <div key={num} className="m-item">
                            <img
                                src={useBaseUrl('/img/manufacturers-grid.png')}
                                alt={`Manufacturer ${num}`}
                            />
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '4rem', padding: '2rem', background: '#f9f9f9', borderRadius: '15px' }}>
                    <h2>TIÊU CHUẨN CHẤT LƯỢNG</h2>
                    <p>Mọi nhà sản xuất của Hapas đều phải tuân thủ các quy trình kiểm định nghiêm ngặt về chất lượng da, đường may và độ bền của phụ kiện kim loại. Chúng tôi cam kết mang đến những sản phẩm hoàn hảo nhất cho khách hàng.</p>
                </div>
            </div>
        </Layout>
    );
}
