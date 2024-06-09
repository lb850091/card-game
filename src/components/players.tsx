import { IPlayer } from "../models/game-interface";
import Player from "./player";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export interface PlayersProps {
  players: { [key: string]: IPlayer };
}

export function Players({ players }: PlayersProps) {
  return (
    <Container className="players-list">
      <Row>
        {players &&
          Object.values(players).map((player, index: number) => (
            <Col key={"cl" + index}>
              <Player
                name={player.name}
                src={player.card?.image}
                remaining={player.remaining}
              ></Player>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default Players;
