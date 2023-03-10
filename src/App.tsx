import Card from "./components/Card";
import flagCodes from "./assets/flagCodes.json";
import { CardType } from "./types";
import { useEffect, useState } from "react";

function App() {
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>([]);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let interval1: number;
    if (started) {
      interval1 = setInterval(() => {
        setSeconds((currentS) => currentS + 1);
        if (seconds === 59) {
          setSeconds(0);
          setMinutes((currentM) => currentM + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval1);
  });

  function handleStart() {
    const boardSize = 4;
    for (let i = 0; i < boardSize; i++) {
      const newCard = {
        id: crypto.randomUUID(),
        pair: Math.floor(i / 2),
        flag: flagCodes.flags[Math.floor(i / 2)],
        fliped: false,
      };
      cards.push(newCard);
      setStarted(true);
    }
  }

  function resetSelectedCards(newSelectedCards: Array<CardType>) {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (
          newSelectedCards.some((selectedCard) => selectedCard.id === card.id)
        ) {
          return { ...card, fliped: false };
        } else {
          return card;
        }
      })
    );
    setSelectedCards([]);
  }

  function handleClickCard(clickedCard: CardType, index: number) {
    const newCards = [...cards];
    newCards[index].fliped = true;
    setCards(newCards);

    const newSelectedList = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedList);

    if (newSelectedList.length < 2) {
      return;
    }

    if (newSelectedList[0].pair !== newSelectedList[1].pair) {
      setTimeout(() => {
        resetSelectedCards(newSelectedList);
      }, 1500);
    } else {
      const newScore = score + 1;
      setScore(newScore);
    }
    setSelectedCards([]);
  }

  return (
    <div className="App">
      <div className="top-bar">
        {!started ? (
          <p>WELCOME</p>
        ) : (
          <div className="score">
            <p>SCORE: </p>
            <p>{score}</p>
            <p className="timer">
              timer:
              {minutes.toLocaleString(undefined, {
                minimumIntegerDigits: 2,
              })}
              :
              {seconds.toLocaleString(undefined, {
                minimumIntegerDigits: 2,
              })}
            </p>
          </div>
        )}
      </div>

      {!started ? (
        <button className="btn-start" onClick={() => handleStart()}>
          <p>START GAME</p>
        </button>
      ) : (
        <div className="board">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              index={index}
              handleClickCard={handleClickCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
