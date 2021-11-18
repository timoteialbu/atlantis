import React, { ReactElement } from "react";
import classnames from "classnames";
import { AnimatePresence } from "framer-motion";
import styles from "./WeekView.css";
import { WeekViewEvent, WeekViewEventProps } from "./WeekViewEvent";
import { WeekViewDayColumn } from "./WeekViewDayColumn";
import { Typography } from "../Typography";

interface WeekViewRowProps {
  readonly id: string;
  readonly showDayHeader?: boolean;
  readonly sidebar?: ReactElement;
  readonly events?: WeekViewEventProps[];
  readonly weekDates: Date[];
  onChange?(weekId: string, eventId: string, newDate: Date): void;
}

export function WeekViewRow({
  id,
  showDayHeader = false,
  weekDates,
  sidebar,
  events,
  onChange,
}: WeekViewRowProps) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>{sidebar}</div>
      <div className={styles.calendar}>
        <div className={classnames(styles.grid, styles.background)}>
          {weekDates.map((date, i) => (
            <WeekViewDayColumn
              key={i}
              date={date}
              onEventDrop={handleEventDrop}
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
            <AnimatePresence>
              {filteredEvents().map((event, i) => (
                <WeekViewEvent key={i} {...event} delay={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );

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

  function handleEventDrop(eventId: string, newDate: Date) {
    onChange && onChange(id, eventId, newDate);
  }
}
