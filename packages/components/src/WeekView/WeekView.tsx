import React from "react";
import classnames from "classnames";
import styles from "./WeekView.css";
import { WeekViewEvent, WeekViewEventProps } from "./WeekViewEvent";
import { Typography } from "../Typography";
import { Avatar } from "../Avatar";
import { Text } from "../Text";

interface WeekViewProps {
  readonly showHeader?: boolean;
  readonly events?: WeekViewEventProps[];
}

export function WeekView({ showHeader = false, events }: WeekViewProps) {
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
          {weekDates().map((date, i) => (
            <div
              key={i}
              className={classnames(styles.col, {
                [styles.today]: isToday(date),
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

        {events && (
          <div className={styles.grid}>
            {events.map((event, i) => (
              <WeekViewEvent key={i} {...event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  function isToday(date: Date) {
    const today = new Date();
    return today.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);
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
