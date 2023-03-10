import "./Card.css";
import { CardType } from "../types";

interface Props {
  card: CardType;
  index: number;
  handleClickCard: (card: CardType, index: number) => void;
}

export default function Card({ card, index, handleClickCard }: Props) {
  return (
    <button className="btn-card" onClick={() => handleClickCard(card, index)}>
      <div className="card-container">
        <div className={card.fliped ? "card flip" : "card"}>
          <div className="face card-front">
            <img src={`/src/assets/flags/${card.flag}.png`} alt={card.flag} />
          </div>

          <div className="face card-back"></div>
        </div>
      </div>
    </button>
  );
}
