import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import done from '../../assets/done.json'

const LottieAnimation = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Reference to the DOM element
      renderer: 'svg', // Render as SVG
      loop: false, // Loop the animation
      autoplay: true, // Auto-play the animation
      animationData: done, // Path to your JSON file
    });
  }, []);

  return <div ref={container} style={{ width: '300px', height: '300px', margin: '0 auto', padding: '0' }} />;
};

export default LottieAnimation;