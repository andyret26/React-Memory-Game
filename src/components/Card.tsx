import { CardType } from "../types";

interface Props {
  card: CardType;
  index: number;
  handleClickCard: (card: CardType, index: number) => void;
}

export default function Card({ card, index, handleClickCard }: Props) {
  return (
    <button onClick={() => handleClickCard(card, index)}>
      <div className="card-container">
        <div className={card.fliped ? "card flip" : "card"}>
          <div className="face card-front">
            <p>{card.fliped}</p>
            <p>{card.flag}</p>
            <p>{card.pair}</p>
          </div>

          <div className="face card-back"></div>
        </div>
      </div>
    </button>
  );
}
