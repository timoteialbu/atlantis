import React from "react";
import classnames from "classnames";
import styles from "./WeekView.css";
import { Text } from "../Text";
import { Typography } from "../Typography";

// interface WeekViewProps {}

export function WeekView() {
  return (
    <div className={styles.calendar}>
      <div className={classnames(styles.grid, styles.background)}>
        {Array.from(Array(7).keys()).map(i => (
          <div className={styles.col} key={i} />
        ))}
      </div>

      <div className={styles.grid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
          <div className={classnames(styles.col, styles.day)} key={day}>
            <Typography
              textCase="uppercase"
              size="base"
              textColor="blue"
              fontWeight="extraBold"
            >
              {day} {i + 1}
            </Typography>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {Array.from(Array(7).keys()).map(i => (
          <div className={styles.col} key={i}>
            <Text variation="subdued">overview {i}</Text>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        <div className="event event1 calendar1">Event 1</div>
        <div className="event event2 calendar2">Event 2</div>
        <div className="event event3 calendar2">Event 3</div>
        <div className="event event4 calendar1">Event 4</div>
      </div>
    </div>
  );
}
