import { DeckAPI } from "../apis/deck-api";
import { ICard, IDeck, IPlayer, IPlayers } from "../models/game-interface";
import { getCardValue } from "../utils/game-utils";

function* nameGenerator(index: number) {
  let indx = index;
  while (true) {
    yield `user${indx++}`;
  }
}

async function* play(deck: IDeck, players: { [key: string]: IPlayer }) {
  const gameDeck = deck;
  const gamePlayers = players;

  const addToPlayerPile = async (name: string, cards: ICard[]) => {
    const res = await DeckAPI.addToPile(
      gameDeck.deckId,
      name,
      cards.flatMap((card) => card.code).toString()
    );
    gamePlayers[name].remaining = res.data.piles[name].remaining || 0;
    gameDeck.remaining = res.data.remaining || 0;
  };

  const redrawToDeck = async (cards: ICard[]) => {
    const res = await DeckAPI.redraw(
      deck.deckId,
      cards.flatMap((card) => card.code).toString()
    );
    DeckAPI.reshuffle(deck.deckId);
    gameDeck.remaining = res.data.remaining || 0;
  };

  const updateNewCards = (cards: ICard[]): void => {
    let indx = 0;
    for (const key of Object.keys(gamePlayers)) {
      gamePlayers[key].card = cards[indx];
      indx += 1;
    }
  };

  while (deck.remaining > 0) {
    const cardsRes: { data: { cards: ICard[]; remaining: number } } =
      await DeckAPI.draw(gameDeck.deckId, Object.keys(gamePlayers).length);
    const deckRemaining = cardsRes.data.remaining;
    const cards: ICard[] = cardsRes.data.cards;

    updateNewCards(cards);

    yield { gamePlayers, deckRemaining };

    const winner = getRoundWinningPlayer(gamePlayers);
    if (winner) await addToPlayerPile(winner.name, cards);
    else await redrawToDeck(cards);

    yield {
      gameWinner: winner ? gamePlayers[winner.name] : null,
      deckRemainings: gameDeck.remaining
    };
  }

  return;
}

function winnerChecker() {
  let maxScore: number = 0;
  let duplicates = 0;
  return function (playerCard: ICard | undefined): {
    win: boolean;
    duplicates: number;
  } {
    const playerScore = getCardValue(playerCard?.value || 0);
    if (playerScore > maxScore) {
      maxScore = playerScore;
      return { win: true, duplicates };
    } else if (playerScore === maxScore) {
      maxScore = playerScore;
      duplicates += 1;
    }
    return { win: false, duplicates };
  };
}

const getRoundWinningPlayer = (players: IPlayers): IPlayer | null => {
  const check = winnerChecker();
  let winner: IPlayer | null = null;

  const playersKeys = Object.keys(players);
  for (const playerKey of playersKeys) {
    const win = check(players[playerKey].card);
    if (playersKeys.length - 1 === win.duplicates) {
      winner = null;
      break;
    } else if (win.win) {
      winner = players[playerKey];
    }
  }
  return winner;
};

export const createNamesGenerator = () => nameGenerator(1);
export const gamePlay = (deck: IDeck, players: IPlayers) => play(deck, players);
