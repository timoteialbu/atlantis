import React, { DragEvent, useState } from "react";
import classnames from "classnames";
import styles from "./WeekView.css";

interface WeekViewDayColumnProps {
  readonly date: Date;
  onEventDrop(eventId: string, newDate: Date): void;
}

export function WeekViewDayColumn({
  date,
  onEventDrop,
}: WeekViewDayColumnProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={classnames(styles.col, {
        [styles.today]: isToday(date),
        [styles.active]: isActive,
      })}
    />
  );

  function isToday(currentDay: Date) {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === currentDay.setHours(0, 0, 0, 0);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    // By default, data/elements cannot be dropped in other elements.
    // To allow a drop, we must prevent the default handling of the element.
    event.preventDefault();
  }

  function handleDragEnter() {
    setIsActive(true);
  }

  function handleDragLeave() {
    setIsActive(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    setIsActive(false);
    onEventDrop(event.dataTransfer.getData("eventId"), date);
  }
}
