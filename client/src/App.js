import React, { useState, useEffect } from 'react';
import ImageBox from './ImageBox';

const App = () => {
  const [imageTimes, setImageTimes] = useState({});
  const [visibleImage, setVisibleImage] = useState(null);
  const [username, setUsername] = useState(null);
  const [images, setImages] = useState(new Array(5).fill('https://via.placeholder.com/1024'));

  useEffect(() => {
    let user = window.prompt('Please enter your username');
    while (user == null || user == "") {
        user = window.prompt('HEY DONT EXIT!!! ENTER YOUR USERNAME OR NO ACCESS');
    }
    setUsername(user);
  }, []);

  if (!username) {
    return null;
  }

  const handleHidden = (id) => {
    if (id !== visibleImage) {
      return;
    }
    setImageTimes((prevTimes) => {
      const currentTime = Date.now();
      const prevTime = prevTimes[id].timeSpent || 0;
      const newTimeSpent = prevTime + currentTime - prevTimes[id].startTime;

      console.log(`Image ${id} was viewed for ${newTimeSpent} milliseconds.`);
      
      // Send data to the server
      fetch('https://3000-hashyies-genderfactor-gmp2f4qwbgz.ws-us110.gitpod.io/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          imageId: id,
          timeSpent: newTimeSpent,
        }),
      });

      return {
        ...prevTimes,
        [id]: { ...prevTimes[id], timeSpent: newTimeSpent }
      };
    });
  };

  const handleVisible = (id) => {
    if (visibleImage !== null && visibleImage !== id) {
      handleHidden(visibleImage);
    }
    setVisibleImage(id);
    setImageTimes((prevTimes) => ({
      ...prevTimes,
      [id]: { ...prevTimes[id], startTime: Date.now() }
    }));

    // Load more images when we reach the 5th image
    if (id === 4) {
      setImages(prevImages => [...prevImages, ...new Array(5).fill('https://via.placeholder.com/1024')]);
    }
  };

  // Render ImageBox components with placeholder images
  const imageElements = images.map((src, index) => (
    <ImageBox
      key={index}
      src={src}
      onVisible={() => handleVisible(index)}
      onHidden={() => handleHidden(index)}
    />
  ));

  return <div style={{ overflowY: 'auto', height: '100vh', scrollSnapType: 'y mandatory' }}>
    {imageElements}
  </div>;
};

export default App;