class AnkoTwelve extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'anko-dark';
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.newsData = [
            {
                title: '2025 SEOUL FOOD & HOTEL 首爾國際食品設備展',
                date: '2025年5月7日',
                image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
                link: 'https://www.anko.com.tw/zh-TW/news/Exhibitions-2025-seoul-food-hotel'
            },
            {
                title: '智能製造新標準，水餃機線上試機重點回顧',
                date: '2025年4月25日',
                image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&h=400&fit=crop',
                link: 'https://www.anko.com.tw/zh-TW/news/2025-dumpling-machine-online-demo-recap'
            },
            {
                title: '2025 iba 德國烘焙展',
                date: '2025年5月1日',
                image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
                link: 'https://www.anko.com.tw/zh-TW/news/Exhibitions-2025-iba'
            },
            {
                title: '全自動食品生產解決方案發表會',
                date: '2025年4月15日',
                image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
                link: '#'
            },
            {
                title: '新一代智慧工廠技術分享會',
                date: '2025年4月8日',
                image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&h=400&fit=crop',
                link: '#'
            },
            {
                title: '安口食品機械47週年慶祝活動',
                date: '2025年3月28日',
                image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop',
                link: '#'
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
                    --anko-text-tertiary: rgba(255,255,255,0.6);
                    --anko-border-primary: rgba(255,140,0,0.3);
                    --anko-border-secondary: rgba(255,255,255,0.2);
                    --anko-border-hover: #FF8C00;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.4);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
                    --anko-glow-primary: rgba(255,140,0,0.4);
                    --anko-card-shadow: rgba(255,140,0,0.2);
                }
                
                /* === 淺色主題 === */
                :host([theme="anko-light"]) {
                    --anko-bg-primary: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
                    --anko-bg-secondary: #F0F0F0;
                    --anko-glass-bg: rgba(255,255,255,0.95);
                    --anko-glass-hover: rgba(255,255,255,1);
                    --anko-primary: #E67E00;
                    --anko-primary-dark: #CC6600;
                    --anko-text-primary: #1A1A1A;
                    --anko-text-secondary: #333333;
                    --anko-text-tertiary: #555555;
                    --anko-border-primary: #E67E00;
                    --anko-border-secondary: rgba(0,0,0,0.12);
                    --anko-border-hover: #CC6600;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.15);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.2);
                    --anko-glow-primary: rgba(230,126,0,0.3);
                    --anko-card-shadow: rgba(0,0,0,0.15);
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

                .anko-twelve-section {
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
                    box-shadow: var(--anko-shadow-md);
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

                .anko-twelve-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 0 var(--anko-space-xl);
                    position: relative;
                    z-index: 10;
                }

                .anko-twelve-header {
                    text-align: center;
                    margin-bottom: var(--anko-space-4xl);
                }

                .anko-twelve-label {
                    display: inline-block;
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(10px);
                    color: var(--anko-primary);
                    border: 1px solid var(--anko-border-primary);
                    padding: var(--anko-space-sm) var(--anko-space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 100px;
                    margin-bottom: var(--anko-space-lg);
                }

                .anko-twelve-title {
                    font-size: 48px;
                    font-weight: 900;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-md);
                    line-height: 1.2;
                    background: linear-gradient(45deg, var(--anko-primary) 0%, var(--anko-text-primary) 50%, var(--anko-primary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .anko-twelve-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .anko-twelve-carousel {
                    position: relative;
                    margin-top: var(--anko-space-4xl);
                }

                .anko-twelve-track {
                    display: flex;
                    transition: transform 0.5s ease;
                    gap: var(--anko-space-xl);
                }

                .anko-twelve-news-card {
                    flex: 0 0 calc(33.333% - var(--anko-space-lg));
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--anko-border-secondary);
                    border-radius: 16px;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    cursor: pointer;
                    position: relative;
                }

                .anko-twelve-news-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(45deg, var(--anko-primary), transparent, var(--anko-primary));
                    border-radius: 16px;
                    padding: 2px;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: xor;
                    -webkit-mask-composite: xor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .anko-twelve-news-card:hover::before {
                    opacity: 1;
                }

                .anko-twelve-news-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--anko-border-hover);
                    background: var(--anko-glass-hover);
                    box-shadow: 0 20px 60px var(--anko-card-shadow);
                }

                .anko-twelve-news-image {
                    width: 100%;
                    height: 240px;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    transition: transform 0.3s ease;
                    position: relative;
                    z-index: 2;
                }

                .anko-twelve-news-card:hover .anko-twelve-news-image {
                    transform: scale(1.05);
                }

                .anko-twelve-news-content {
                    padding: var(--anko-space-lg);
                    position: relative;
                    z-index: 2;
                }

                .anko-twelve-news-date {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--anko-primary);
                    margin-bottom: var(--anko-space-md);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .anko-twelve-news-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--anko-text-primary);
                    line-height: 1.4;
                    margin-bottom: var(--anko-space-md);
                    transition: color 0.3s ease;
                }

                .anko-twelve-news-card:hover .anko-twelve-news-title {
                    color: var(--anko-primary);
                }

                .anko-twelve-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 48px;
                    height: 48px;
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 2px solid var(--anko-border-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 20;
                    color: var(--anko-primary);
                    font-size: 18px;
                    font-weight: bold;
                }

                .anko-twelve-nav:hover {
                    background: var(--anko-glass-hover);
                    border-color: var(--anko-border-hover);
                    transform: translateY(-50%) scale(1.1);
                    box-shadow: var(--anko-shadow-md);
                }

                .anko-twelve-nav.prev { left: -24px; }
                .anko-twelve-nav.next { right: -24px; }

                .anko-twelve-indicators {
                    display: flex;
                    justify-content: center;
                    gap: var(--anko-space-md);
                    margin-top: var(--anko-space-3xl);
                }

                .anko-twelve-indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--anko-text-tertiary);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .anko-twelve-indicator.active,
                .anko-twelve-indicator:hover {
                    background: var(--anko-primary);
                    transform: scale(1.2);
                    border-color: var(--anko-primary);
                }

                @media (max-width: 1024px) {
                    .anko-twelve-news-card {
                        flex: 0 0 calc(50% - var(--anko-space-md));
                    }
                }

                @media (max-width: 768px) {
                    .anko-twelve-section { 
                        padding: var(--anko-space-4xl) 0; 
                        min-height: auto;
                    }
                    .anko-twelve-container { padding: 0 var(--anko-space-md); }
                    .anko-twelve-title { font-size: 36px; }
                    .anko-twelve-subtitle { font-size: 18px; }
                    .anko-twelve-news-card {
                        flex: 0 0 calc(100% - var(--anko-space-lg));
                    }
                    .anko-twelve-news-image { height: 200px; }
                    .anko-twelve-nav { display: none; }
                    .anko-twelve-track { gap: var(--anko-space-lg); }
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            
            <section class="anko-twelve-section">
                <div class="anko-theme-switcher">
                    <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
                    <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
                </div>
                
                <div class="anko-twelve-container">
                    <div class="anko-twelve-header">
                        <span class="anko-twelve-label">Latest News</span>
                        <h2 class="anko-twelve-title">最新消息</h2>
                        <p class="anko-twelve-subtitle">
                            掌握安口食品機械第一手資訊，了解最新產品發表、展覽活動與技術突破
                        </p>
                    </div>
                    
                    <div class="anko-twelve-carousel">
                        <div class="anko-twelve-track">
                            ${this.newsData.map(news => `
                                <div class="anko-twelve-news-card" data-link="${news.link}">
                                    <div class="anko-twelve-news-image" style="background-image: url('${news.image}');"></div>
                                    <div class="anko-twelve-news-content">
                                        <div class="anko-twelve-news-date">${news.date}</div>
                                        <h3 class="anko-twelve-news-title">${news.title}</h3>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <button class="anko-twelve-nav prev">‹</button>
                        <button class="anko-twelve-nav next">›</button>
                    </div>
                    
                    <div class="anko-twelve-indicators">
                        <div class="anko-twelve-indicator active" data-index="0"></div>
                        <div class="anko-twelve-indicator" data-index="1"></div>
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

        // 輪播控制
        this.track = this.shadowRoot.querySelector('.anko-twelve-track');
        this.indicators = this.shadowRoot.querySelectorAll('.anko-twelve-indicator');
        this.totalSlides = 2; // 顯示2組，每組3個新聞

        this.shadowRoot.querySelector('.anko-twelve-nav.prev').addEventListener('click', () => this.prevSlide());
        this.shadowRoot.querySelector('.anko-twelve-nav.next').addEventListener('click', () => this.nextSlide());
        
        this.indicators.forEach((indicator, idx) => {
            indicator.addEventListener('click', () => this.goToSlide(idx));
        });

        // 新聞卡片點擊
        this.shadowRoot.querySelectorAll('.anko-twelve-news-card').forEach(card => {
            card.addEventListener('click', () => {
                const link = card.getAttribute('data-link');
                if (link && link !== '#') {
                    window.open(link, '_blank');
                }
            });
        });

        // 自動播放
        this.startAutoPlay();

        // 滑鼠懸停暫停
        const carousel = this.shadowRoot.querySelector('.anko-twelve-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
        carousel.addEventListener('mouseleave', () => this.startAutoPlay());

        // 初始化顯示
        setTimeout(() => this.updateCarousel(), 100);
    }

    updateCarousel() {
        const firstCard = this.shadowRoot.querySelector('.anko-twelve-news-card');
        if (!firstCard) return;
        
        const cardWidth = firstCard.offsetWidth;
        const gap = 32; // --anko-space-xl
        const translateX = this.currentSlide * (cardWidth * 3 + gap * 2);
        this.track.style.transform = `translateX(-${translateX}px)`;

        this.indicators.forEach((indicator, idx) => {
            indicator.classList.toggle('active', idx === this.currentSlide);
        });
    }

    goToSlide(idx) {
        this.currentSlide = idx;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 6000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.anko-theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
    }

    connectedCallback() {
        this.updateTheme();
        // 視窗大小改變時重新計算
        window.addEventListener('resize', () => {
            setTimeout(() => this.updateCarousel(), 100);
        });
    }

    disconnectedCallback() {
        this.stopAutoPlay();
        window.removeEventListener('resize', () => this.updateCarousel());
    }
}

customElements.define('anko-twelve', AnkoTwelve);