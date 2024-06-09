import { useState } from "react";
import { useDeck } from "../hooks/useDeck";
import Deck from "./deck";
import Players from "./players";
import { gamePlay } from "../utils/game-service";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IDeck } from "../models/game-interface";
import { getWinnerInGame } from "../utils/game-utils";

const GameContainer = () => {
  const { deck, players, create, setPlayers, setDeck } = useDeck();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [useMessage, setUseMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let gameEngine: any = null;

  const createNewGame = () => {
    gameEngine = null;
    setIsPlaying(true);
    setUseMessage("");
    create();
  };

  const endGame = () => {
    setIsPlaying(false);
    setUseMessage("");
    setIsLoading(false);
  };

  const checkWinner = async () => {
    const winner = await gameEngine.next();
    setDeck((deck: IDeck | undefined) =>
      deck
        ? {
            ...deck,
            remaining: winner.value.deckRemainings
          }
        : deck
    );

    if (winner.value.deckRemainings === 0) {
      endGame();
      winner.value.gameWinner == null
        ? setUseMessage(`No Winner in Game`)
        : setUseMessage(`${getWinnerInGame(players)} Won Game!!`);
      return;
    }

    if (winner.value.gameWinner) {
      setUseMessage(`${winner.value.gameWinner.name} Won Round`);
    } else setUseMessage(`Teko Score.. Try Again!`);

    setIsLoading(false);
  };

  const play = async () => {
    setIsLoading(true);
    if (!gameEngine && deck && players) {
      gameEngine = await gamePlay(deck, players);
    }
    const cards = await gameEngine.next();
    const { gamePlayers, deckRemaining } = cards.value;
    setPlayers({ ...gamePlayers });
    setDeck((deck: IDeck | undefined) =>
      deck ? { ...deck, remaining: deckRemaining } : deck
    );
    checkWinner();
  };

  return (
    <div className="fs-3">
      <Container fluid>
        <Row>
          <Col>
            {isPlaying ? (
              <Button
                variant="secondary"
                onClick={endGame}
                disabled={isLoading}
              >
                {"End Game"}
              </Button>
            ) : (
              <Button variant="danger" onClick={createNewGame}>
                {"Start New Game"}
              </Button>
            )}
          </Col>
          <Col>
            {isPlaying && (
              <Button variant="warning" onClick={play} disabled={isLoading}>
                Play
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Container fluid>
              <Row>
                <Col>{players && <Players players={players}></Players>}</Col>
                <Col xs={4}>
                  <Deck remainings={deck?.remaining || 0}></Deck>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="mt-4 min-text">{useMessage}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default GameContainer;
