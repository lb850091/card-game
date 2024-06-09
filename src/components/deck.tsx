import Player from "./player";

export interface DeckProps {
  remainings: number;
}

export function Deck({ remainings }: DeckProps) {
  return (
    <>
      <Player
        key={"gameDeck"}
        name={"Deck"}
        src={"https://deckofcardsapi.com/static/img/back.png"}
        remaining={remainings || 0}
      ></Player>
    </>
  );
}

export default Deck;
