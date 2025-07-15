class AnkoFive extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'anko-dark';
    this.categories = [
      { name: '餃子機', img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300&h=200&fit=crop&auto=format' },
      { name: '包子機', img: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=300&h=200&fit=crop&auto=format' },
      { name: '燒賣機', img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format' },
      { name: '春捲機', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop&auto=format' },
      { name: '珍珠粉圓機', img: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&h=200&fit=crop&auto=format' },
      { name: '自動化生產線', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format' },
      { name: '餛飩機', img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=300&h=200&fit=crop&auto=format' },
      { name: '煎餃機', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop&auto=format' },
      { name: '湯包機', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop&auto=format' },
      { name: '小籠包機', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop&auto=format' },
      { name: '燒餅機', img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop&auto=format' },
      { name: '餡餅機', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=200&fit=crop&auto=format' }
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
          --anko-bg-primary: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%);
          --anko-bg-secondary: #2A2A2A;
          --anko-glass-bg: rgba(255,255,255,0.05);
          --anko-glass-hover: rgba(255,255,255,0.1);
          --anko-primary: #FF8C00;
          --anko-primary-dark: #E67E00;
          --anko-text-primary: #FFFFFF;
          --anko-text-secondary: rgba(255,255,255,0.7);
          --anko-border-primary: rgba(255,140,0,0.3);
          --anko-border-hover: #FF8C00;
          --anko-glow-primary: rgba(255,140,0,0.4);
          --anko-card-shadow: rgba(255,140,0,0.2);
          --anko-sweep-color: rgba(255,140,0,0.1);
        }
        
        /* === 淺色主題（提高對比度） === */
        :host([theme="anko-light"]) {
          --anko-bg-primary: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
          --anko-bg-secondary: #F8F9FA;
          --anko-glass-bg: rgba(255,255,255,0.95);
          --anko-glass-hover: rgba(255,255,255,1);
          --anko-primary: #E67E00;
          --anko-primary-dark: #CC6600;
          --anko-text-primary: #1A1A1A;
          --anko-text-secondary: #333333;
          --anko-border-primary: #E67E00;
          --anko-border-hover: #CC6600;
          --anko-glow-primary: rgba(230,126,0,0.2);
          --anko-card-shadow: rgba(230,126,0,0.15);
          --anko-sweep-color: rgba(230,126,0,0.1);
        }

        /* === 基礎間距 === */
        :host {
          --anko-space-xs: 4px;
          --anko-space-sm: 8px;
          --anko-space-md: 16px;
          --anko-space-lg: 24px;
          --anko-space-xl: 32px;
          --anko-space-2xl: 40px;
          --anko-space-3xl: 48px;
          --anko-space-4xl: 60px;
        }

        .anko-five-section {
          position: relative;
          min-height: 100vh;
          background: var(--anko-bg-primary);
          padding: var(--anko-space-4xl) 0;
          overflow: hidden;
        }

        .anko-five-glow {
          position: absolute;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--anko-glow-primary) 0%, transparent 70%);
          border-radius: 50%;
          top: 20%;
          right: 10%;
          animation: ankoFiveGlowPulse 6s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes ankoFiveGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .anko-five-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }

        .anko-five-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--anko-primary);
          border-radius: 50%;
          opacity: 0;
          animation: ankoFiveParticleFloat 12s infinite ease-in-out;
        }

        .anko-five-particle:nth-child(1) { left: 8%; animation-delay: 0s; }
        .anko-five-particle:nth-child(2) { left: 25%; animation-delay: 2s; }
        .anko-five-particle:nth-child(3) { left: 42%; animation-delay: 4s; }
        .anko-five-particle:nth-child(4) { left: 58%; animation-delay: 6s; }
        .anko-five-particle:nth-child(5) { left: 75%; animation-delay: 8s; }
        .anko-five-particle:nth-child(6) { left: 92%; animation-delay: 10s; }

        @keyframes ankoFiveParticleFloat {
          0%, 100% { transform: translateY(100vh); opacity: 0; }
          50% { transform: translateY(-50px); opacity: 0.6; }
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

        .anko-five-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--anko-space-2xl);
        }

        .anko-five-header {
          text-align: center;
          margin-bottom: var(--anko-space-4xl);
        }

        .anko-five-label {
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
        }

        .anko-five-title {
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
          animation: ankoFiveTitleGlow 3s ease-in-out infinite;
        }

        @keyframes ankoFiveTitleGlow {
          0%, 100% { filter: drop-shadow(0 0 8px var(--anko-glow-primary)); }
          50% { filter: drop-shadow(0 0 15px var(--anko-glow-primary)); }
        }

        .anko-five-subtitle {
          font-size: 20px;
          font-weight: 300;
          color: var(--anko-text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          letter-spacing: 1px;
        }

        .anko-five-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: var(--anko-space-lg);
          margin-top: var(--anko-space-2xl);
        }

        .anko-five-card {
          background: var(--anko-glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--anko-border-primary);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          position: relative;
          height: 200px;
          display: flex;
          flex-direction: column;
        }

        .anko-five-card::before {
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

        .anko-five-card:hover::before { opacity: 1; }

        .anko-five-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--anko-sweep-color), transparent);
          transition: left 0.6s ease;
          z-index: 1;
        }

        .anko-five-card:hover::after { left: 100%; }

        .anko-five-card:hover {
          transform: translateY(-8px);
          border-color: var(--anko-border-hover);
          background: var(--anko-glass-hover);
          box-shadow: 0 20px 60px var(--anko-card-shadow);
        }

        .anko-five-image {
          width: 100%;
          height: 140px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          position: relative;
          z-index: 2;
        }

        .anko-five-info {
          flex: 1;
          padding: var(--anko-space-md);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .anko-five-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--anko-text-primary);
          text-align: center;
          line-height: 1.3;
          transition: all 0.3s ease;
        }

        .anko-five-card:hover .anko-five-name {
          color: var(--anko-primary);
          transform: scale(1.05);
        }

        @media (max-width: 1200px) {
          .anko-five-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 768px) {
          .anko-five-section { padding: var(--anko-space-2xl) 0; }
          .anko-five-container { padding: 0 var(--anko-space-md); }
          .anko-five-title { font-size: 32px; }
          .anko-five-grid { grid-template-columns: repeat(2, 1fr); gap: var(--anko-space-md); }
          .anko-five-card { height: 180px; }
          .anko-five-image { height: 120px; }
          .anko-five-name { font-size: 14px; }
          .anko-five-particles { display: none; }
          .anko-five-card:hover { transform: translateY(-4px); }
        }

        @media (max-width: 480px) {
          .anko-five-grid { grid-template-columns: 1fr; }
          .anko-five-card { height: 160px; margin: 0 auto; max-width: 280px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      </style>
      
      <section class="anko-five-section">
        <div class="anko-theme-switcher">
          <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
          <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
        </div>
        
        <div class="anko-five-glow"></div>
        
        <div class="anko-five-particles">
          <div class="anko-five-particle"></div>
          <div class="anko-five-particle"></div>
          <div class="anko-five-particle"></div>
          <div class="anko-five-particle"></div>
          <div class="anko-five-particle"></div>
          <div class="anko-five-particle"></div>
        </div>
        
        <div class="anko-five-container">
          <div class="anko-five-header">
            <span class="anko-five-label">Product Categories</span>
            <h2 class="anko-five-title">食品機械產品分類</h2>
            <p class="anko-five-subtitle">專業食品機械設備，涵蓋各類傳統美食製作，助您實現自動化生產目標</p>
          </div>
          
          <div class="anko-five-grid">
            ${this.categories.map(cat => `
              <div class="anko-five-card">
                <div class="anko-five-image" style="background-image: url('${cat.img}')"></div>
                <div class="anko-five-info">
                  <h3 class="anko-five-name">${cat.name}</h3>
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

    // 卡片點擊效果
    this.shadowRoot.querySelectorAll('.anko-five-card').forEach(card => {
      card.addEventListener('click', function () {
        this.style.transform = 'translateY(-8px) scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        // 可自訂跳轉或事件
        const name = this.querySelector('.anko-five-name').textContent;
        console.log(`查看產品: ${name}`);
        // 可 emit 事件
        // this.dispatchEvent(new CustomEvent('anko-product-click', { detail: { name } }));
      });
    });

    // 入場動畫
    const cards = this.shadowRoot.querySelectorAll('.anko-five-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
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

customElements.define('anko-five', AnkoFive);