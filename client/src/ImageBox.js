import React, { useRef, useEffect, useState } from 'react';
import './ImageBox.css'; // Import the CSS file for styling

const ImageBox = ({ src, onVisible, onHidden }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            if (typeof onVisible === 'function') {
              onVisible();
            }
          } else if (!entry.isIntersecting && isVisible) {
            setIsVisible(false);
            if (typeof onHidden === 'function') {
              onHidden();
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the image is visible
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [onVisible, onHidden, isVisible]);

  return <img className="image-box" ref={imgRef} src={src} alt="Image Box" style={{ scrollSnapAlign: 'start' }}/>;
};

export default ImageBox;