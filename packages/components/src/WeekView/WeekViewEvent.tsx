import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
import styles from "./WeekView.css";
import { Pill, PillProps } from "../Pill";

export interface WeekViewEventProps extends Omit<PillProps, "time"> {
  readonly startAt: Date;
  readonly endAt: Date;
  // for demo purposes only, delete this
  readonly delay?: number;
}

export function WeekViewEvent(props: WeekViewEventProps) {
  const { startAt, endAt, delay = 1 } = props;
  const variation = {
    startOrStop: { scale: 0.6, opacity: 0 },
    done: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className={styles.event}
      draggable={true}
      style={calculatePosition()}
      variants={variation}
      initial="startOrStop"
      animate="done"
      exit="startOrStop"
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        delay: 0.05 * delay,
      }}
    >
      <Pill
        time={startAt.toLocaleTimeString(undefined, {
          hour12: true,
          minute: "2-digit",
          hour: "2-digit",
        })}
        {...props}
      />
    </motion.div>
  );

  // TODO: Calculate with crossing week
  function calculatePosition() {
    return {
      "--grid-column": startAt.getDay() + 1,
      "--grid-span": endAt.getDay() + 1 - startAt.getDay(),
    } as CSSProperties;
  }
}
