class AnkoTen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = this.getAttribute('theme') || 'anko-dark';
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
                    --anko-grid-color: rgba(255,140,0,0.1);
                    --anko-button-shadow: rgba(255,140,0,0.4);
                    --anko-card-shadow: rgba(255,140,0,0.2);
                    --anko-sweep-color: rgba(255,140,0,0.1);
                    --anko-overlay-bg: rgba(0,0,0,0.7);
                    --anko-overlay-hover-bg: rgba(0,0,0,0.85);
                }
                
                /* === 淺色主題（優化可讀性） === */
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
                    --anko-grid-color: rgba(230,126,0,0.1);
                    --anko-button-shadow: rgba(230,126,0,0.3);
                    --anko-card-shadow: rgba(0,0,0,0.12);
                    --anko-sweep-color: rgba(230,126,0,0.1);
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

                .anko-ten-section {
                    position: relative;
                    min-height: 100vh;
                    padding: var(--anko-space-5xl) 0;
                    background: var(--anko-bg-primary);
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .anko-ten-bg {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop') center/cover;
                    opacity: 0.15;
                    transform: scale(1.1);
                    transition: transform 8s ease;
                    z-index: 1;
                }

                .anko-ten-section:hover .anko-ten-bg {
                    transform: scale(1.05);
                }

                .anko-ten-bg::after {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%);
                }

                .anko-ten-grid {
                    position: absolute;
                    width: 120%;
                    height: 120%;
                    background-image: 
                        linear-gradient(var(--anko-grid-color) 1px, transparent 1px),
                        linear-gradient(90deg, var(--anko-grid-color) 1px, transparent 1px);
                    background-size: 80px 80px;
                    animation: ankoTenGridMove 20s linear infinite;
                    z-index: 2;
                    opacity: 0.3;
                }

                @keyframes ankoTenGridMove {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(80px, 80px); }
                }

                .anko-ten-glow {
                    position: absolute;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle, var(--anko-glow-primary) 0%, transparent 70%);
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    animation: ankoTenGlowPulse 6s ease-in-out infinite;
                    z-index: 2;
                }

                @keyframes ankoTenGlowPulse {
                    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
                    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
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

                .anko-ten-container {
                    position: relative;
                    z-index: 10;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 var(--anko-space-2xl);
                }

                .anko-ten-card {
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(30px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 24px;
                    padding: var(--anko-space-4xl) var(--anko-space-3xl);
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    opacity: 0;
                    transform: translateY(50px);
                }

                .anko-ten-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(45deg, var(--anko-primary), transparent, var(--anko-primary));
                    border-radius: 24px;
                    padding: 2px;
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask-composite: xor;
                    -webkit-mask-composite: xor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .anko-ten-card:hover::before { opacity: 0.8; }

                .anko-ten-card:hover {
                    transform: translateY(-8px);
                    border-color: var(--anko-primary);
                    background: var(--anko-glass-hover);
                    box-shadow: 0 20px 60px var(--anko-card-shadow);
                }

                .anko-ten-label {
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
                    margin-bottom: var(--anko-space-xl);
                    transition: all 0.3s ease;
                }

                .anko-ten-label:hover {
                    border-color: var(--anko-primary);
                    background: var(--anko-glass-hover);
                    transform: scale(1.05);
                }

                .anko-ten-title {
                    font-size: 56px;
                    font-weight: 900;
                    color: var(--anko-text-primary);
                    margin-bottom: var(--anko-space-2xl);
                    line-height: 1.2;
                    background: linear-gradient(45deg, var(--anko-primary) 0%, var(--anko-text-primary) 50%, var(--anko-primary) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    text-shadow: 0 0 15px var(--anko-glow-primary);
                    animation: ankoTenTitleGlow 3s ease-in-out infinite;
                }

                @keyframes ankoTenTitleGlow {
                    0%, 100% { filter: drop-shadow(0 0 8px var(--anko-glow-primary)); }
                    50% { filter: drop-shadow(0 0 15px var(--anko-glow-primary)); }
                }

                .anko-ten-preview {
                    font-size: 20px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    line-height: 1.6;
                    margin-bottom: var(--anko-space-2xl);
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .anko-ten-expand {
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    opacity: 0;
                }

                .anko-ten-expand.expanded {
                    max-height: 1500px;
                    opacity: 1;
                    margin-bottom: var(--anko-space-2xl);
                }

                .anko-ten-text {
                    font-size: 18px;
                    font-weight: 300;
                    color: var(--anko-text-secondary);
                    line-height: 1.8;
                    margin-bottom: var(--anko-space-lg);
                    text-align: left;
                    max-width: 900px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .anko-ten-text:last-child { margin-bottom: 0; }

                .anko-ten-actions {
                    display: flex;
                    gap: var(--anko-space-lg);
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .anko-btn {
                    border-radius: 100px;
                    height: 48px;
                    padding: 0 var(--anko-space-xl);
                    font-size: 16px;
                    font-weight: 600;
                    min-width: 140px;
                    border: 2px solid var(--anko-primary);
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--anko-space-sm);
                    text-decoration: none;
                }

                .anko-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transition: left 0.5s ease;
                    z-index: -1;
                }

                .anko-btn:hover::before { left: 100%; }

                .anko-btn:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 30px var(--anko-button-shadow);
                }

                .anko-btn-primary {
                    background: var(--anko-primary);
                    color: #1A1A1A;
                    border-color: var(--anko-primary);
                    font-weight: 700;
                }

                .anko-btn-primary:hover {
                    background: var(--anko-primary-dark);
                    border-color: var(--anko-primary-dark);
                }

                .anko-btn-secondary {
                    background: transparent;
                    color: var(--anko-primary);
                    border-color: var(--anko-primary);
                }

                .anko-btn-secondary:hover {
                    background: var(--anko-primary);
                    color: #1A1A1A;
                }

                .anko-ten-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    z-index: 1000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s ease;
                }

                .anko-ten-modal-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                .anko-ten-modal-content {
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%) scale(0.8);
                    width: 90%;
                    max-width: 1000px;
                    max-height: 90vh;
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(30px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 24px;
                    padding: var(--anko-space-4xl);
                    overflow-y: auto;
                    transition: all 0.4s ease;
                }

                .anko-ten-modal-overlay.active .anko-ten-modal-content {
                    transform: translate(-50%, -50%) scale(1);
                }

                .anko-ten-modal-close {
                    position: absolute;
                    top: var(--anko-space-lg);
                    right: var(--anko-space-lg);
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: var(--anko-glass-bg);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--anko-border-primary);
                    border-radius: 50%;
                    color: var(--anko-text-primary);
                    font-size: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .anko-ten-modal-close:hover {
                    background: var(--anko-primary);
                    color: #1A1A1A;
                    border-color: var(--anko-primary);
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .anko-ten-section { padding: var(--anko-space-4xl) 0; }
                    .anko-ten-container { padding: 0 var(--anko-space-md); }
                    .anko-ten-card { padding: var(--anko-space-2xl); border-radius: 16px; }
                    .anko-ten-title { font-size: 36px; margin-bottom: var(--anko-space-lg); }
                    .anko-ten-preview { font-size: 16px; margin-bottom: var(--anko-space-lg); }
                    .anko-ten-text { font-size: 16px; text-align: center; }
                    .anko-ten-actions { flex-direction: column; align-items: center; }
                    .anko-btn { width: 100%; max-width: 280px; }
                    .anko-ten-modal-content { width: 95%; padding: var(--anko-space-2xl); margin: var(--anko-space-lg); max-height: 85vh; }
                    .anko-ten-grid, .anko-ten-glow { display: none; }
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            </style>
            
            <section class="anko-ten-section">
                <div class="anko-theme-switcher">
                    <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
                    <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
                </div>
                <div class="anko-ten-bg"></div>
                <div class="anko-ten-grid"></div>
                <div class="anko-ten-glow"></div>
                <div class="anko-ten-container">
                    <div class="anko-ten-card">
                        <div class="anko-ten-label">ABOUT ANKO</div>
                        <h2 class="anko-ten-title">關於安口食品機械</h2>
                        <p class="anko-ten-preview">
                            憑藉著ANKO承諾的使命和願景，全球客戶信任我們提供的解決方案，進而幫助客戶實現更多目標。我們將繼續在全球的中央廚房和食品製造廠中做出積極的貢獻...
                        </p>
                        <div class="anko-ten-expand" id="ankoTenExpand">
                            <p class="anko-ten-text">
                                從手動到自動化生產、生產線規劃、或產量和品質的提升，我們始終秉持「創新、負責、熱情」的企業理念，並結合我們豐富的市場經驗和高技術能力，為客戶提供全面性的食品解決方案，無論何時何地我們都能提供優質的機台配置和整廠方案。
                            </p>
                            <p class="anko-ten-text">
                                此外，我們也為工廠和生產線提供整廠設計服務，包含從原料加工處理、生產線規劃、生產流程優化到新產品研發客製化的客製化服務。
                            </p>
                            <p class="anko-ten-text">
                                自1978年成立以來，ANKO已成為全球食品機械領域的領導者，我們的設備銷售遍及114個國家，在台灣冷凍食品設備市場佔有率達70%。我們不僅提供單機設備，更專精於整廠規劃，從產品配方研發、設備選配、生產線設計到售後服務，提供一站式的完整解決方案。
                            </p>
                            <p class="anko-ten-text">
                                展望未來，ANKO將持續投入研發創新，致力於開發更智能、更高效的食品生產設備。我們相信透過不斷的技術突破和服務升級，能夠幫助全球客戶在激烈的市場競爭中脫穎而出，共同創造食品產業的美好未來。
                            </p>
                        </div>
                        <div class="anko-ten-actions">
                            <button class="anko-btn anko-btn-primary" id="ankoTenExpandBtn">
                                <span id="ankoTenExpandText">展開閱讀</span>
                            </button>
                            <button class="anko-btn anko-btn-secondary" id="ankoTenModalBtn">
                                詳細檢視
                            </button>
                        </div>
                    </div>
                </div>
                <div class="anko-ten-modal-overlay" id="ankoTenModalOverlay">
                    <div class="anko-ten-modal-content">
                        <button class="anko-ten-modal-close" id="ankoTenCloseModalBtn">&times;</button>
                        <div class="anko-ten-label">ABOUT ANKO</div>
                        <h2 class="anko-ten-title">關於安口食品機械</h2>
                        <div style="text-align: left; max-width: none;">
                            <p class="anko-ten-text">
                                <strong>提供優質的食品生產解決方案！</strong>
                            </p>
                            <p class="anko-ten-text">
                                憑藉著ANKO承諾的使命和願景，全球客戶信任我們提供的解決方案，進而幫助客戶實現更多目標。我們將繼續在全球的中央廚房和食品製造廠中做出積極的貢獻。
                            </p>
                            <p class="anko-ten-text">
                                從手動到自動化生產、生產線規劃、或產量和品質的提升，我們始終秉持「創新、負責、熱情」的企業理念，並結合我們豐富的市場經驗和高技術能力，為客戶提供全面性的食品解決方案，無論何時何地我們都能提供優質的機台配置和整廠方案。
                            </p>
                            <p class="anko-ten-text">
                                此外，我們也為工廠和生產線提供整廠設計服務，包含從原料加工處理、生產線規劃、生產流程優化到新產品研發客製化的客製化服務。
                            </p>
                            <p class="anko-ten-text">
                                自1978年成立以來，ANKO已成為全球食品機械領域的領導者，我們的設備銷售遍及114個國家，在台灣冷凍食品設備市場佔有率達70%。我們不僅提供單機設備，更專精於整廠規劃，從產品配方研發、設備選配、生產線設計到售後服務，提供一站式的完整解決方案。
                            </p>
                            <p class="anko-ten-text">
                                展望未來，ANKO將持續投入研發創新，致力於開發更智能、更高效的食品生產設備。我們相信透過不斷的技術突破和服務升級，能夠幫助全球客戶在激烈的市場競爭中脫穎而出，共同創造食品產業的美好未來。
                            </p>
                        </div>
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

        // 展開/收起
        const expandBtn = this.shadowRoot.getElementById('ankoTenExpandBtn');
        const expandText = this.shadowRoot.getElementById('ankoTenExpandText');
        const expandContent = this.shadowRoot.getElementById('ankoTenExpand');
        expandBtn.addEventListener('click', () => {
            if (expandContent.classList.contains('expanded')) {
                expandContent.classList.remove('expanded');
                expandText.textContent = '展開閱讀';
            } else {
                expandContent.classList.add('expanded');
                expandText.textContent = '收起內容';
            }
        });

        // 光箱
        const modalBtn = this.shadowRoot.getElementById('ankoTenModalBtn');
        const modalOverlay = this.shadowRoot.getElementById('ankoTenModalOverlay');
        const closeModalBtn = this.shadowRoot.getElementById('ankoTenCloseModalBtn');
        modalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // ESC 關閉光箱
        this._escHandler = (event) => {
            if (event.key === 'Escape') {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
        document.addEventListener('keydown', this._escHandler);

        // 視差背景
        this._scrollHandler = () => {
            const scrolled = window.pageYOffset;
            const bg = this.shadowRoot.querySelector('.anko-ten-bg');
            if (bg) {
                bg.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
            }
        };
        window.addEventListener('scroll', this._scrollHandler);

        // 內容卡片進場動畫
        const contentCard = this.shadowRoot.querySelector('.anko-ten-card');
        contentCard.style.opacity = '0';
        contentCard.style.transform = 'translateY(50px)';
        contentCard.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        observer.observe(contentCard);
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

    disconnectedCallback() {
        // 清理事件
        document.removeEventListener('keydown', this._escHandler);
        window.removeEventListener('scroll', this._scrollHandler);
    }
}

customElements.define('anko-ten', AnkoTen);