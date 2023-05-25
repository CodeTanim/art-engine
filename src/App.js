import React, { useState } from 'react';
import { query } from './imageAPI';  // Import the query function
import './App.css';

function App() {
  const [seedText, setSeedText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleInputChange = (event) => {
    setSeedText(event.target.value);
  };

  const generateImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random integer
    const newSeedText = `${seedText} ${randomNumber}`;
    setSeedText(newSeedText); 

    query({inputs: newSeedText}).then((response) => {
      // Convert blob to object URL and use it as image source
      setImageSrc(URL.createObjectURL(response));
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
      {imageSrc && (
    <div className="image-container">
      <img src={imageSrc} alt="Generated art" />

    </div>
  )}
</div>
      </header>
    </div>
  );
}

export default App;
