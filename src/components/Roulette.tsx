import { useEffect, useState } from "react";
import "./roulette.css";
import { getRandomColor } from "../utils/randomColor";

interface PROPS {
  winner: number;
  isSpinning: boolean;
}

export const Roulette: React.FC<PROPS> = ({ winner, isSpinning }) => {
  const [rotationDegree, setRotationDegree] = useState(0);

  const cellsNumber = 100;
  const numbers = Array.from({ length: cellsNumber }, (_, i) => i + 1);

  const rouletteWidth = 360;
  const cellsAngle = 360 / cellsNumber; // Ángulo de cada celda
  const degree = (180 - cellsAngle) / 2;
  const cellHeight = Math.tan((degree * Math.PI) / 180) * (rouletteWidth / 2);

  useEffect(() => {
    if (isSpinning) {
      const spins = 20;
      const targetRotation = (cellsNumber - winner + 1) * cellsAngle;
      const totalRotation = spins * 360 + targetRotation;

      setRotationDegree(0);
      const animationDelay = 1000;
      setTimeout(() => {
        setRotationDegree(totalRotation);
      }, animationDelay);
    }
  }, [isSpinning, winner, cellsAngle]);

  return (
    <section className="roulette-container">
      <article
        style={{
          width: `${rouletteWidth}px`,
          height: `${rouletteWidth}px`,
          transform: `rotate(${rotationDegree}deg)`,
          transition: isSpinning ? "transform 5s ease-out" : "", // Animación de 5 segundos
        }}
        className={`roulette`}
      >
        {numbers.map((num, index) => (
          <div
            key={num}
            style={{
              transform: `rotate(${cellsAngle * index}deg)`,
              borderBottomColor: getRandomColor(),
              borderBottomWidth: `${cellHeight}px`,
              borderRightWidth: `${rouletteWidth / 2}px`,
              borderLeftWidth: `${rouletteWidth / 2}px`,
            }}
            className={`option option-${index}`}
          >
            <span className="pseudo-element-before">{num}</span>
          </div>
        ))}
      </article>
    </section>
  );
};
