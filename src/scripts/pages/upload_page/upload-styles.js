export const uploadPageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Bitter:wght@400;700&family=Special+Elite&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    
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

  .upload-form-container {
    max-width: 700px;
    margin: 0 auto 60px;
    padding: 0;
  }
  
  .creepy-form {
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
  
  .form-control input,
  .form-control textarea,
  .form-control select {
    width: 100%;
    padding: 12px;
    background: rgba(10, 10, 20, 0.6);
    color: #b0b0d0;
    border: 1px solid #2a2a40;
    border-radius: 4px;
    font-family: 'Bitter', serif;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  
  .form-control input:focus,
  .form-control textarea:focus,
  .form-control select:focus {
    outline: none;
    border-color: #4a4a70;
    box-shadow: 0 0 8px rgba(100, 100, 160, 0.4), inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .form-control input::placeholder,
  .form-control textarea::placeholder {
    color: #5a5a78;
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  
  .btn {
    padding: 10px 18px;
    border: none;
    background: #2a2a48;
    color: #b2b2d8;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Special Elite', cursive;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .btn:hover {
    background: #3a3a60;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    transform: translateY(-1px);
  }
  
  .btn-outline {
    background: transparent;
    border: 1px solid #3d3d68;
    color: #9898c0;
  }
  
  .btn-outline:hover {
    background: rgba(40, 40, 70, 0.4);
  }
  
  .btn + .btn {
    margin-left: 10px;
  }
  
  .documentation-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  
  .camera-container {
    margin-top: 15px;
    display: none;
  }
  
  .camera-video,
  .camera-canvas {
    width: 100%;
    max-height: 300px;
    background: #000;
    border-radius: 6px;
    border: 1px solid #2a2a48;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  }
  
  .location-map-container {
      margin-top: 10px;
      border: 1px solid #444;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
      overflow: hidden;
      height: 350px;
      position: relative;
    }

    #map {
      width: 100%;
      height: 100%;
    }

    .maplibregl-ctrl-attrib {
      background-color: rgba(255, 255, 255, 0.8) !important;
      color: #333 !important;
    }

    .maplibregl-ctrl-attrib a {
      color: #555 !important;
    }

    .maplibregl-ctrl button {
      background-color: rgba(255, 255, 255, 0.9) !important;
    }

    .maplibregl-ctrl button:hover {
      background-color: rgba(240, 240, 240, 1) !important;
    }

    .maplibregl-ctrl svg {
      fill: #333 !important;
    }

    .maplibregl-popup {
      color: #333;
    }

    .maplibregl-popup-content {
      background: rgba(255, 255, 255, 0.95) !important;
      border: 1px solid rgba(100, 100, 100, 0.3) !important;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3) !important;
    }
  
  .maplibregl-marker {
    cursor: pointer;
  }
  
  .location-coords {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .location-coords input {
    flex: 1;
    padding: 12px;
    background: rgba(10, 10, 20, 0.6);
    color: #b0b0d0;
    border: 1px solid #2a2a40;
    border-radius: 4px;
    font-family: 'Bitter', serif;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .location-coords input:focus {
    outline: none;
    border-color: #4a4a70;
    box-shadow: 0 0 8px rgba(100, 100, 160, 0.4), inset 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .form-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 35px;
  }
  
  #documentations-more-info {
    font-size: 0.9rem;
    color: #6a6a90;
    margin-bottom: 12px;
    font-style: italic;
  }
  
  .documentation-outputs {
    list-style: none;
    padding: 0;
    margin: 15px 0 0;
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
    .creepy-title {
      font-size: 2rem;
    }
    
    .upload-form-container {
      padding: 0 15px;
      margin-bottom: 40px;
    }
    
    .creepy-form {
      padding: 20px;
    }
    
    .location-map-container {
      height: 250px;
    }
  }
  
  @media (max-width: 480px) {
    .form-buttons {
      flex-direction: column;
      gap: 15px;
    }
    
    .form-buttons a {
      text-align: center;
      width: 100%;
      display: block;
    }
    
    #submit-button-container {
      width: 100%;
    }
    
    #submit-button-container .btn {
      width: 100%;
    }
    
    .creepy-container {
      padding: 15px;
    }
    
    .location-map-container {
      height: 200px;
    }
  }
`;
