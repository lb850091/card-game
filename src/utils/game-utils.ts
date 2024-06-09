import { IPlayers } from "../models/game-interface";

const royals: { [key: string]: number } = {
  ACE: 60,
  KING: 50,
  QUEEN: 40,
  JACK: 30,
  PRINCE: 20,
  PRINSESS: 10
};
export const getCardValue = (value: string | number): number => {
  try {
    const num = Number(value);
    if (isNaN(num)) return royals[value];
    return num;
  } catch (e) {
    return -1;
  }
};

export const getWinnerInGame = (players: IPlayers | undefined): string => {
  let winnerName = "Teko";
  let maxScore = 0;
  if (players) {
    for (const playerName of Object.keys(players)) {
      if (maxScore < players[playerName].remaining) {
        winnerName = players[playerName].name;
        maxScore = players[playerName].remaining;
      }
    }
  }
  return winnerName;
};
