/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react";
import { CardType } from "./types";
import Card from "./components/Card";
import Timer from "./components/Timer";
import { useState } from "react";
import flagCodes from "../public/assets/flagCodes.json";
import { useTimer } from "react-use-precision-timer";
import BoardSizeSelect from "./components/BoardSizeSelect";

function App() {
  const [boardSize, setBoardSize] = useState<number>(4);
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>([]);
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [victory, setVictory] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const timerRunning = React.useCallback(() => {
    const runTimeSeconds = Math.floor(timer.getElapsedRunningTime() / 1000);
    setSeconds(runTimeSeconds);
  }, []);

  const timer = useTimer({ delay: 1000 }, timerRunning);

  function handleStart() {
    const newCards = [];
    for (let i = 0; i < boardSize; i++) {
      const newCard = {
        id: crypto.randomUUID(),
        pair: Math.floor(i / 2),
        flag: flagCodes.flags[Math.floor(i / 2)],
        fliped: false,
      };
      newCards.push(newCard);
      shuffleCards(newCards);
      setStarted(true);
      timer.start();
    }
  }

  function shuffleCards(cardArray: Array<CardType>) {
    for (let i = cardArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
    }

    setCards(cardArray);
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
      }, 1250);
    } else {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore >= Math.floor(cards.length / 2)) {
        setVictory(true);
        timer.stop();
      }
    }
    setSelectedCards([]);
  }

  function handleReset(): void {
    let newCards = [...cards];
    newCards = newCards.map((card) => {
      return { ...card, fliped: false };
    });
    setCards(newCards);
    setTimeout(() => {
      shuffleCards(newCards);
    }, 500);

    // TODO: shuffle cards
    setVictory(false);
    setScore(0);
    setSeconds(0);
    timer.start();
  }

  function onSelectBoardSize(selectedSize: string) {
    console.log(selectedSize);
    setBoardSize(parseInt(selectedSize));
  }

  return (
    <div className="App">
      <div className="top-bar">
        <div className="score">
          <p>SCORE: </p>
          <p>{score}</p>
          <Timer seconds={seconds} />
        </div>
      </div>

      {!started ? (
        <>
          <BoardSizeSelect
            selectedBoardSize={boardSize}
            onSelectBoardSize={onSelectBoardSize}
          />
          <button className="btn-start" onClick={() => handleStart()}>
            <p>START GAME</p>
          </button>
        </>
      ) : (
        <div
          className="board"
          style={{
            gridTemplateRows: `repeat(${Math.sqrt(boardSize)}, auto)`,
            gridTemplateColumns: `repeat(${Math.sqrt(boardSize)}, auto)`,
          }}
        >
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
      {victory ? (
        <div className="victory-box">
          <p>VICTORY!!</p>
          <button className="btn-reset" onClick={() => handleReset()}>
            reset
          </button>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default App;
