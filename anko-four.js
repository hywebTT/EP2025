class AnkoFour extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'anko-dark';
    this.currentSlide = 0;
    this.autoPlayInterval = null;
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
        
        /* === 深色主題 - 安口黃配色 === */
        :host([theme="anko-dark"]) {
          --anko-bg-primary: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%);
          --anko-bg-secondary: #333333;
          --anko-glass-bg: rgba(255,255,255,0.08);
          --anko-glass-hover: rgba(255,255,255,0.12);
          --anko-primary: #F8B500;
          --anko-primary-dark: #E6A500;
          --anko-text-primary: #FFFFFF;
          --anko-text-secondary: rgba(255,255,255,0.8);
          --anko-text-tertiary: rgba(255,255,255,0.6);
          --anko-border-primary: rgba(248,181,0,0.3);
          --anko-border-hover: #F8B500;
          --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.4);
          --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.5);
          --anko-glow-primary: rgba(248,181,0,0.4);
          --anko-overlay-dark: rgba(0,0,0,0.85);
          --anko-overlay-light: rgba(0,0,0,0.4);
        }
        
        /* === 淺色主題 - 安口黃配色 === */
        :host([theme="anko-light"]) {
          --anko-bg-primary: linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%);
          --anko-bg-secondary: #F0F0F0;
          --anko-glass-bg: rgba(255,255,255,0.95);
          --anko-glass-hover: rgba(255,255,255,1);
          --anko-primary: #E6A500;
          --anko-primary-dark: #CC9400;
          --anko-text-primary: #1A1A1A;
          --anko-text-secondary: #333333;
          --anko-text-tertiary: #555555;
          --anko-border-primary: #E6A500;
          --anko-border-hover: #CC9400;
          --anko-shadow-md: 0 4px 16px rgba(0,0,0,0.15);
          --anko-shadow-lg: 0 8px 32px rgba(0,0,0,0.2);
          --anko-glow-primary: rgba(230,165,0,0.3);
          --anko-overlay-dark: rgba(255,255,255,0.92);
          --anko-overlay-light: rgba(255,255,255,0.75);
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
        }

        .anko-four-container {
          position: relative;
          height: 700px;
          overflow: hidden;
          background: var(--anko-bg-primary);
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
          background: linear-gradient(45deg, #1A1A1A, #F8B500); 
        }

        .anko-theme-light { 
          background: linear-gradient(45deg, #FFFFFF, #E6A500); 
        }

        .anko-four-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .anko-four-slide {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.2s ease-in-out;
          background-size: cover;
          background-position: center;
        }

        .anko-four-slide.active {
          opacity: 1;
          z-index: 2;
        }

        .anko-four-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            var(--anko-overlay-dark) 0%, 
            var(--anko-overlay-light) 70%, 
            transparent 100%
          );
        }

        .anko-four-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 55%;
          height: 100%;
          padding: 100px 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 10;
        }

        .anko-four-label {
          display: inline-block;
          background: var(--anko-glass-bg);
          backdrop-filter: blur(10px);
          color: var(--anko-primary);
          border: 2px solid var(--anko-primary);
          padding: var(--anko-space-sm) var(--anko-space-lg);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-radius: 100px;
          margin-bottom: var(--anko-space-xl);
          width: fit-content;
          transition: all 0.3s ease;
        }

        .anko-four-label:hover {
          background: var(--anko-primary);
          color: var(--anko-bg-primary);
          transform: translateX(8px);
        }

        .anko-four-title {
          font-size: 64px;
          font-weight: 900;
          color: var(--anko-text-primary);
          line-height: 1.1;
          margin-bottom: var(--anko-space-lg);
        }

        .anko-four-title .accent {
          background: linear-gradient(45deg, var(--anko-primary) 0%, var(--anko-primary-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
          margin-top: var(--anko-space-md);
        }

        .anko-four-description {
          font-size: 20px;
          font-weight: 400;
          color: var(--anko-text-secondary);
          line-height: 1.6;
          margin-bottom: var(--anko-space-2xl);
          max-width: 520px;
        }

        .anko-four-actions {
          display: flex;
          gap: var(--anko-space-lg);
          align-items: center;
        }

        .anko-btn {
          border-radius: 8px;
          height: 48px;
          padding: 0 var(--anko-space-xl);
          font-size: 16px;
          font-weight: 600;
          min-width: 140px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--anko-space-sm);
          text-decoration: none;
          border: none;
        }

        .anko-btn-primary {
          background: var(--anko-primary);
          color: #FFFFFF;
          box-shadow: var(--anko-shadow-md);
        }

        .anko-btn-primary:hover {
          background: var(--anko-primary-dark);
          transform: translateY(-3px);
          box-shadow: var(--anko-shadow-lg);
        }

        .anko-btn-secondary {
          background: transparent;
          color: var(--anko-primary);
          border: 2px solid var(--anko-primary);
        }

        .anko-btn-secondary:hover {
          background: var(--anko-primary);
          color: #FFFFFF;
          transform: translateY(-3px);
          box-shadow: var(--anko-shadow-lg);
        }

        .anko-four-indicators {
          position: absolute;
          bottom: var(--anko-space-4xl);
          left: 80px;
          display: flex;
          gap: var(--anko-space-md);
          z-index: 20;
        }

        .anko-four-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--anko-text-tertiary);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .anko-four-indicator.active,
        .anko-four-indicator:hover {
          background: var(--anko-primary);
          transform: scale(1.2);
          border-color: var(--anko-primary);
        }

        .anko-four-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
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
          font-size: 20px;
          font-weight: bold;
        }

        .anko-four-nav:hover {
          background: var(--anko-glass-hover);
          border-color: var(--anko-border-hover);
          transform: translateY(-50%) scale(1.1);
          box-shadow: var(--anko-shadow-md);
        }

        .anko-four-nav.prev { right: 120px; }
        .anko-four-nav.next { right: 50px; }

        .anko-four-counter {
          position: absolute;
          top: var(--anko-space-4xl);
          right: 80px;
          color: var(--anko-text-secondary);
          font-size: 16px;
          font-weight: 300;
          z-index: 20;
        }

        .anko-four-counter .current {
          color: var(--anko-primary);
          font-size: 24px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .anko-four-container { height: 600px; }
          .anko-four-content { 
            width: 100%; 
            padding: 60px var(--anko-space-xl); 
            text-align: center; 
          }
          .anko-four-title { font-size: 36px; }
          .anko-four-description { font-size: 18px; max-width: none; }
          .anko-four-actions { 
            flex-direction: column; 
            gap: var(--anko-space-md); 
          }
          .anko-btn { width: 100%; justify-content: center; }
          .anko-four-indicators { 
            left: 50%; 
            transform: translateX(-50%); 
            bottom: var(--anko-space-2xl); 
          }
          .anko-four-nav { display: none; }
          .anko-four-counter { 
            top: var(--anko-space-2xl); 
            right: var(--anko-space-2xl); 
          }
        }
      </style>
      
      <section class="anko-four-container">
        <div class="anko-theme-switcher">
          <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
          <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
        </div>
        
        <div class="anko-four-wrapper">
          <div class="anko-four-slide active" style="background-image: url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=700&fit=crop');">
            <div class="anko-four-overlay"></div>
            <div class="anko-four-content">
              <span class="anko-four-label">ANKO Excellence</span>
              <h2 class="anko-four-title">
                47年食品機械專業
                <span class="accent">創新製造解決方案</span>
              </h2>
              <p class="anko-four-description">
                自1978年成立以來，安口食品機械致力於提供全球最優質的食品生產設備，銷售遍及114個國家，是您值得信賴的生產夥伴。
              </p>
              <div class="anko-four-actions">
                <button class="anko-btn anko-btn-primary">探索產品</button>
                <button class="anko-btn anko-btn-secondary">聯繫我們</button>
              </div>
            </div>
          </div>
          
          <div class="anko-four-slide" style="background-image: url('https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1920&h=700&fit=crop');">
            <div class="anko-four-overlay"></div>
            <div class="anko-four-content">
              <span class="anko-four-label">Manufacturing Excellence</span>
              <h2 class="anko-four-title">
                自動化生產線
                <span class="accent">提升產能與品質</span>
              </h2>
              <p class="anko-four-description">
                從餃子、包子到春捲機械，我們提供完整的自動化解決方案，讓您的生產線達到每小時1,000-12,000個的高效產能。
              </p>
              <div class="anko-four-actions">
                <button class="anko-btn anko-btn-primary">查看設備</button>
                <button class="anko-btn anko-btn-secondary">技術諮詢</button>
              </div>
            </div>
          </div>
          
          <div class="anko-four-slide" style="background-image: url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=700&fit=crop');">
            <div class="anko-four-overlay"></div>
            <div class="anko-four-content">
              <span class="anko-four-label">Global Partnership</span>
              <h2 class="anko-four-title">
                全球合作夥伴
                <span class="accent">創新、熱忱、當責</span>
              </h2>
              <p class="anko-four-description">
                持續投入研發與創新，以「創新、熱忱、當責」的企業精神，為全球客戶提供最適合的食品機械解決方案。
              </p>
              <div class="anko-four-actions">
                <button class="anko-btn anko-btn-primary">成功案例</button>
                <button class="anko-btn anko-btn-secondary">合作洽談</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="anko-four-indicators">
          <div class="anko-four-indicator active" data-index="0"></div>
          <div class="anko-four-indicator" data-index="1"></div>
          <div class="anko-four-indicator" data-index="2"></div>
        </div>
        
        <button class="anko-four-nav prev">‹</button>
        <button class="anko-four-nav next">›</button>
        
        <div class="anko-four-counter">
          <span class="current">01</span> / 03
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
    this.slides = this.shadowRoot.querySelectorAll('.anko-four-slide');
    this.indicators = this.shadowRoot.querySelectorAll('.anko-four-indicator');
    this.counter = this.shadowRoot.querySelector('.anko-four-counter .current');

    this.shadowRoot.querySelector('.anko-four-nav.prev').addEventListener('click', () => this.prevSlide());
    this.shadowRoot.querySelector('.anko-four-nav.next').addEventListener('click', () => this.nextSlide());
    
    this.indicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => this.goToSlide(idx));
    });

    // 自動播放
    this.startAutoPlay();

    // 滑鼠懸停暫停
    const container = this.shadowRoot.querySelector('.anko-four-container');
    container.addEventListener('mouseenter', () => this.stopAutoPlay());
    container.addEventListener('mouseleave', () => this.startAutoPlay());

    // 按鈕點擊效果
    this.shadowRoot.querySelectorAll('.anko-btn').forEach(button => {
      button.addEventListener('click', function(e) {
        this.style.transform = 'translateY(-3px) scale(0.98)';
        setTimeout(() => { this.style.transform = ''; }, 150);
      });
    });
  }

  updateSlider() {
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === this.currentSlide);
    });
    this.indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === this.currentSlide);
    });
    this.counter.textContent = String(this.currentSlide + 1).padStart(2, '0');
  }

  goToSlide(idx) {
    this.currentSlide = idx;
    this.updateSlider();
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
    this.resetAutoPlay();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
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
  }

  disconnectedCallback() {
    this.stopAutoPlay();
  }
}

customElements.define('anko-four', AnkoFour);