import { sortBy } from "lodash";
import React from "react";
import { WeekView } from ".";
import { Avatar } from "../Avatar";

export function Test() {
  return (
    <WeekView
      data={[
        {
          user: { avatar: <Avatar initials="DT" />, name: "Darryl Tec" },
          events: randomizedEvents(),
        },
        {
          user: { avatar: <Avatar initials="CM" />, name: "Chris Murray" },
          events: randomizedEvents(),
        },
      ]}
    />
  );

  function randomizedEvents() {
    const dates = Array.from(Array(10).keys()).map(i => {
      const startDate = new Date(
        +new Date() - Math.floor(Math.random() * 400000000 + i),
      );
      const endDate = new Date(
        +startDate + Math.floor(Math.random() * 400000000 + i),
      );

      const accent = ["#99c146", "#4b6A96", "#ef5733", "#ddc30f", "#556acb"];
      const bgColors = ["#f0f6e3", "#e4e9ef", "#fde6e0", "#faf6db", "#c9cfee"];
      const colorIndex = Math.floor(Math.random() * 4) + 0;

      return {
        content: "Event name",
        startAt: startDate,
        endAt: endDate,
        accent: accent[colorIndex],
        background: bgColors[colorIndex],
      };
    });

    return sortBy(dates, ["startAt"]);
  }
}
