import React from "react";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import ReactDatePicker from "react-datepicker";
import { DatePicker } from "./DatePicker";

afterEach(cleanup);

beforeEach(() => {
  /**
   * We need to mock our date because DatePicker sets an initial date
   * to `new Date`, we could only predict the current date for a month.
   *
   * This will mock our system time to `April 7, 2021`.
   */
  jest.useFakeTimers("modern");
  jest.setSystemTime(new Date(2021, 3, 7));
});

it("renders only a button by default", () => {
  const { queryByText, getByLabelText } = render(
    <DatePicker selected={new Date()} onChange={jest.fn()} />,
  );

  /**
   * Checking for null here, as if someone was to change
   * the `inline` prop to true by default this would fail.
   */
  expect(queryByText("15")).toBeNull();
  expect(getByLabelText("Open Datepicker")).toBeInTheDocument();
});

it("returns the dates from onChange", async () => {
  const changeHandler = jest.fn();
  const { getByTestId, getByText } = render(
    <DatePicker selected={new Date()} onChange={changeHandler} />,
  );
  await popperUpdate(() => fireEvent.click(getByTestId("calendar")));
  await popperUpdate(() => fireEvent.click(getByText("15")));

  expect(changeHandler).toHaveBeenCalledWith(expect.any(Date));
});

it("allows for a custom activator to open the DatePicker", async () => {
  const { getByText } = render(
    <DatePicker
      selected={new Date()}
      onChange={jest.fn()}
      activator={<div>Activate me</div>}
    />,
  );
  await popperUpdate(() => fireEvent.click(getByText("Activate me")));

  expect(getByText("15")).toBeInstanceOf(HTMLDivElement);
});

it("always appears when inline", () => {
  const { getByText } = render(
    <DatePicker selected={new Date()} onChange={jest.fn()} inline />,
  );

  expect(getByText("15")).toBeInstanceOf(HTMLDivElement);
});

it("should not add the `react-datepicker-ignore-onclickoutside` when inline", () => {
  const { container, rerender } = render(<DatePicker onChange={jest.fn()} />);

  const target = container.firstChild;
  const className = "react-datepicker-ignore-onclickoutside";
  expect(target).toHaveClass(className);

  rerender(<DatePicker onChange={jest.fn()} inline />);

  expect(target).not.toHaveClass(className);
});

describe("Ensure ReactDatePicker CSS class names exists", () => {
  it("should have the click outside class", async () => {
    const { getByRole } = render(<ReactDatePicker onChange={jest.fn} />);
    const input = getByRole("textbox");
    const className = "react-datepicker-ignore-onclickoutside";

    expect(input).not.toHaveClass(className);
    await popperUpdate(() => fireEvent.focus(input));
    expect(input).toHaveClass(className);
  });

  describe("Overwritten CSS class name", () => {
    const classNames = [
      ".react-datepicker",
      ".react-datepicker__input-container",
      ".react-datepicker-wrapper",
      ".react-datepicker-popper",
      ".react-datepicker__header",
      ".react-datepicker__month",
      ".react-datepicker__day",
      ".react-datepicker__day--outside-month",
      ".react-datepicker__day--selected",
      ".react-datepicker__day-names",
      ".react-datepicker__day-name",
    ];

    classNames.forEach(className => {
      it(`should have ${className}`, async () => {
        const { getByRole, container } = render(
          <ReactDatePicker selected={new Date()} onChange={jest.fn} />,
        );
        await popperUpdate(() => fireEvent.focus(getByRole("textbox")));
        expect(container.querySelector(className)).toBeTruthy();
      });
    });
  });
});

async function popperUpdate(event: Function) {
  event();
  // Wait for the Popper update() so jest doesn't throw an act warning
  // https://github.com/popperjs/react-popper/issues/350
  await act(async () => undefined);
}
