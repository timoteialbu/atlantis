import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./WeekView.css";
import { WeekViewEvent, WeekViewEventProps } from "./WeekViewEvent";
import { Typography } from "../Typography";

interface WeekViewRowProps {
  readonly showDayHeader?: boolean;
  readonly sidebar?: ReactElement;
  readonly events?: WeekViewEventProps[];
  readonly weekDates: Date[];
}

export function WeekViewRow({
  showDayHeader = false,
  weekDates,
  sidebar,
  events,
}: WeekViewRowProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>{sidebar}</div>
      <div className={styles.calendar}>
        <div className={classnames(styles.grid, styles.background)}>
          {weekDates.map((date, i) => (
            <div
              key={i}
              className={classnames(styles.col, {
                [styles.today]: isToday(date),
              })}
            />
          ))}
        </div>

        {showDayHeader && (
          <div className={styles.grid}>
            {weekDates.map((date, i) => (
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
            {filteredEvents().map((event, i) => (
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

  // TODO: fancy this up!
  function filteredEvents() {
    if (!events) return [];
    return events.filter(event => {
      const startAtWithinDateRange =
        event.startAt >= weekDates[0] &&
        event.startAt <= weekDates[weekDates.length - 1];
      const endAtWithinDateRange =
        event.endAt >= weekDates[0] &&
        event.endAt <= weekDates[weekDates.length - 1];
      return startAtWithinDateRange || endAtWithinDateRange;
    });
  }
}
