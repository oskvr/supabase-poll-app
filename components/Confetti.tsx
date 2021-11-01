import React, { useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function ConfettiEffect() {
  const { width, height } = useWindowSize();
  //   useEffect(() => {
  //     console.log(width, height);
  //   }, [width, height]);

  return (
    <Confetti
      width={width}
      height={height}
      confettiSource={{
        w: 10,
        h: 10,
        x: width / 2,
        y: height / 2,
      }}
      recycle={false}
      gravity={0.05}
    />
  );
}
