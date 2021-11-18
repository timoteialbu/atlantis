import React, { CSSProperties, DragEvent } from "react";
import { motion } from "framer-motion";
import styles from "./WeekView.css";
import { Pill, PillProps } from "../Pill";

export interface WeekViewEventProps extends Omit<PillProps, "time"> {
  readonly id: string;
  readonly startAt: Date;
  readonly endAt: Date;
  // for demo purposes only, delete this
  readonly delay?: number;
}

export function WeekViewEvent(props: WeekViewEventProps) {
  const { id, startAt, endAt, delay = 1 } = props;
  const variation = {
    startOrStop: { scale: 0.6, opacity: 0 },
    done: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      className={styles.event}
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
      <div draggable={true} onDragStart={handleDragStart}>
        <Pill
          time={startAt.toLocaleTimeString(undefined, {
            hour12: true,
            minute: "2-digit",
            hour: "2-digit",
          })}
          {...props}
        />
      </div>
    </motion.div>
  );

  // TODO: Calculate with crossing week
  function calculatePosition() {
    return {
      "--grid-column": startAt.getDay() + 1,
      "--grid-span": endAt.getDay() + 1 - startAt.getDay(),
    } as CSSProperties;
  }

  function handleDragStart(event: DragEvent<HTMLDivElement>) {
    event.dataTransfer?.setData("eventId", id);
  }
}
