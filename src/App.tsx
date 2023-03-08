import Card from "./components/Card";
import flagCodes from "./assets/flagCodes.json";
import { CardType } from "./types";
import { useState } from "react";
import { splitVendorChunkPlugin } from "vite";

function App() {
  const [cards, setCards] = useState<Array<CardType>>([]);
  const [selectedCards, setSelectedCards] = useState<Array<CardType>>([]);
  const [started, setStarted] = useState(false);

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
    const newList = [...cards];
    newSelectedCards.forEach((selectedCard) => {
      const index = newList.findIndex((card) => selectedCard.id === card.id);
      newList[index].fliped = false;
    });

    setCards(newList);
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
      }, 1000);
    }
    setSelectedCards([]);
  }

  return (
    <div className="App">
      {!started ? (
        <button onClick={() => handleStart()}>start</button>
      ) : (
        <div className="board">
          {cards.map((card, index) => (
            <button key={index} onClick={() => handleClickCard(card, index)}>
              <Card card={card} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
