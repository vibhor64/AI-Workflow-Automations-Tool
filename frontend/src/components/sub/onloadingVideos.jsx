import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import first from '../../assets/Weavebot-1.mp4.lottie'
import second from '../../assets/Weavebot-2.mp4.lottie'
import third from '../../assets/Weavebot-3.mp4.lottie'
import fourth from '../../assets/Wevaebot-4.mp4.lottie'

export const Onloading1 = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Reference to the DOM element
      renderer: 'svg', // Render as SVG
      loop: true, // Loop the animation
      autoplay: true, // Auto-play the animation
      animationData: first, // Path to your JSON file
    });
  }, []);

  return <div ref={container} style={{ width: '560px', height: 'auto', margin: '0 auto', padding: '0', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #edb015', borderRadius: '8px',  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',  }} />;
};

export const Onloading2 = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Reference to the DOM element
      renderer: 'svg', // Render as SVG
      loop: true, // Loop the animation
      autoplay: true, // Auto-play the animation
      animationData: second, // Path to your JSON file
    });
  }, []);

  return <div ref={container} style={{ width: '560px', height: 'auto', margin: '0 auto', padding: '0', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #edb015', borderRadius: '8px',  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',  }} />;
};

export const Onloading3 = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Reference to the DOM element
      renderer: 'svg', // Render as SVG
      loop: true, // Loop the animation
      autoplay: true, // Auto-play the animation
      animationData: third, // Path to your JSON file
    });
  }, []);

  return <div ref={container} style={{ width: '560px', height: 'auto', margin: '0 auto', padding: '0', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #edb015', borderRadius: '8px',  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',  }} />;
};

export const Onloading4 = () => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current, // Reference to the DOM element
      renderer: 'svg', // Render as SVG
      loop: true, // Loop the animation
      autoplay: true, // Auto-play the animation
      animationData: fourth, // Path to your JSON file
    });
  }, []);

  return <div ref={container} style={{ width: '560px', height: 'auto', margin: '0 auto', padding: '0', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '4px solid #edb015', borderRadius: '8px',  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',  }} />;
};
