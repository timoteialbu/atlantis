import React from "react";
import { UserInfo, WeekViewRow } from "./WeekViewRow";
import { WeekViewEventProps } from "./WeekViewEvent";

export interface WeekViewData {
  readonly userInfo: UserInfo;
  readonly events: WeekViewEventProps[];
}

interface WeekViewProps {
  readonly data: WeekViewData[];
}

export function WeekView({ data }: WeekViewProps) {
  return (
    <>
      <WeekViewRow showDayHeader={true} />
      {data.map(cal => (
        <WeekViewRow key={cal.userInfo.name} {...cal} />
      ))}
    </>
  );
}
