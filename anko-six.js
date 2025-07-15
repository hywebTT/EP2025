class AnkoSix extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'anko-dark';
        this.stats = [
            { number: 47, suffix: '年', label: '食品機械經驗', desc: '自1978年成立以來累積的專業技術與市場經驗' },
            { number: 114, suffix: '個', label: '銷售國家', desc: '遍及全球五大洲的國際市場覆蓋範圍' },
            { number: 70, suffix: '%', label: '台灣市佔率', desc: '在台灣冷凍食品加工設備市場的領導地位' },
            { number: 12000, suffix: '個/時', label: '最高產能', desc: '單機每小時最高生產能力，滿足大量生產需求' },
            { number: 500, suffix: '+', label: '產品配方', desc: '豐富的食品配方資料庫，協助客戶產品開發' },
            { number: 24, suffix: '小時', label: '全球服務', desc: '提供全天候技術支援與客戶服務' }
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
                    --anko-border-hover: #FF8C00;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.4);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
                    --anko-glow-primary: rgba(255,140,0,0.4);
                    --anko-glow-secondary: rgba(255,140,0,0.2);
                    --anko-card-shadow: rgba(255,140,0,0.2);
                    --anko-sweep-color: rgba(255,140,0,0.1);
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
                    --anko-border-hover: #CC6600;
                    --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.15);
                    --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.2);
                    --anko-glow-primary: rgba(230,126,0,0.3);
                    --anko-glow-secondary: rgba(230,126,0,0.15);
                    --anko-card-shadow: rgba(0,0,0,0.15);
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

                .anko-six-section {
                    position: relative;
                    min-height: 100vh;
                    background-image: url('https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1920&h=600&fit=crop');
                    background-attachment: fixed;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover;
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .anko-six-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--anko-bg-primary);
                    opacity: 0.9;
                }

                .anko-six-bg-elements {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                }

                .anko-six-bg-circle {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, var(--anko-glow-primary) 0%, transparent 70%);
                    animation: ankoSixFloat 15s ease-in-out infinite;
                }

                .anko-six-bg-circle:nth-child(1) {
                    width: 400px;
                    height: 400px;
                    top: -200px;
                    left: -200px;
                    animation-delay: 0s;
                }

                .anko-six-bg-circle:nth-child(2) {
                    width: 300px;
                    height: 300px;
                    bottom: -150px;
                    right: -150px;
                    animation-delay: 5s;
                }

                .anko-six-bg-circle:nth-child(3) {
                    width: 250px;
                    height: 250px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation-delay: 10s;
                }

                @keyframes ankoSixFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
                    33% { transform: translateY(-20px) rotate(120deg); opacity: 0.25; }
                    66% { transform: translateY(20px) rotate(240deg); opacity: 0.2; }
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

                .anko-six-container {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: var(--anko-space-5xl) var(--anko-space-2xl);
                }

                .anko-six-header {
                    text-align: center;
                    margin-bottom: var(--anko-space-5xl);
                }

                .anko-six-label {
                    display: inline-block;
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    color: var(--anko-primary);
                    padding: var(--anko-space-sm) var(--anko-space-lg);
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border-radius: 100px;
                    margin-bottom: var(--anko-space-lg);
                    border: 1px solid var(--anko-border-primary);
                }

                .anko-six-title {
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
                    animation: ankoSixTitleGlow 3s ease-in-out infinite;
                }

                @keyframes ankoSixTitleGlow {
                    0%, 100% { filter: drop-shadow(0 0 8px var(--anko-glow-primary)); }
                    50% { filter: drop-shadow(0 0 15px var(--anko-glow-primary)); }
                }

                .anko-six-subtitle {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .anko-six-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: var(--anko-space-3xl);
                    margin-top: var(--anko-space-4xl);
                }

                .anko-six-stat {
                    text-align: center;
                    position: relative;
                    padding: var(--anko-space-3xl) var(--anko-space-xl);
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 16px;
                    transition: all 0.4s ease;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 280px;
                }

                .anko-six-stat::before {
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

                .anko-six-stat:hover::before { opacity: 1; }

                .anko-six-stat::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, var(--anko-sweep-color), transparent);
                    transition: left 0.6s ease;
                }

                .anko-six-stat:hover::after { left: 100%; }

                .anko-six-stat:hover {
                    transform: translateY(-8px);
                    border-color: var(--anko-border-hover);
                    background: var(--anko-glass-hover);
                    box-shadow: 0 20px 40px var(--anko-card-shadow);
                }

                .anko-six-number-container {
                    display: flex;
                    align-items: baseline;
                    justify-content: center;
                    margin-bottom: var(--anko-space-lg);
                    z-index: 2;
                    position: relative;
                }

                .anko-six-number {
                    font-size: 64px;
                    font-weight: 900;
                    color: var(--anko-primary);
                    line-height: 1;
                    text-shadow: 0 0 15px var(--anko-glow-primary);
                }

                .anko-six-suffix {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--anko-text-primary);
                    margin-left: var(--anko-space-sm);
                }

                .anko-six-stat-label {
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-md);
                    z-index: 2;
                    position: relative;
                }

                .anko-six-description {
                    font-size: 14px;
                    font-weight: 400;
                    color: var(--anko-text-tertiary);
                    line-height: 1.5;
                    max-width: 250px;
                    z-index: 2;
                    position: relative;
                }

                @media (max-width: 1024px) {
                    .anko-six-container { padding: var(--anko-space-4xl) var(--anko-space-xl); }
                    .anko-six-title { font-size: 40px; }
                    .anko-six-grid { gap: var(--anko-space-xl); grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
                }

                @media (max-width: 768px) {
                    .anko-six-section { min-height: 100vh; background-attachment: scroll; }
                    .anko-six-container { padding: var(--anko-space-4xl) var(--anko-space-lg); }
                    .anko-six-title { font-size: 32px; }
                    .anko-six-subtitle { font-size: 18px; }
                    .anko-six-grid { grid-template-columns: 1fr; gap: var(--anko-space-lg); }
                    .anko-six-stat { padding: var(--anko-space-xl) var(--anko-space-lg); min-height: 240px; }
                    .anko-six-number { font-size: 48px; }
                    .anko-six-suffix { font-size: 20px; }
                    .anko-six-bg-elements { display: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                @keyframes ankoSixCountUp {
                    from { opacity: 0; transform: translateY(20px);}
                    to { opacity: 1; transform: translateY(0);}
                }

                .anko-six-animate-count { 
                    animation: ankoSixCountUp 0.8s ease-out forwards; 
                }
            </style>
            
            <section class="anko-six-section">
                <div class="anko-theme-switcher">
                    <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
                    <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
                </div>
                
                <div class="anko-six-overlay"></div>
                
                <div class="anko-six-bg-elements">
                    <div class="anko-six-bg-circle"></div>
                    <div class="anko-six-bg-circle"></div>
                    <div class="anko-six-bg-circle"></div>
                </div>
                
                <div class="anko-six-container">
                    <div class="anko-six-header">
                        <span class="anko-six-label">Our Excellence</span>
                        <h2 class="anko-six-title">安口食品機械成就數據</h2>
                        <p class="anko-six-subtitle">
                            47年來持續創新與成長，在全球食品機械領域建立卓越聲譽，用數據見證我們的專業實力與市場地位
                        </p>
                    </div>
                    
                    <div class="anko-six-grid">
                        ${this.stats.map(stat => `
                            <div class="anko-six-stat">
                                <div class="anko-six-number-container">
                                    <span class="anko-six-number" data-target="${stat.number}">0</span>
                                    <span class="anko-six-suffix">${stat.suffix}</span>
                                </div>
                                <div class="anko-six-stat-label">${stat.label}</div>
                                <div class="anko-six-description">${stat.desc}</div>
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

        // 數字動畫 Intersection Observer
        const statsSection = this.shadowRoot.querySelector('.anko-six-section');
        const statNumbers = this.shadowRoot.querySelectorAll('.anko-six-number');
        let animated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(num => {
                        const target = parseInt(num.getAttribute('data-target'));
                        this.animateNumber(num, target);
                        num.classList.add('anko-six-animate-count');
                    });
                    animated = true;
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);

        // 視差滾動效果
        this.shadowRoot.addEventListener('scroll', () => this.handleParallax(), true);
        window.addEventListener('scroll', () => this.handleParallax());

        // 統計卡片 hover 動畫延遲
        const statItems = this.shadowRoot.querySelectorAll('.anko-six-stat');
        statItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        });
    }

    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = this.shadowRoot.querySelectorAll('.anko-six-bg-circle');
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    updateTheme() {
        this.shadowRoot.querySelectorAll('.anko-theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === this.currentTheme);
        });
    }

    connectedCallback() {
        this.updateTheme();
    }
}

customElements.define('anko-six', AnkoSix);