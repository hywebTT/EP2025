class AnkoEight extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'anko-dark';
        this.highlights = [
            {
                title: '餃子機械技術',
                desc: '47年專業經驗打造高效率餃子生產設備，每小時產能可達12,000個，品質穩定一致',
                img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=600&fit=crop',
                link: '技術詳情'
            },
            {
                title: '自動化生產線',
                desc: '整廠規劃設計服務，從原料處理到成品包裝的完整自動化解決方案',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop',
                link: '探索方案'
            },
            {
                title: '全球食品解決方案',
                desc: '銷售遍及114個國家，提供安心可口美食的全方位製造解決方案',
                img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=600&fit=crop',
                link: '成功案例'
            }
        ];
        this.render();
    }

    static get observedAttributes() {
        return ['theme'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'theme' && oldValue !== newValue) {
            this.currentTheme = newValue;
            this.updateTheme();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                :host {
                    display: block;
                    position: relative;
                }
                
                /* === 深色主題 === */
                :host([theme="anko-dark"]) {
                    --anko-bg-primary: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
                    --anko-bg-secondary: #333333;
                    --anko-glass-bg: rgba(255,255,255,0.08);
                    --anko-glass-hover: rgba(255,255,255,0.12);
                    --anko-primary: #FF8C00;
                    --anko-primary-light: #FFA500;
                    --anko-primary-dark: #E67E00;
                    --anko-text-primary: #FFFFFF;
                    --anko-text-secondary: rgba(255,255,255,0.8);
                    --anko-text-tertiary: rgba(255,255,255,0.6);
                    --anko-border-primary: rgba(255,140,0,0.3);
                    --anko-border-hover: #FF8C00;
                    --anko-shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.4);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
                    --anko-glow-primary: rgba(255,140,0,0.4);
                    --anko-glow-secondary: rgba(255,140,0,0.2);
                    --anko-card-shadow: rgba(255,140,0,0.2);
                    --anko-overlay-bg: rgba(0,0,0,0.7);
                    --anko-overlay-hover-bg: rgba(0,0,0,0.85);
                }
                
                /* === 淺色主題 === */
                :host([theme="anko-light"]) {
                    --anko-bg-primary: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
                    --anko-bg-secondary: #F0F0F0;
                    --anko-glass-bg: rgba(255,255,255,0.95);
                    --anko-glass-hover: rgba(255,255,255,1);
                    --anko-primary: #E67E00;
                    --anko-primary-light: #FF8C00;
                    --anko-primary-dark: #CC6600;
                    --anko-text-primary: #1A1A1A;
                    --anko-text-secondary: #333333;
                    --anko-text-tertiary: #555555;
                    --anko-border-primary: #E67E00;
                    --anko-border-hover: #CC6600;
                    --anko-shadow-sm: 0 2px 8px rgba(0,0,0,0.1);
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.15);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.2);
                    --anko-glow-primary: rgba(230,126,0,0.3);
                    --anko-glow-secondary: rgba(230,126,0,0.15);
                    --anko-card-shadow: rgba(230,126,0,0.2);
                    --anko-overlay-bg: rgba(255,255,255,0.85);
                    --anko-overlay-hover-bg: rgba(255,255,255,0.95);
                }

                /* === 基礎間距 === */
                :host {
                    --anko-space-xs: 4px;
                    --anko-space-sm: 8px;
                    --anko-space-md: 16px;
                    --anko-space-lg: 24px;
                    --anko-space-xl: 32px;
                    --anko-space-2xl: 48px;
                    --anko-space-3xl: 64px;
                    --anko-space-4xl: 80px;
                    --anko-space-5xl: 128px;
                }

                .anko-eight-section {
                    position: relative;
                    min-height: 100vh;
                    background: var(--anko-bg-primary);
                    padding: var(--anko-space-5xl) 0;
                    overflow: hidden;
                }

                .anko-theme-switcher {
                    position: absolute;
                    top: var(--anko-space-lg);
                    right: var(--anko-space-lg);
                    z-index: 1000;
                    display: flex;
                    gap: var(--anko-space-sm);
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 100px;
                    padding: var(--anko-space-sm);
                }

                .anko-theme-btn {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .anko-theme-btn.active {
                    transform: scale(1.1);
                    box-shadow: 0 0 20px var(--anko-glow-primary);
                }

                .anko-theme-dark { 
                    background: linear-gradient(45deg, #1A1A1A, #FF8C00); 
                }

                .anko-theme-light { 
                    background: linear-gradient(45deg, #FFFFFF, #E67E00); 
                }

                .anko-eight-bg-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .anko-eight-floating-particle {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: var(--anko-primary);
                    border-radius: 50%;
                    opacity: 0;
                    animation: ankoEightFloatUp 12s infinite ease-in-out;
                }

                .anko-eight-floating-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
                .anko-eight-floating-particle:nth-child(2) { left: 25%; animation-delay: 2s; }
                .anko-eight-floating-particle:nth-child(3) { left: 50%; animation-delay: 4s; }
                .anko-eight-floating-particle:nth-child(4) { left: 75%; animation-delay: 6s; }
                .anko-eight-floating-particle:nth-child(5) { left: 90%; animation-delay: 8s; }

                @keyframes ankoEightFloatUp {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10%,90% { opacity: 0.6; }
                    100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
                }

                .anko-eight-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--anko-space-2xl);
                    position: relative;
                    z-index: 10;
                }

                .anko-eight-header {
                    text-align: center;
                    margin-bottom: var(--anko-space-5xl);
                }

                .anko-eight-label {
                    display: inline-block;
                    background: var(--anko-glass-bg);
                    color: var(--anko-primary);
                    padding: var(--anko-space-sm) var(--anko-space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 25px;
                    margin-bottom: var(--anko-space-lg);
                    border: 1px solid var(--anko-border-primary);
                    backdrop-filter: blur(10px);
                    animation: ankoEightLabelGlow 3s ease-in-out infinite;
                }

                @keyframes ankoEightLabelGlow {
                    0%, 100% { box-shadow: 0 0 10px var(--anko-glow-secondary);}
                    50% { box-shadow: 0 0 20px var(--anko-glow-primary);}
                }

                .anko-eight-title {
                    font-size: 48px;
                    font-weight: 900;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-md);
                    line-height: 1.2;
                    background: linear-gradient(45deg, var(--anko-primary) 0%, var(--anko-text-primary) 50%, var(--anko-primary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: 0 0 15px var(--anko-glow-primary);
                    animation: ankoEightTitleGlow 3s ease-in-out infinite;
                }

                @keyframes ankoEightTitleGlow {
                    0%, 100% { filter: drop-shadow(0 0 8px var(--anko-glow-secondary)); }
                    50% { filter: drop-shadow(0 0 15px var(--anko-glow-primary)); }
                }

                .anko-eight-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .anko-eight-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
                    gap: var(--anko-space-3xl);
                    margin-top: var(--anko-space-5xl);
                }

                .anko-eight-item {
                    position: relative;
                    height: 420px;
                    border-radius: 50%;
                    overflow: hidden;
                    cursor: pointer;
                    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 2px solid var(--anko-border-primary);
                    opacity: 0;
                    transform: translateY(30px);
                }

                .anko-eight-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-size: cover;
                    background-position: center;
                    border-radius: 50%;
                    transition: all 0.5s ease;
                    z-index: 1;
                }

                .anko-eight-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: var(--anko-overlay-bg);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: all 0.5s ease;
                    z-index: 2;
                }

                .anko-eight-content {
                    text-align: center;
                    padding: var(--anko-space-xl);
                    transform: translateY(20px);
                    transition: all 0.5s ease;
                }

                .anko-eight-content h3 {
                    font-size: 32px;
                    font-weight: 700;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-md);
                }

                .anko-eight-content p {
                    font-size: 16px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    line-height: 1.6;
                    margin-bottom: var(--anko-space-lg);
                }

                .anko-eight-link {
                    display: inline-flex;
                    align-items: center;
                    gap: var(--anko-space-sm);
                    color: var(--anko-primary);
                    text-decoration: none;
                    font-size: 16px;
                    font-weight: 600;
                    padding: var(--anko-space-md) var(--anko-space-xl);
                    border: 2px solid var(--anko-primary);
                    border-radius: 100px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .anko-eight-link::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.5s ease;
                }

                .anko-eight-link:hover::before {
                    left: 100%;
                }

                .anko-eight-link:hover {
                    background: var(--anko-primary);
                    color: #1A1A1A;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px var(--anko-glow-primary);
                }

                .anko-eight-item:hover {
                    transform: translateY(-8px) scale(1.02);
                    border-color: var(--anko-primary);
                    box-shadow: 0 20px 60px var(--anko-card-shadow);
                }

                .anko-eight-item:hover .anko-eight-image {
                    transform: scale(1.1);
                    filter: blur(2px);
                }

                .anko-eight-item:hover .anko-eight-overlay {
                    opacity: 1;
                    background: var(--anko-overlay-hover-bg);
                }

                .anko-eight-item:hover .anko-eight-content {
                    transform: translateY(0);
                }

                .anko-eight-item::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(45deg, var(--anko-primary), transparent, var(--anko-primary));
                    border-radius: 50%;
                    z-index: -1;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    animation: ankoEightRotateBorder 3s linear infinite;
                }

                .anko-eight-item:hover::before {
                    opacity: 1;
                }

                @keyframes ankoEightRotateBorder {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .anko-eight-section { padding: var(--anko-space-4xl) 0; }
                    .anko-eight-container { padding: 0 var(--anko-space-md); }
                    .anko-eight-title { font-size: 36px; }
                    .anko-eight-subtitle { font-size: 18px; }
                    .anko-eight-grid { grid-template-columns: 1fr; gap: var(--anko-space-2xl);}
                    .anko-eight-item { height: 300px; }
                    .anko-eight-content h3 { font-size: 24px; }
                    .anko-eight-content p { font-size: 14px; }
                    .anko-eight-floating-particle { display: none; }
                    .anko-eight-item:hover { transform: translateY(-4px);}
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            
            <section class="anko-eight-section">
                <div class="anko-theme-switcher">
                    <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
                    <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
                </div>
                
                <div class="anko-eight-bg-elements">
                    <div class="anko-eight-floating-particle"></div>
                    <div class="anko-eight-floating-particle"></div>
                    <div class="anko-eight-floating-particle"></div>
                    <div class="anko-eight-floating-particle"></div>
                    <div class="anko-eight-floating-particle"></div>
                </div>
                
                <div class="anko-eight-container">
                    <div class="anko-eight-header">
                        <span class="anko-eight-label">Industry Excellence</span>
                        <h2 class="anko-eight-title">安口製造優勢</h2>
                        <p class="anko-eight-subtitle">47年專業技術累積，打造食品機械產業的創新標竿與全球信賴</p>
                    </div>
                    
                    <div class="anko-eight-grid">
                        ${this.highlights.map(item => `
                            <div class="anko-eight-item">
                                <div class="anko-eight-image" style="background-image: url('${item.img}');"></div>
                                <div class="anko-eight-overlay">
                                    <div class="anko-eight-content">
                                        <h3>${item.title}</h3>
                                        <p>${item.desc}</p>
                                        <a href="#" class="anko-eight-link">${item.link}</a>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;
        this.initEvents();
    }

    initEvents() {
        // 主題切換
        this.shadowRoot.querySelectorAll('.anko-theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.setAttribute('theme', theme);
                this.updateTheme();
            });
        });

        // 進場動畫
        const items = this.shadowRoot.querySelectorAll('.anko-eight-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // 點擊動畫
        items.forEach(item => {
            item.addEventListener('click', function () {
                this.style.transform = 'translateY(-8px) scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });

        // 視差粒子
        this.shadowRoot.addEventListener('scroll', () => this.handleParallax(), true);
        window.addEventListener('scroll', () => this.handleParallax());
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const particles = this.shadowRoot.querySelectorAll('.anko-eight-floating-particle');
        particles.forEach((particle, index) => {
            const speed = 0.5 + (index * 0.1);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.anko-theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
        this.setAttribute('theme', this.currentTheme);
    }

    connectedCallback() {
        this.updateTheme();
    }
}

customElements.define('anko-eight', AnkoEight);