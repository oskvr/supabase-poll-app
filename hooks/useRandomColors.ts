import { useEffect, useState } from "react";

export default function useRandomColors(amount: number) {
  const [colors, setColors] = useState<string[]>([]);
  useEffect(() => {
    let randomColors = [];
    for (let i = 0; i < amount; i++) {
      const rgb = `rgb(${getRandom255()}, ${getRandom255()}, ${getRandom255()})`;
      randomColors.push(rgb);
    }
    setColors(randomColors);
  }, [amount]);
  return colors;
}

function getRandom255() {
  return Math.floor(Math.random() * 255);
}
