import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiEffect() {
  const [screenDimensions, setScreenDimensions] = useState({width: 0, height: 0})

  useEffect(() => {
    setScreenDimensions({width: window.innerWidth, height: window.innerHeight})
  }, []);

  const {width, height} = screenDimensions

  return (
    <Confetti
      width={width}
      height={height}
      recycle={true}
      gravity={0.05}
    />
  );
}
