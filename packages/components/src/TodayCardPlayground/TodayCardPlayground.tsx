import React from "react";
import classnames from "classnames";
import styles from "./TodayCardPlayground.css";

interface TodayCardPlaygroundProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Text to display.
   */
  readonly text: string;

  /**
   * Click handler.
   */
  onClick?(): void;
}

export function TodayCardPlayground({
  loud = false,
  text,
  onClick,
}: TodayCardPlaygroundProps) {
  const className = classnames(styles.todayCardPlayground, {
    [styles.bold]: loud,
  });

  return (
    <div className={className} onClick={onClick}>
      {text}
    </div>
  );
}
