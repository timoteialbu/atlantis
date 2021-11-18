import React, { ReactElement } from "react";
import styles from "./WeekView.css";
import { AvatarProps } from "../Avatar";
import { Typography } from "../Typography";

export interface WeekViewUserProps {
  readonly avatar?: ReactElement<AvatarProps>;
  readonly name: string;
}

export function WeekViewUser({ avatar, name }: WeekViewUserProps) {
  return (
    <div className={styles.userName}>
      {avatar}
      <Typography
        size="small"
        textColor="blue"
        fontFamily="display"
        fontWeight="bold"
      >
        {name}
      </Typography>
    </div>
  );
}
