import React, { CSSProperties } from "react";
import classnames from "classnames";
import styles from "./Pill.css";
import { Typography } from "../Typography";

export interface PillProps {
  /**
   * Time to display.
   */
  readonly time?: string;

  /**
   * Text to display.
   */
  readonly content: string;

  readonly accent?: string;
  readonly background?: string;
  readonly completed?: boolean;

  /**
   * Click handler.
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;
}

export function Pill({
  time,
  content,
  accent,
  background,
  completed = false,
  onClick,
}: PillProps) {
  const className = classnames(styles.pill, {
    [styles.completed]: completed,
  });
  const style = {
    ...(accent && { "--accent": accent }),
    ...(background && { "--background": background }),
  } as CSSProperties;

  return (
    <button className={className} style={style} onClick={onClick}>
      <Typography element="span" numberOfLines={1}>
        {/* TODO: Calculate text color based on background */}
        {time && (
          <Typography
            element="span"
            size="small"
            fontWeight="bold"
            textColor="blue"
          >
            {time}
          </Typography>
        )}{" "}
        <Typography element="span" size="small" textColor="greyBlueDark">
          {content}
        </Typography>
      </Typography>
    </button>
  );
}
