import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { query } from './imageAPI';
import './App.css';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/example-prompts">Example Prompts</a></li>
      </ul>
    </nav>
  );
}

function App() {
  const [seedText, setSeedText] = useState('');
  const [imageSrcs, setImageSrcs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSeedText(event.target.value);
  };

  const generateImages = async () => {
    setIsLoading(true);
    const newImageSrcs = [];
    const mid = 'mdjrny-v4 style, aesthetic, beautiful, detailed, 4k, ultra-hd';
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 1000000);
      const response = await query({inputs: `${seedText} ${randomNumber} ${mid}`});
      newImageSrcs.push(URL.createObjectURL(response));
    }
    setImageSrcs(newImageSrcs);
    setIsLoading(false);
  };

  return (
    <div className="App">
      {/* <NavBar /> */}
      <header className="App-header">
        <div className="input-group">
          <input type="text" value={seedText} onChange={handleInputChange} placeholder="Enter prompt"/>
          <button onClick={generateImages}>Generate AI Art</button>
        </div>
        <div className="generated-image">
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <Carousel>
              {imageSrcs.map((src, index) => (
                <div key={index} className="image-container">
                  <img src={src} alt={`Generated art ${index + 1}`} />
                  <a href={src} download={`GeneratedImage${index + 1}.png`}>
                    <button className="download-button">D</button>
                  </a>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
