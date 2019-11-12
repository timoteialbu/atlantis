import { toUnicode } from "punycode";
import React from "react";
import renderer from "react-test-renderer";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { tsRestType } from "@babel/types";
import { Autocomplete, Option } from ".";

afterEach(cleanup);

function returnOptions(options: Option[]) {
  return async () => {
    return Promise.resolve(options);
  };
}

const options = [
  {
    value: "0",
    label: "option_0",
  },
  {
    value: "1",
    label: "option_1",
  },
];

it("renders an Autocomplete", () => {
  const tree = renderer
    .create(
      <Autocomplete
        value={undefined}
        initialOptions={options}
        onChange={() => {}}
        getOptions={returnOptions([])}
        placeholder="placeholder_name"
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("it should call the getOptions handler with the new value", async () => {
  const placeholder = "my_placeholder";
  const changeHandler = jest.fn();
  const changeOptionsHandler = jest.fn();
  changeOptionsHandler.mockReturnValue(Promise.resolve([]));
  const newValue = "new search value";
  const { getByLabelText } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      getOptions={changeOptionsHandler}
      placeholder={placeholder}
    />,
  );
  await act(async () => {
    fireEvent.change(getByLabelText(placeholder), {
      target: { value: newValue },
    });
  });
  expect(changeOptionsHandler).toHaveBeenCalledWith(newValue);
});

test("it should call the handler when an option is selected", () => {
  const changeHandler = jest.fn();
  const { getByText, getByRole } = render(
    <Autocomplete
      value={undefined}
      onChange={changeHandler}
      initialOptions={options}
      getOptions={returnOptions(options)}
      placeholder="placeholder_name"
    />,
  );
  fireEvent.focus(getByRole("textbox"));
  fireEvent(
    getByText(`option_${options[0].value}`),
    new KeyboardEvent("keydown", {
      key: "ArrowDown",
      bubbles: true,
      cancelable: false,
    }),
  );
  fireEvent(
    getByText(`option_${options[0].value}`),
    new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: false,
    }),
  );

  expect(changeHandler).toHaveBeenCalledWith(options[1]);
});

describe("when the menu is open", () => {
  test.todo("the down arrow should move down");
  test.todo("the up arrow should move up");
  test.todo("enter should select the highlighted option");
  test.todo("escape should close the menu");
});

// Assumption: there's only one type of autocomplete. There isn't.
// Restricted vs. unrestricted autocomplete:
// Some autocompletes are just for filtering a defined list of options. e.g.
// the command menu in VSCode
// Some autocompletes allow any text as the value, but will show suggestions
// that can be selected. e.g. google search
// Maybe we can call those, "suggest boxes"???

// Good property when the value MUST be one of the selections. Bad property
// if you are allowed to enter your own values.
test.todo(
  "as a user I want to be able to select the first option without pushing the down arrow",
);
// ^^^^
// Interface possibility: the first option in the list could be part of the text
// box. The text that would be auto completed would be selected (). Typing
// overwrites the selected part and adds a highlight for the next part, hitting
// enter sets the value for the text box.
// response time could be an issue here.
// learned that the aria spec already thought about this.

test.todo(
  "when you select a menu option it should be checked when you open the menu",
);

test.only("foo", () => {
  const fakeKeyDown = jest.fn();

  const onKeyDown = event => {
    // console.log(event);
  };

  const { getByRole, getByPlaceholderText } = render(
    <div role="combobox" onKeyDown={onKeyDown}>
      <input placeholder="foo" />
    </div>,
  );
  fireEvent.keyDown(getByRole("combobox"), {
    key: "A",
    code: 65,
    charCode: 65,
  });
  console.log(getByPlaceholderText("foo").value);
  console.log(getByRole("textbox").value);

  // fireEvent.keyDown(getByRole("combobox"), { target: { value: "a" } });
  // console.log(getByPlaceholderText("foo").value);
  // console.log(getByRole("textbox").value);

  // console.log(fakeKeyDown.mock.calls[0][0].key);
  // console.log(fakeKeyDown.mock.calls[1][0].key);

  // fireEvent.change(getByRole("textbox"), { target: { value: "a" } });
  // console.log(getByPlaceholderText("foo").value);
  // console.log(getByRole("textbox").value);
});

test("typing should show a list of options", () => {
  const fakeKeyDown = jest.fn();
  const { getByRole, getByPlaceholderText } = render(
    <Autocomplete
      value={undefined}
      onKeyDown={fakeKeyDown}
      initialOptions={options}
      placeholder="placeholder_name"
      onChange={jest.fn()}
      getOptions={jest.fn()}
    />,
  );

  fireEvent.keyDown(getByRole("textbox"), { key: "a", keyCode: 65, which: 65 });
  console.log(getByPlaceholderText("foo").value);
  console.log(getByRole("textbox"));
  console.log(getByRole("textbox").nodeValue);
  console.log(getByRole("textbox").value);
  console.log(fakeKeyDown);
  expect(fakeKeyDown).toHaveBeenCalled();
  // expect(getByRole("textbox").value).toBe("a");
});

test.todo("tab moves out");

test.todo("typing filters options");

test.todo("selected option is readable from jQuery?????");

// actions:
//   type a character or backspace
//   hit enter
//   hit esc
//   use the up arrow
//   use the down arrow
//   enter the text box
//   leave the text box (tab or mouse)
//   click an option
//   paste text
//   look at it
//   hear about it with a screen reader
