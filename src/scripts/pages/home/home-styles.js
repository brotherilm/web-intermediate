export const homePageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Bitter:wght@400;700&family=Special+Elite&display=swap');
  
  body {
    background-color: #050508;
    color: #c8c8d0;
    font-family: 'Bitter', serif;
    margin: 0;
    padding: 0;
  }
  
  .creepy-container {
    border: 1px solid #1a1a2e;
    min-height: 100vh;
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow-x: hidden;
    background-color: #0a0a13;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(30, 30, 50, 0.1) 0%, transparent 80%),
      radial-gradient(circle at 90% 80%, rgba(20, 20, 30, 0.1) 0%, transparent 70%);
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    border-bottom: 1px solid rgba(120, 120, 160, 0.2);
    padding-bottom: 10px;
  }
  
  .warning-text {
    margin: 0;
    font-size: 14px;
    letter-spacing: 1px;
    opacity: 0.7;
    font-family: 'Special Elite', cursive;
    color: #8a8aa8;
  }
  
  .upload-btn {
    background: rgba(30, 30, 50, 0.6);
    color: #a0a0c0;
    padding: 8px 15px;
    border: 1px solid #2d2d48;
    text-decoration: none;
    font-family: 'Special Elite', cursive;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }
  
  .upload-btn:hover {
    background: rgba(40, 40, 65, 0.8);
    box-shadow: 0 0 10px rgba(100, 100, 160, 0.2);
  }
  
  .creepy-title {
    font-family: 'Creepster', cursive;
    text-align: center;
    font-size: 2.8rem;
    margin: 20px 0 40px;
    letter-spacing: 3px;
    color: #9494c8;
    text-shadow: 0 0 8px rgba(80, 80, 150, 0.6), 0 0 15px rgba(50, 50, 100, 0.4);
  }
  
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto 60px;
    padding: 0 10px;
  }
  
  .photo-item {
    display: flex;
    flex-direction: column;
    background: rgba(15, 15, 30, 0.5);
    border: 1px solid rgba(60, 60, 90, 0.3);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.7);
  }
  
  .photo-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(80, 80, 150, 0.3);
    border-color: rgba(80, 80, 120, 0.4);
  }
  
  .photo-container {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1/1;
    transition: all 0.3s ease;
  }
  
  .photo-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, 
      rgba(20, 20, 40, 0) 0%, 
      rgba(20, 20, 40, 0.6) 100%);
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .photo-container:hover::before {
    opacity: 0.4;
  }
  
  .photo-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(30%) contrast(110%) brightness(85%) saturate(80%);
    transition: all 0.5s ease;
  }
  
  .photo-container:hover img {
    filter: grayscale(20%) contrast(120%) brightness(90%) saturate(90%);
  }
  
  .photo-info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid rgba(60, 60, 90, 0.2);
  }
  
  .photo-name {
    margin: 0;
    font-family: 'Special Elite', cursive;
    font-size: 18px;
    color: #a0a0c8;
    letter-spacing: 0.5px;
  }
  
  .photo-description {
    margin: 5px 0;
    font-size: 14px;
    line-height: 1.4;
    color: #8a8aa8;
    font-style: italic;
    height: 40px;
    overflow: hidden;
  }
  
  .photo-date {
    font-size: 12px;
    color: #6a6a88;
    letter-spacing: 0.5px;
    margin-top: 5px;
    font-family: 'Special Elite', cursive;
  }
  
  .loading-indicator {
    grid-column: 1 / -1;
    text-align: center;
    padding: 30px;
    font-family: 'Special Elite', cursive;
    font-size: 18px;
    color: #8a8aa8;
    letter-spacing: 1px;
  }
  
  .error-container {
    grid-column: 1 / -1;
    text-align: center;
    padding: 30px;
    border: 1px solid rgba(100, 50, 50, 0.3);
    background: rgba(30, 15, 15, 0.3);
    border-radius: 8px;
  }
  
  .error-message {
    font-family: 'Special Elite', cursive;
    font-size: 18px;
    color: #c88a8a;
    margin-bottom: 15px;
  }
  
  .retry-button {
    background: rgba(50, 30, 30, 0.6);
    color: #c0a0a0;
    padding: 8px 20px;
    border: 1px solid #482d2d;
    font-family: 'Special Elite', cursive;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .retry-button:hover {
    background: rgba(65, 40, 40, 0.8);
    box-shadow: 0 0 10px rgba(160, 100, 100, 0.2);
  }
  
  .empty-gallery {
    grid-column: 1 / -1;
    text-align: center;
    padding: 50px;
    font-family: 'Special Elite', cursive;
    font-size: 20px;
    color: #8a8aa8;
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(15, 15, 25, 0.7);
  }
  
  ::-webkit-scrollbar-thumb {
    background: #2a2a48;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #3a3a60;
  }
  
  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      max-width: 600px;
    }
  
    .creepy-title {
      font-size: 2rem;
    }
    
    .photo-name {
      font-size: 16px;
    }
  }
  
  @media (max-width: 480px) {
    .gallery {
      grid-template-columns: 1fr;
      max-width: 90%;
    }
    
    .creepy-title {
      font-size: 1.7rem;
      margin: 15px 0 30px;
    }
    
    .creepy-container {
      padding: 15px;
    }
  }

   @keyframes slide-from-right {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  @keyframes slide-to-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  /* Define view transitions */
  @media (prefers-reduced-motion: no-preference) {
    ::view-transition-old(main-content) {
      animation: 300ms ease-out both slide-to-left;
    }
    
    ::view-transition-new(main-content) {
      animation: 300ms ease-out both slide-from-right;
    }
  }

  /* Add a view transition name for the main content */
  .creepy-container {
    view-transition-name: main-content;
  }
`;
