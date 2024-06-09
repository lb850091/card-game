export interface IDeck {
  remaining: number;
  deckId: string;
}
export interface IPlayer {
  remaining: number;
  name: string;
  card?: ICard;
}

export interface ICard {
  code: string;
  value: string | number;
  suit: "HEARTS" | "CLUBS" | "SPIDERS" | "DIAMONDS";
  image?: string;
}

export interface IPlayers {
  [key: string]: IPlayer;
}
