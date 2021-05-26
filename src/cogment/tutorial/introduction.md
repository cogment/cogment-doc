# Tutorial

You've reached the Cogment tutorial, the best way to learn about the concepts and the usage details of Cogment by using it to create a Rock-Paper-Scissors simulation and build AIs to play the game.

Full sources for the tutorials are available at <https://github.com/cogment/cogment-tutorial-rps>{target=\_blank}

## Rock-Paper-Scissors (RPS)

Let's quote [wikipedia](https://en.wikipedia.org/wiki/Rock_paper_scissors){target=\_blank}

> Rock paper scissors [...] is a hand game usually played between two people, in which each player simultaneously forms one of three shapes with an outstretched hand. These shapes are "rock" (a closed fist), "paper" (a flat hand), and "scissors" (a fist with the index finger and middle finger extended, forming a V). "Scissors" is identical to the two-fingered V sign (also indicating "victory" or "peace") except that it is pointed horizontally instead of being held upright in the air.
>
> A simultaneous, zero-sum game, it has only two possible outcomes: a draw, or a win for one player and a loss for the other. A player who decides to play rock will beat another player who has chosen scissors ("rock crushes scissors"[...]), but will lose to one who has played paper ("paper covers rock"); a play of paper will lose to a play of scissors ("scissors cuts paper"). If both players choose the same shape, the game is tied and is usually immediately replayed to break the tie. The type of game originated in China and spread with increased contact with East Asia, while developing different variants in signs over time.

Its rules can be expressed with the following statements:

- 2 players are competing to win the most rounds in a game;
- During each round, players play one move each, simultaneously;
- 3 moves are available, rock, paper and scissors;
- rock beats scissors, scissors beats paper and paper beats rock;
- playing the same move leads to a draw and the round needs to be replayed.

RPS is a very simple game with straightforward rules. As long as we "forbid" pure random moves, that are very difficult to beat, it is an interesting testbed to develop AIs that compete with Humans. Unlike _deep_ games such as chess or go, the power is not really in the brute force exploration of possible outcomes but in getting some level of understanding of how the opponent plays to be able to anticipate their moves.

A good read on the subject of AI and RPS is this article by Benjamin Peterson published by Towards AI: [**Towards an AI for Rock, Paper, Scissors**](https://towardsai.net/p/artificial-intelligence/towards-an-ai-for-rock-paper-scissors-3fb05780271f){target=\_blank}.

Now that we have better general knowledge on the game itself, let's start with the tutorial.

## Basics

In the first 5 steps of the tutorial, you'll go from a blank state to a Cogment app implementing RPS with 3 different player actor implementations: a random player, a simple heuristic player and a human player.

The implementations will be done in Python 3, you'll need a good knowledge of the language to follow through.

- [Step 1: Bootstrap the RPS project and define observation & action space data structures](./1-bootstrap-and-data-structures.md)
- [Step 2: Implement a first actor and environment](./2-random-player.md)
- [Step 3: Introduce rewards](./3-rewards.md)
- [Step 4: Create a second actor implementation based on a heuristic](./4-heuristic-player.md)
- [Step 5: Add a human player in the loop](./5-human-player.md)

## Webapp

In the sixth step of the tutorial, you'll implement your first webapp to provide a more user friendly interface for the human player.

The implementation will be done in Javascript and using React.

- [Step 6: Implement a web client for the human player](./6-web-client.md)

## Learning actors

In the seventh step of the tutorial, you'll implement your an actor trained with Reinforcement Learning.

The implementation will be done in Python and using Tensorflow.

- [Step 7: Add a player trained with Reinforcement Learning using DQN](./7-dqn-player.md)
