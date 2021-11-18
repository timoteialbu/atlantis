import React, { useState } from "react";
import { WeekViewRow } from "./WeekViewRow";
import { WeekViewEventProps } from "./WeekViewEvent";
import { WeekViewUser, WeekViewUserProps } from "./WeekViewUser";
import { WeekViewControls } from "./WeekViewControls";

export interface WeekViewData {
  readonly id: string;
  readonly user: WeekViewUserProps;
  readonly events: WeekViewEventProps[];
  onChange(weekId: string, eventId: string, newDate: Date): void;
}

interface WeekViewProps {
  readonly data: WeekViewData[];
}

export function WeekView({ data }: WeekViewProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <WeekViewRow
        id="header"
        sidebar={
          <WeekViewControls
            weekDates={weekDates()}
            onChange={setSelectedDate}
          />
        }
        showDayHeader={true}
        weekDates={weekDates()}
      />
      {data.map(cal => (
        <WeekViewRow
          key={cal.user.name}
          sidebar={<WeekViewUser {...cal.user} />}
          weekDates={weekDates()}
          {...cal}
        />
      ))}
    </>
  );

  function weekDates() {
    const date = new Date(selectedDate);
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
