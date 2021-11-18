import React from "react";
import { WeekViewRow } from "./WeekViewRow";
import { WeekViewEventProps } from "./WeekViewEvent";
import { WeekViewUser, WeekViewUserProps } from "./WeekViewUser";

export interface WeekViewData {
  readonly user: WeekViewUserProps;
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
        <WeekViewRow
          key={cal.user.name}
          sidebar={<WeekViewUser {...cal.user} />}
          {...cal}
        />
      ))}
    </>
  );
}
