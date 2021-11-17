import React from "react";
import classnames from "classnames";
import styles from "./WeekView.css";
import { Typography } from "../Typography";
import { Pill } from "../Pill";
import { Avatar } from "../Avatar";
import { Text } from "../Text";

interface WeekViewProps {
  readonly showHeader?: boolean;
}

export function WeekView({ showHeader = false }: WeekViewProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <div className={styles.userName}>
          <Avatar initials="DT" />
          <Text>Darryl Tec</Text>
        </div>
      </div>
      <div className={styles.calendar}>
        <div className={classnames(styles.grid, styles.background)}>
          {weekDates().map((_, i) => (
            <div
              key={i}
              className={classnames(styles.col, {
                [styles.today]: isToday(i),
              })}
            />
          ))}
        </div>

        {showHeader && (
          <div className={styles.grid}>
            {weekDates().map((date, i) => (
              <div className={classnames(styles.col, styles.day)} key={i}>
                <Typography
                  textCase="uppercase"
                  size="smaller"
                  textColor="blue"
                >
                  {date.toLocaleDateString(undefined, { weekday: "short" })}
                </Typography>
                <Typography
                  textCase="uppercase"
                  size="base"
                  textColor="blue"
                  fontWeight="extraBold"
                >
                  {date.toLocaleDateString(undefined, { day: "2-digit" })}
                </Typography>
              </div>
            ))}
          </div>
        )}

        <div className={styles.grid}>
          {Array.from(Array(10).keys()).map(i => (
            <div
              className={styles.col}
              key={i}
              style={{
                ...(i == 0 && { gridColumn: "1/span 2" }),
                ...(i == 2 && { gridColumn: "2/span 2" }),
                ...(i == 6 && { gridColumn: "4/span 3" }),
              }}
            >
              <Pill content={`Event ${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function isToday(dayOfTheWeek: number) {
    const today = new Date();
    return today.getDay() === dayOfTheWeek;
  }

  function weekDates() {
    const date = new Date();
    const week: Date[] = [];

    // Grab the first week
    date.setDate(date.getDate() - date.getDay());

    // Starting Monday not Sunday
    // date.setDate(date.getDate() + 1);

    for (let i = 0; i < 7; i++) {
      week.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return week;
  }
}
