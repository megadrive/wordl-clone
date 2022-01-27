import { ReactFragment, useState } from "react";
import style from "../styles/Letter.module.css";
import cn from "classnames";

export type LetterStatus = "wrong" | "almost" | "correct" | "";

export const Letter = ({
  children,
  status,
}: {
  children: ReactFragment;
  status?: LetterStatus;
}) => {
  const letterStatus = style[status ?? ""];
  return (
    <div className={cn([style.letter, letterStatus])}>{status && children}</div>
  );
};
