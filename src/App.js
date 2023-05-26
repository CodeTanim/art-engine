import React, { useState } from 'react';
import { query } from './imageAPI';  // Import the query function
import './App.css';

function App() {
  const [seedText, setSeedText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // New state for loading status

  const handleInputChange = (event) => {
    setSeedText(event.target.value);
  };

  const generateImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random integer
    const newSeedText = `${seedText} ${randomNumber}`;
    setSeedText(newSeedText); 

    setIsLoading(true);  // Start loading
    query({inputs: newSeedText}).then((response) => {
      // Convert blob to object URL and use it as image source
      setImageSrc(URL.createObjectURL(response));
      setIsLoading(false);  // End loading
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-group">
          <input type="text" value={seedText} onChange={handleInputChange} placeholder="Enter seed text" />
          <button onClick={generateImage}>Generate AI Art</button>
        </div>
        <div className="generated-image">
          {isLoading ? (
            <div className="spinner"></div>
          ) : imageSrc && (
            <div className="image-container">
              <img src={imageSrc} alt="Generated art" />
              <a href={imageSrc} download="GeneratedImage.png">
                <button className="download-button">D
                </button>
              </a>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
