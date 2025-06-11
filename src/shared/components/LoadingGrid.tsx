import React from 'react';

const LoadingGrid = () => {
  return (
    <div
      className="backdrop-blur-[80px] bg-[linear-gradient(230.99deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,0.6)_100%)]
 w-full rounded-md xs:min-w-full min-w-[225px] min-h-[200px] flex items-center justify-center animate-pulse"
    ></div>
  );
};

export default LoadingGrid;
