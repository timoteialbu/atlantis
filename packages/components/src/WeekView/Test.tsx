import { sortBy } from "lodash";
import React from "react";
import { WeekView } from ".";

export function Test() {
  return (
    <>
      <WeekView showHeader={true} />
      <WeekView events={randomizedDates()} />
      <WeekView events={randomizedDates()} />
    </>
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
