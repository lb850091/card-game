import { api } from "./api";

export const DeckAPI = {
  create: async function (numOfDecks: number = 1) {
    return await api.request({
      url: `/deck/new/shuffle/?deck_count=${numOfDecks}`,

      method: "POST"
    });
  },
  shuffle: async function (count: number = 1) {
    return await api.request({
      url: `/?deck_count=${count}`,
      method: "PATCH"
    });
  },
  reshuffle: async function (deckId: string, remaining: boolean = true) {
    return await api.request({
      url: `/deck/${deckId}/shuffle/?remaining=${remaining}`,
      method: "GET"
    });
  },

  draw: async function (deckId: string, numOfCards: number) {
    return await api.request({
      url: `/deck/${deckId}/draw/?count=${numOfCards}`,
      method: "PATCH"
    });
  },

  redraw: async function (deckId: string, cards: string) {
    return await api.request({
      url: `/deck/${deckId}/return/?cards=${cards}`,
      method: "GET"
    });
  },

  addToPile: async function (deckId: string, name: string, cards: string) {
    return await api.request({
      url: `/deck/${deckId}/pile/${name}/add/?cards=${cards}`,
      method: "GET"
    });
  }
};
