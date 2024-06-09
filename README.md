# Game Card

Game workflow:

- New game to initialize.
- Play to move between rounds until game is finished.
- End game will be available only during game

To run game:

- [npm install]
- [npm run dev]

Design:

In order to keep it as simple as possible i used local state & hook to manage state and bootstrap for UI components
hook will handle the creation of state and component will update the state by using game service as decoupled engine.
game service holds the logic of the game
game container is the main view that holds players

- solution supports more than 2 players ( `numOfUsers: number = 2` in hook)
- logic can be replaced easily on play steps in service

## Things i didn't handle

- Exceptions handling
- Caching cards
- Using the svg image (from card options api)
- No tests coverage
