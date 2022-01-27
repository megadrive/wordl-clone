import { useRef, useState } from "react";
import { WordError } from "../lib/errors";
import { LetterStatus } from "./Letter";
import { Word } from "./Word";

const { WORD_MAX_LENGTH } = process.env;

/**
 *
 * @param guess Guess by the player
 * @param game Game's word
 */
function compareWords(guess: string, game: string) {
  if (guess.length !== game.length) {
    throw new WordError("Words are not the same length.");
  }

  return Array.from(guess).reduce((acc, letter, index) => {
    const present = game.includes(letter);
    const correct = game[index] === guess[index];
    acc.set(letter, { present, correct });
    return acc;
  }, new Map<string, { present: boolean; correct: boolean }>());
}

interface Guess {
  word: string;
  status: LetterStatus[];
}

interface GameState {
  /** word currently being played */
  word: string;
  guesses: Guess[];
}

export const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    word: "dolly", // @TODO convert later
    guesses: [],
  });

  const [pendingGuess, setPendingGuess] = useState("");
  function onChange(e: any) {
    setPendingGuess(e.target.value);
  }

  function calculatePendingGuess(word: string): Guess {
    const status: LetterStatus[] = Array.from(word).map((letter, i) => {
      const present = gameState.word.includes(letter.toLowerCase());
      const correct = gameState.word[i] === word[i];

      if (correct) return "correct";
      if (present) return "almost";
      return "wrong";
    });

    return {
      word,
      status,
    };
  }

  function onSubmit(e: any) {
    e.preventDefault();

    const { guesses } = gameState;
    guesses.push(calculatePendingGuess(pendingGuess));

    const newGameState = gameState;
    newGameState.guesses = guesses;
    setGameState(newGameState);
    setPendingGuess("");
  }

  return (
    <div>
      <div>
        {gameState.guesses &&
          gameState.guesses.map((guess, i) => {
            return <Word key={i} word={guess.word} status={guess.status} />;
          })}
      </div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="word"
            maxLength={5}
            onChange={onChange}
            value={pendingGuess}
          />
          <button type="submit">Guess</button>
        </form>
      </div>
    </div>
  );
};
