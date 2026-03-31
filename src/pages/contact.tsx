import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';

const ContactParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: any[] = [];
        let mouse = { x: 0, y: 0 };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = '#d4af37';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;

                // Interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 175, 55, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(this.x, this.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} id="bg-particles" />;
};

export default function Contact(): JSX.Element {
    return (
        <Layout title="Liên hệ với chúng tôi">
            <div className="contact-container">
                <img
                    src={useBaseUrl('/img/contact-bg.jpg')}
                    className="contact-bg-img"
                    alt="Contact Background"
                />
                <ContactParticles />
                <div className="contact-card">
                    <h2>LIÊN HỆ</h2>
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Địa chỉ:</strong> 123 Đường Fashion, Quận 1, TP. HCM</p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>SĐT:</strong> 0123.456.789</p>
                        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}><strong>Email:</strong> contact@hapas.vn</p>
                        <p style={{ fontSize: '1.2rem' }}><strong>Giờ mở cửa:</strong> 9:00 - 21:00 (Tất cả các ngày)</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Họ và tên" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #d4af37', background: 'transparent', color: 'white' }} />
                        <input type="email" placeholder="Email" style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #d4af37', background: 'transparent', color: 'white' }} />
                        <textarea placeholder="Nội dung" rows={4} style={{ padding: '0.8rem', borderRadius: '5px', border: '1px solid #d4af37', background: 'transparent', color: 'white' }}></textarea>
                        <button className="btn-premium" style={{ border: 'none', cursor: 'pointer' }}>Gửi tin nhắn</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
