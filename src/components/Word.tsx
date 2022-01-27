import { Letter, LetterStatus } from "./Letter";

export const Word = ({
  word,
  status,
}: {
  word: string;
  status: LetterStatus[];
}) => {
  return (
    <div>
      {word &&
        Array.from(word).map((letter, i) => {
          return (
            <Letter key={i} status={status[i] ?? ""}>
              {letter}
            </Letter>
          );
        })}
    </div>
  );
};
