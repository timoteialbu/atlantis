import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { InputDate } from ".";

afterEach(cleanup);

it("renders a blank form by default", () => {
  const { getByDisplayValue, queryByText } = render(
    <InputDate onChange={jest.fn()} />,
  );
  expect(getByDisplayValue("")).toBeInTheDocument();
  expect(queryByText("15")).not.toBeInTheDocument();
});

it("fires onChange with the new value when you click a date", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const changeHandler = jest.fn();
  const { getByDisplayValue, getByText } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );

  const form = getByDisplayValue(date);
  fireEvent.focus(form);

  const selectDate = getByText("15");
  fireEvent.click(selectDate);
  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});

it("fires onChange with the new value when you type a different date", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const placeholder = "placeholder";
  const changeHandler = jest.fn();
  const { getByLabelText } = render(
    <InputDate
      value={new Date(date)}
      onChange={changeHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newDate },
  });
  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});

it("updates the value of the field when the value prop changes", () => {
  const date = "11/11/2011";
  const newDate = "11/15/2011";
  const changeHandler = jest.fn();
  const { queryByDisplayValue, rerender } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  expect(queryByDisplayValue(date)).toBeInTheDocument();

  rerender(<InputDate value={new Date(newDate)} onChange={changeHandler} />);

  expect(queryByDisplayValue(date)).not.toBeInTheDocument();
  expect(queryByDisplayValue(newDate)).toBeInTheDocument();
});

it("returns the correct date object when long formatted date is supplied", () => {
  const date = "11/11/2011";
  const newDate = "November 15, 2011";
  const changeHandler = jest.fn();
  const { getByDisplayValue } = render(
    <InputDate value={new Date(date)} onChange={changeHandler} />,
  );
  expect(getByDisplayValue(date)).toBeInTheDocument();

  fireEvent.change(getByDisplayValue(date), {
    target: { value: newDate },
  });

  expect(changeHandler).toHaveBeenCalledWith(new Date(newDate));
});

it("doesn't fire onChange when the new value is invalid", async () => {
  const date = "11/11/2011";
  const badInput = "bad input";
  const changeHandler = jest.fn();
  const placeholder = "placeholder";
  const { getByDisplayValue, getByLabelText } = render(
    <InputDate
      placeholder={placeholder}
      value={new Date(date)}
      onChange={changeHandler}
    />,
  );

  expect(getByDisplayValue(date)).toBeInTheDocument();

  const form = getByDisplayValue(date);
  fireEvent.focus(form);

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: badInput },
  });
  expect(changeHandler).toHaveBeenCalledTimes(0);
});
