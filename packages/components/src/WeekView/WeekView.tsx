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

export function WeekView(props: WeekViewProps) {
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
          {Array.from(Array(7).keys()).map(i => (
            <div className={styles.col} key={i} />
          ))}
        </div>

        {props.showHeader && (
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
}
