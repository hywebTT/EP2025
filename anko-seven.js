class AnkoSeven extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'anko-dark';
        this.products = [
            {
                name: 'HLT-700U 多功能成型機',
                price: '$85,000',
                img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop'
            },
            {
                name: 'SD-97W 自動包餡成型機',
                price: '$78,500',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
            },
            {
                name: 'JGB-168 餃子生產線',
                price: '$125,000',
                img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop'
            },
            {
                name: 'ANM-6000 包子製造機',
                price: '$95,800',
                img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
            },
            {
                name: 'SRL-40 春捲皮機',
                price: '$42,000',
                img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=300&fit=crop'
            },
            {
                name: 'TP-500 珍珠粉圓機',
                price: '$38,900',
                img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
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
                    --anko-primary-dark: #E67E00;
                    --anko-text-primary: #FFFFFF;
                    --anko-text-secondary: rgba(255,255,255,0.8);
                    --anko-border-primary: rgba(255,140,0,0.3);
                    --anko-border-hover: #FF8C00;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.4);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
                    --anko-glow-primary: rgba(255,140,0,0.4);
                    --anko-card-shadow: rgba(255,140,0,0.2);
                    --anko-button-shadow: rgba(255,140,0,0.4);
                    --anko-sweep-color: rgba(255,140,0,0.1);
                }
                
                /* === 淺色主題（優化對比度） === */
                :host([theme="anko-light"]) {
                    --anko-bg-primary: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
                    --anko-bg-secondary: #F0F0F0;
                    --anko-glass-bg: rgba(255,255,255,0.95);
                    --anko-glass-hover: rgba(255,255,255,1);
                    --anko-primary: #E67E00;
                    --anko-primary-dark: #CC6600;
                    --anko-text-primary: #1A1A1A;
                    --anko-text-secondary: #333333;
                    --anko-border-primary: #E67E00;
                    --anko-border-hover: #CC6600;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.15);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.2);
                    --anko-glow-primary: rgba(230,126,0,0.3);
                    --anko-card-shadow: rgba(0,0,0,0.15);
                    --anko-button-shadow: rgba(230,126,0,0.3);
                    --anko-sweep-color: rgba(230,126,0,0.1);
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

                .anko-seven-showcase {
                    min-height: 100vh;
                    background: var(--anko-bg-primary);
                    padding: var(--anko-space-5xl) var(--anko-space-2xl);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
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

                .anko-seven-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    width: 100%;
                }

                .anko-seven-header {
                    text-align: center;
                    margin-bottom: var(--anko-space-4xl);
                }

                .anko-seven-title {
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
                }

                .anko-seven-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .anko-seven-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: var(--anko-space-lg);
                    margin-bottom: var(--anko-space-4xl);
                }

                .anko-seven-card {
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    cursor: pointer;
                    position: relative;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .anko-seven-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, var(--anko-primary), transparent, var(--anko-primary));
                    border-radius: 16px;
                    padding: 2px;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: xor;
                    -webkit-mask-composite: xor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .anko-seven-card:hover::before { opacity: 1; }

                .anko-seven-card::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--anko-sweep-color), transparent);
                    transition: left 0.6s ease;
                }

                .anko-seven-card:hover::after { left: 100%; }

                .anko-seven-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--anko-border-hover);
                    box-shadow: 0 20px 60px var(--anko-card-shadow);
                }

                .anko-seven-image {
                    width: 100%;
                    height: 180px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    position: relative;
                    overflow: hidden;
                }

                .anko-seven-info {
                    padding: var(--anko-space-lg);
                    text-align: center;
                }

                .anko-seven-name {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-sm);
                    line-height: 1.4;
                }

                .anko-seven-price {
                    font-size: 24px;
                    font-weight: 700;
                    color: var(--anko-primary);
                    line-height: 1;
                }

                .anko-seven-more-button {
                    background: transparent;
                    color: var(--anko-primary);
                    border: 2px solid var(--anko-primary);
                    border-radius: 100px;
                    padding: var(--anko-space-md) var(--anko-space-2xl);
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin: 0 auto;
                    display: block;
                    min-width: 160px;
                    position: relative;
                    overflow: hidden;
                }

                .anko-seven-more-button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: var(--anko-primary);
                    transition: left 0.3s ease;
                    z-index: -1;
                }

                .anko-seven-more-button:hover::before { left: 0; }

                .anko-seven-more-button:hover {
                    color: #FFFFFF;
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 30px var(--anko-button-shadow);
                }

                @media screen and (max-width: 1200px) {
                    .anko-seven-grid { 
                        grid-template-columns: repeat(3, 1fr); 
                        gap: var(--anko-space-lg); 
                    }
                }

                @media screen and (max-width: 768px) {
                    .anko-seven-showcase { padding: var(--anko-space-3xl) var(--anko-space-md); }
                    .anko-seven-title { font-size: 36px; }
                    .anko-seven-grid { 
                        grid-template-columns: repeat(2, 1fr); 
                        gap: var(--anko-space-md); 
                    }
                    .anko-seven-image { height: 150px; }
                    .anko-seven-name { font-size: 16px; }
                    .anko-seven-price { font-size: 20px; }
                    .anko-seven-card:hover { transform: translateY(-4px); }
                    .anko-seven-more-button:hover { transform: translateY(-2px) scale(1.01); }
                }

                @media screen and (max-width: 480px) {
                    .anko-seven-grid { grid-template-columns: 1fr; }
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            
            <section class="anko-seven-showcase">
                <div class="anko-theme-switcher">
                    <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
                    <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
                </div>
                
                <div class="anko-seven-container">
                    <div class="anko-seven-header">
                        <h2 class="anko-seven-title">熱銷食品機械設備</h2>
                        <p class="anko-seven-subtitle">嚴選全球認證的高效能食品生產設備，為您的事業提供最可靠的製造解決方案</p>
                    </div>
                    
                    <div class="anko-seven-grid">
                        ${this.products.map(product => `
                            <div class="anko-seven-card">
                                <div class="anko-seven-image" style="background-image: url('${product.img}')"></div>
                                <div class="anko-seven-info">
                                    <h3 class="anko-seven-name">${product.name}</h3>
                                    <div class="anko-seven-price">${product.price}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="anko-seven-more-button">查看完整產品目錄</button>
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

        // 產品卡片點擊效果
        this.shadowRoot.querySelectorAll('.anko-seven-card').forEach(card => {
            card.addEventListener('click', function () {
                const productName = this.querySelector('.anko-seven-name').textContent;
                console.log(`查看產品詳情: ${productName}`);
                // 這裡可以添加實際的產品詳情頁導航
            });
        });

        // More按鈕
        this.shadowRoot.querySelector('.anko-seven-more-button').addEventListener('click', () => {
            console.log('導航到完整產品目錄頁面');
            // 這裡可以添加實際的頁面導航
        });

        // 入場動畫
        const cards = this.shadowRoot.querySelectorAll('.anko-seven-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
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

customElements.define('anko-seven', AnkoSeven);