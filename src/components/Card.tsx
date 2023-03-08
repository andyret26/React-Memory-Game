import { CardType } from "../types";

interface Props {
  card: CardType;
}

export default function Card({ card }: Props) {
  return (
    <div className={card.fliped ? "card card-front" : "card card-back"}>
      <p>{card.fliped}</p>
      <p>{card.flag}</p>
      <p>{card.pair}</p>
    </div>
  );
}
