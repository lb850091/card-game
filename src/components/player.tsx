import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { memo } from "react";

export interface PlayerProps {
  name: string;
  src?: string;
  remaining: number;
}

const Player = memo(function ({ name, src, remaining = 0 }: PlayerProps) {
  return (
    <div key={name}>
      <Container>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="p-2">
                <span className="fs-3">{name}</span>
              </div>
              <div className="p-2">
                <Badge bg="success">
                  <span>{remaining}</span>
                </Badge>
              </div>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="game-card">
              {src && <Image src={src} width={"226px"} rounded />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Player;
