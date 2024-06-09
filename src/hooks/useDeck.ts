import { useState } from "react";
import { DeckAPI } from "../apis/deck-api";
import { createNamesGenerator } from "../utils/game-service";
import { IDeck, IPlayer, IPlayers } from "../models/game-interface";

const getPlayers = (numOfUsers: number): { [key: string]: IPlayer } => {
  const names = createNamesGenerator();
  const players: { [key: string]: IPlayer } = {};

  for (let i = 0; i < numOfUsers; i++) {
    const user: IPlayer = {
      name: names.next().value || "user",
      remaining: 0
    };
    players[user.name] = user;
  }

  return players;
};

export function useDeck() {
  const [deck, setDeck] = useState<IDeck>();
  const [players, setPlayers] = useState<IPlayers>();

  const create = async (numOfUsers: number = 2) => {
    try {
      const response = await DeckAPI.create();
      const { deck_id, remaining } = response.data;

      const newDeck = { remaining: remaining, deckId: deck_id };
      const newPlayers = getPlayers(numOfUsers);
      setDeck(newDeck);
      setPlayers(newPlayers);
    } catch (err) {
      console.error(err);
    }
  };

  return { deck, players, create, setPlayers, setDeck };
}
