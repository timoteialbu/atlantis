import React, { useState } from "react";
import { cloneDeep, sortBy } from "lodash";
import moment from "moment";
import { WeekView } from ".";
import { Avatar } from "../Avatar";

export function Test() {
  const [data, setData] = useState([
    {
      id: "a",
      user: { avatar: <Avatar initials="DT" />, name: "Darryl Tec" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
    {
      id: "b",
      user: { avatar: <Avatar initials="CM" />, name: "Chris Murray" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
    {
      id: "c",
      user: { avatar: <Avatar initials="AB" />, name: "Adam Bobadam" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
    {
      id: "d",
      user: { avatar: <Avatar initials="DV" />, name: "Deep Vishwas" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
    {
      id: "e",
      user: { avatar: <Avatar initials="RT" />, name: "Robby Tiu" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
    {
      id: "f",
      user: { avatar: <Avatar initials="SW" />, name: "Selina Wang" },
      events: randomizedEvents(),
      onChange: handleChange,
    },
  ]);
  return <WeekView data={data} />;

  function randomizedEvents() {
    const dates = Array.from(Array(10).keys()).map(i => {
      const startDate = new Date(
        +new Date() - Math.floor(Math.random() * 400000000 + i),
      );
      const endDate = new Date(
        +startDate + Math.floor(Math.random() * 200000000 + i),
      );

      const accent = ["#99c146", "#4b6A96", "#ef5733", "#ddc30f", "#556acb"];
      const bgColors = ["#f0f6e3", "#e4e9ef", "#fde6e0", "#faf6db", "#c9cfee"];
      const colorIndex = Math.floor(Math.random() * 4) + 0;

      return {
        id: i.toString(),
        content: "Event name",
        startAt: startDate,
        endAt: endDate,
        accent: accent[colorIndex],
        background: bgColors[colorIndex],
      };
    });

    return sortBy(dates, ["startAt"]);
  }

  // eslint-disable-next-line max-statements
  function handleChange(weekId: string, eventId: string, newDate: Date) {
    const newData = cloneDeep(data);
    const dataIndex = newData.findIndex(week => week.id === weekId);
    const event = newData[dataIndex].events.find(x => x.id === eventId);
    if (event) {
      const diffInHours = moment
        .duration(moment(event.endAt).diff(moment(event.startAt)))
        .asHours();
      console.log(
        moment
          .duration(moment(event.endAt).diff(moment(event.startAt)))
          .asHours(),
      );

      const newNewDate = new Date(newDate);
      newNewDate.setHours(
        event.startAt.getHours(),
        event.startAt.getMinutes(),
        event.startAt.getSeconds(),
        event.startAt.getMilliseconds(),
      );
      event.startAt = newNewDate;
      event.endAt = moment(newNewDate).add(diffInHours, "hours").toDate();
      console.log(
        moment
          .duration(moment(event.endAt).diff(moment(event.startAt)))
          .asHours(),
      );
    }
    setData(newData);
    console.log(weekId, eventId, newDate);
  }
}
