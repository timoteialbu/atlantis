import React, { CSSProperties } from "react";
import styles from "./WeekView.css";
import { Pill, PillProps } from "../Pill";

export interface WeekViewEventProps extends Omit<PillProps, "time"> {
  readonly startAt: Date;
  readonly endAt: Date;
}

export function WeekViewEvent(props: WeekViewEventProps) {
  const { startAt, endAt } = props;

  return (
    <div className={styles.event} style={calculatePosition()}>
      <Pill
        time={startAt.toLocaleTimeString(undefined, {
          hour12: true,
          minute: "2-digit",
          hour: "numeric",
        })}
        {...props}
      />
    </div>
  );

  function calculatePosition() {
    return {
      "--grid-column": startAt.getDay() + 1,
      "--grid-span": endAt.getDay() + 1 - startAt.getDay(),
    } as CSSProperties;
  }
}
