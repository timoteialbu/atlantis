import { sortBy } from "lodash";
import React from "react";
import { WeekView } from ".";
import { Avatar } from "../Avatar";

export function Test() {
  return (
    <WeekView
      data={[
        {
          userInfo: { avatar: <Avatar initials="DT" />, name: "Darryl Tec" },
          events: randomizedDates(),
        },
        {
          userInfo: { avatar: <Avatar initials="CM" />, name: "Chris Murray" },
          events: randomizedDates(),
        },
      ]}
    />
  );

  function randomizedDates() {
    const dates = Array.from(Array(10).keys()).map(i => {
      const startDate = new Date(
        +new Date() - Math.floor(Math.random() * 400000000 + i),
      );
      const endDate = new Date(
        +startDate + Math.floor(Math.random() * 400000000 + i),
      );

      return {
        content: "Event name",
        startAt: startDate,
        endAt: endDate,
      };
    });

    return sortBy(dates, ["startAt"]);
  }
}
