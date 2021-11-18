import React from "react";
import styles from "./WeekView.css";
import { Button } from "../Button";
import { DatePicker } from "../DatePicker";

interface WeekViewControls {
  readonly weekDates: Date[];
  onChange(date: Date): void;
}

export function WeekViewControls({ weekDates, onChange }: WeekViewControls) {
  return (
    <div className={styles.controls}>
      <DatePicker
        selected={weekDates[0]}
        onChange={handleDateChange}
        activator={
          <Button
            fullWidth={true}
            icon="calendar"
            iconOnRight={true}
            label={selectedMonth()}
            size="small"
            type="secondary"
          />
        }
      />
      <Button
        icon="arrowLeft"
        ariaLabel="Previous"
        size="small"
        type="secondary"
        variation="subtle"
        onClick={handlePrevious}
      />
      <Button
        icon="arrowRight"
        ariaLabel="Next"
        size="small"
        type="secondary"
        variation="subtle"
        onClick={handleNext}
      />
      <Button
        label="Today"
        size="small"
        type="secondary"
        variation="subtle"
        onClick={handleToday}
      />
    </div>
  );

  function selectedMonth() {
    const firstDate = weekDates[0];
    const lastDate = weekDates[weekDates.length - 1];
    const firstDateMonth = firstDate.toLocaleDateString(undefined, {
      month: "short",
    });
    const lastDateMonth = lastDate.toLocaleDateString(undefined, {
      month: "short",
    });
    const firstDateYear = firstDate.toLocaleDateString(undefined, {
      year: "numeric",
    });
    const lastDateYear = lastDate.toLocaleDateString(undefined, {
      year: "numeric",
    });

    if (firstDateMonth === lastDateMonth) {
      return `${firstDateMonth} ${firstDateYear}`;
    } else if (firstDateYear === lastDateYear) {
      return `${firstDateMonth} - ${lastDateMonth} ${lastDateYear}`;
    } else {
      return `${firstDateMonth} ${firstDateYear} - ${lastDateMonth} ${lastDateYear}`;
    }
  }

  function handleDateChange(value: Date) {
    onChange(value);
  }

  function handlePrevious() {
    const date = new Date(weekDates[0]);
    date.setDate(date.getDate() - 1);
    onChange(date);
  }

  function handleNext() {
    const date = new Date(weekDates[weekDates.length - 1]);
    date.setDate(date.getDate() + 1);
    onChange(date);
  }

  function handleToday() {
    onChange(new Date());
  }
}
