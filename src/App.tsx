import { useState } from "react";

import "./App.css";
import { getRandomNumber } from "./services/getRandomNumber";
import { Roulette } from "./components/Roulette";

function App() {
  const [winner, setWinner] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = async () => {
    const [err, data] = await getRandomNumber();
    if (err) {
      console.error(err);
      return;
    }
    if (!data) {
      console.error("Something went wrong");
      return;
    }
    setWinner(data?.value);
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 6000);
  };

  return (
    <main>
      <h1>Ruleta de Número Aleatorio</h1>
      <button disabled={isSpinning} onClick={handleClick}>
        Tirar
      </button>

      <Roulette isSpinning={isSpinning} winner={winner !== null ? winner : 1} />
      <h2>
        Número Ganador:
        {!isSpinning && winner && winner}
      </h2>
    </main>
  );
}

export default App;
