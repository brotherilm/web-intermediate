export const detailsPhotoStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Bitter:wght@400;700&family=Special+Elite&display=swap');
  
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
  
  .loading-indicator {
    color: #9494c8;
    font-family: 'Special Elite', cursive;
    text-align: center;
    margin: 40px 0;
    font-size: 18px;
    letter-spacing: 1px;
  }
  
  .error-message {
    color: #9494c8;
    font-family: 'Special Elite', cursive;
    text-align: center;
    margin: 40px 0;
    font-size: 18px;
  }
  
  .back-btn {
    display: inline-block;
    background-color: rgba(18, 18, 28, 0.7);
    color: #9494c8;
    padding: 8px 16px;
    text-decoration: none;
    font-family: 'Special Elite', cursive;
    border: 1px solid rgba(60, 60, 90, 0.3);
    margin-left: 15px;
    transition: all 0.3s;
    border-radius: 4px;
  }
  
  .back-btn:hover {
    background-color: rgba(30, 30, 50, 0.7);
    box-shadow: 0 0 10px rgba(80, 80, 150, 0.3);
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
  
  .creepy-title {
    font-family: 'Creepster', cursive;
    text-align: center;
    font-size: 2.8rem;
    margin: 20px 0 40px;
    letter-spacing: 3px;
    color: #9494c8;
    text-shadow: 0 0 8px rgba(80, 80, 150, 0.6), 0 0 15px rgba(50, 50, 100, 0.4);
  }
  
  .details-container {
    max-width: 700px;
    margin: 0 auto 60px;
    padding: 0;
    background: rgba(18, 18, 28, 0.7);
    border-radius: 5px;
    padding: 25px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(60, 60, 90, 0.3);
    backdrop-filter: blur(5px);
  }
  
  .form-control {
    margin-bottom: 24px;
  }
  
  .form-label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #a2a2c8;
    text-shadow: 0 0 3px rgba(40, 40, 80, 0.5);
    font-family: 'Special Elite', cursive;
    letter-spacing: 0.5px;
  }
  
  .input-container {
    background: rgba(10, 10, 20, 0.6);
    border: 1px solid #2a2a40;
    border-radius: 4px;
    padding: 12px;
  }
  
  .detail-value {
    width: 100%;
    color: #b0b0d0;
    font-family: 'Bitter', serif;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
    min-height: 20px;
  }
  
  .image-slider-container {
    margin-top: 10px;
  }
  
  .creepy-image {
    width: 100%;
    max-height: 400px;
    object-fit: contain;
    border-radius: 6px;
    border: 1px solid #2a2a48;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
    background: #000;
  }
  
  .location-coords {
    display: flex;
    gap: 10px;
  }
  
  .coord-input {
    width: 100%;
    padding: 12px;
    background: rgba(10, 10, 20, 0.6);
    color: #b0b0d0;
    border: 1px solid #2a2a40;
    border-radius: 4px;
    font-family: 'Bitter', serif;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .location-map-container {
    margin-top: 10px;
    border: 1px solid #2a2a48;
    height: 250px;
    border-radius: 6px;
    background: rgba(15, 15, 25, 0.7);
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  .location-map {
    height: 100%;
    width: 100%;
    border-radius: 6px;
    color: #6a6a90;
  }
  
  @media (max-width: 768px) {
    .creepy-title {
      font-size: 2rem;
    }
    
    .details-container {
      padding: 20px;
    }
  }
  
  @media (max-width: 480px) {
    .creepy-container {
      padding: 15px;
    }
    
    .location-coords {
      flex-direction: column;
      gap: 10px;
    }
  }

   /* View Transition animations for going back to home */
  @keyframes slide-from-left {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes slide-to-right {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }

  /* Define view transitions */
  @media (prefers-reduced-motion: no-preference) {
    ::view-transition-old(main-content) {
      animation: 300ms ease-out both slide-to-right;
    }
    
    ::view-transition-new(main-content) {
      animation: 300ms ease-out both slide-from-left;
    }
  }

  /* Add a view transition name for the main content */
  .creepy-container {
    view-transition-name: main-content;
  }
`;
