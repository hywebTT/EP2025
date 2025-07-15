class AnkoEleven extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentTheme = this.getAttribute('theme') || 'anko-dark';
    this.videos = [
      {
        id: '4fwg44RQ0Yg',
        title: '安口食品機械 - 自動化餃子生產線',
        description: '展示我們最新的全自動餃子生產設備，每小時可生產12,000個餃子',
        thumbnail: `https://img.youtube.com/vi/4fwg44RQ0Yg/maxresdefault.jpg`,
        embedUrl: 'https://www.youtube.com/embed/4fwg44RQ0Yg'
      },
      {
        id: 'cTZidkAmS-k',
        title: '包子機械設備操作示範',
        description: '完整展示包子機的操作流程，從麵團製作到成型包裝',
        thumbnail: `https://img.youtube.com/vi/cTZidkAmS-k/maxresdefault.jpg`,
        embedUrl: 'https://www.youtube.com/embed/cTZidkAmS-k'
      },
      {
        id: 'FtOckX2qvgk',
        title: '春捲生產線技術解析',
        description: '深入了解春捲自動化生產技術，提升產能與品質控制',
        thumbnail: `https://img.youtube.com/vi/FtOckX2qvgk/maxresdefault.jpg`,
        embedUrl: 'https://www.youtube.com/embed/FtOckX2qvgk'
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

        .anko-eleven-section {
          position: relative;
          min-height: 100vh;
          background: var(--anko-bg-primary);
          padding: var(--anko-space-5xl) 0;
          overflow: hidden;
        }

        .anko-eleven-bg-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .anko-eleven-grid-pattern {
          position: absolute;
          width: 120%;
          height: 120%;
          background-image: 
            linear-gradient(rgba(230,126,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(230,126,0,0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: ankoElevenGridMove 20s linear infinite;
          opacity: 0.3;
        }

        @keyframes ankoElevenGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .anko-eleven-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--anko-glow-primary) 0%, transparent 70%);
          border-radius: 50%;
          top: 20%;
          right: 10%;
          animation: ankoElevenGlowPulse 6s ease-in-out infinite;
        }

        @keyframes ankoElevenGlowPulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
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

        .anko-eleven-container {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--anko-space-2xl);
        }

        .anko-eleven-header {
          text-align: center;
          margin-bottom: var(--anko-space-5xl);
        }

        .anko-eleven-label {
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
          transition: all 0.3s ease;
        }

        .anko-eleven-label:hover {
          border-color: var(--anko-border-hover);
          background: var(--anko-glass-hover);
          transform: scale(1.05);
        }

        .anko-eleven-title {
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

        .anko-eleven-subtitle {
          font-size: 20px;
          font-weight: 300;
          color: var(--anko-text-secondary);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .anko-eleven-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: var(--anko-space-3xl);
          margin-top: var(--anko-space-4xl);
        }

        .anko-eleven-video-card {
          background: var(--anko-glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--anko-border-primary);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          opacity: 0;
          transform: translateY(30px);
        }

        .anko-eleven-video-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, var(--anko-primary), transparent, var(--anko-primary));
          border-radius: 20px;
          padding: 2px;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .anko-eleven-video-card:hover::before {
          opacity: 1;
        }

        .anko-eleven-video-card:hover {
          transform: translateY(-8px);
          border-color: var(--anko-border-hover);
          background: var(--anko-glass-hover);
          box-shadow: 0 20px 60px var(--anko-card-shadow);
        }

        .anko-eleven-thumbnail {
          position: relative;
          width: 100%;
          height: 250px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .anko-eleven-play-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .anko-eleven-play-btn {
          width: 80px;
          height: 80px;
          background: var(--anko-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 32px;
          transition: all 0.3s ease;
          position: relative;
        }

        .anko-eleven-play-btn::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid var(--anko-primary);
          border-radius: 50%;
          animation: ankoElevenPlayPulse 2s ease-in-out infinite;
        }

        @keyframes ankoElevenPlayPulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .anko-eleven-video-card:hover .anko-eleven-play-btn {
          transform: scale(1.1);
          background: var(--anko-primary-dark);
        }

        .anko-eleven-video-content {
          padding: var(--anko-space-xl);
        }

        .anko-eleven-video-title {
          font-size: 24px;
          font-weight: 700;
          color: var(--anko-text-primary);
          margin-bottom: var(--anko-space-md);
          line-height: 1.3;
        }

        .anko-eleven-video-desc {
          font-size: 16px;
          font-weight: 300;
          color: var(--anko-text-secondary);
          line-height: 1.6;
        }

        .anko-eleven-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(10px);
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--anko-space-lg);
        }

        .anko-eleven-modal.active {
          opacity: 1;
          visibility: visible;
        }

        .anko-eleven-modal-content {
          position: relative;
          width: 100%;
          max-width: 1000px;
          aspect-ratio: 16/9;
          transform: scale(0.8);
          transition: all 0.4s ease;
        }

        .anko-eleven-modal.active .anko-eleven-modal-content {
          transform: scale(1);
        }

        .anko-eleven-video-frame {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
          background: #000;
        }

        .anko-eleven-close-btn {
          position: absolute;
          top: -50px;
          right: 0;
          width: 40px;
          height: 40px;
          background: var(--anko-glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--anko-border-primary);
          border-radius: 50%;
          color: var(--anko-text-primary);
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .anko-eleven-close-btn:hover {
          background: var(--anko-primary);
          color: #FFFFFF;
          border-color: var(--anko-primary);
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .anko-eleven-section { padding: var(--anko-space-4xl) 0; }
          .anko-eleven-container { padding: 0 var(--anko-space-md); }
          .anko-eleven-title { font-size: 36px; }
          .anko-eleven-subtitle { font-size: 18px; }
          .anko-eleven-grid { 
            grid-template-columns: 1fr; 
            gap: var(--anko-space-2xl); 
          }
          .anko-eleven-thumbnail { height: 200px; }
          .anko-eleven-play-btn { width: 60px; height: 60px; font-size: 24px; }
          .anko-eleven-video-title { font-size: 20px; }
          .anko-eleven-bg-elements { display: none; }
          .anko-eleven-modal { padding: var(--anko-space-md); }
          .anko-eleven-close-btn { top: -40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .anko-eleven-fade-up {
          animation: ankoElevenFadeUp 0.8s ease forwards;
        }

        @keyframes ankoElevenFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      </style>
      
      <section class="anko-eleven-section">
        <div class="anko-theme-switcher">
          <button class="anko-theme-btn anko-theme-dark" data-theme="anko-dark" title="深色主題"></button>
          <button class="anko-theme-btn anko-theme-light" data-theme="anko-light" title="淺色主題"></button>
        </div>
        
        <div class="anko-eleven-bg-elements">
          <div class="anko-eleven-grid-pattern"></div>
          <div class="anko-eleven-glow"></div>
        </div>
        
        <div class="anko-eleven-container">
          <div class="anko-eleven-header">
            <span class="anko-eleven-label">Video Gallery</span>
            <h2 class="anko-eleven-title">產品實機操作影片</h2>
            <p class="anko-eleven-subtitle">
              深入了解安口食品機械的專業設備運作，見證47年來的技術創新與製造工藝
            </p>
          </div>
          
          <div class="anko-eleven-grid">
            ${this.videos.map(video => `
              <div class="anko-eleven-video-card" data-video-id="${video.id}">
                <div class="anko-eleven-thumbnail" style="background-image: url('${video.thumbnail}')">
                  <div class="anko-eleven-play-overlay">
                    <div class="anko-eleven-play-btn">▶</div>
                  </div>
                </div>
                <div class="anko-eleven-video-content">
                  <h3 class="anko-eleven-video-title">${video.title}</h3>
                  <p class="anko-eleven-video-desc">${video.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="anko-eleven-modal" id="videoModal">
          <div class="anko-eleven-modal-content">
            <button class="anko-eleven-close-btn">&times;</button>
            <iframe class="anko-eleven-video-frame" id="videoFrame" src="" allowfullscreen></iframe>
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

    // 影片卡片點擊
    this.shadowRoot.querySelectorAll('.anko-eleven-video-card').forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        this.openVideoModal(videoId);
      });
    });

    // 光箱關閉
    const modal = this.shadowRoot.getElementById('videoModal');
    const closeBtn = this.shadowRoot.querySelector('.anko-eleven-close-btn');
    
    closeBtn.addEventListener('click', () => this.closeVideoModal());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeVideoModal();
      }
    });

    // ESC 鍵關閉光箱
    this._escHandler = (event) => {
      if (event.key === 'Escape') {
        this.closeVideoModal();
      }
    };
    document.addEventListener('keydown', this._escHandler);

    // 進場動畫
    const cards = this.shadowRoot.querySelectorAll('.anko-eleven-video-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('anko-eleven-fade-up');
      }, index * 200);
    });
  }

  openVideoModal(videoId) {
    const video = this.videos.find(v => v.id === videoId);
    if (!video) return;

    const modal = this.shadowRoot.getElementById('videoModal');
    const frame = this.shadowRoot.getElementById('videoFrame');
    
    frame.src = `${video.embedUrl}?autoplay=1`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal() {
    const modal = this.shadowRoot.getElementById('videoModal');
    const frame = this.shadowRoot.getElementById('videoFrame');
    
    modal.classList.remove('active');
    frame.src = '';
    document.body.style.overflow = 'auto';
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
    // 清理事件監聽器
    document.removeEventListener('keydown', this._escHandler);
  }
}

customElements.define('anko-eleven', AnkoEleven);