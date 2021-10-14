import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { FormField } from ".";

afterEach(cleanup);
it("renders correctly with no props", () => {
  const { container } = render(<FormField />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440001"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440001"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});

it("renders correctly with a placeholder", () => {
  const { container } = render(<FormField placeholder="My placeholder" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440002"
          >
            My placeholder
          </label>
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440002"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});

it("renders correctly as small", () => {
  const { container } = render(<FormField size="small" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper small"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440003"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440003"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});

it("renders correctly in a readonly state", () => {
  const { container } = render(<FormField readonly={true} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440004"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440004"
            readonly=""
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});

it("renders correctly in a disabled state", () => {
  const { container } = render(<FormField disabled={true} />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper disabled"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440005"
          />
          <input
            class="input"
            disabled=""
            id="123e4567-e89b-12d3-a456-426655440005"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});

it("renders a field with error", () => {
  const { container } = render(<FormField value="wrong!" />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="wrapper"
      >
        <div
          class="inputWrapper"
        >
          <label
            class="label"
            for="123e4567-e89b-12d3-a456-426655440006"
          />
          <input
            class="input"
            id="123e4567-e89b-12d3-a456-426655440006"
            type="text"
            value="wrong!"
          />
        </div>
      </div>
    </div>
  `);
});

it("it should set the value", () => {
  const value = "Look, some words!";
  const { getByDisplayValue } = render(<FormField value={value} />);

  expect(getByDisplayValue(value)).toBeDefined();
});

test("it should call the handler with the new value", () => {
  const placeholder = "I hold places.";
  const newValue =
    "The snake which cannot cast its skin has to die. As well the minds which are prevented from changing their opinions; they cease to be mind.";
  const newerValue =
    "They always say time changes things, but you actually have to change them yourself.";
  const changeHandler = jest.fn();

  const { getByLabelText } = render(
    <FormField
      name="Got milk?"
      onChange={changeHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newValue);

  fireEvent.change(getByLabelText(placeholder), {
    target: { value: newerValue },
  });
  expect(changeHandler).toHaveBeenCalledWith(newerValue);
});

test("it should call the validation handler when typing a new value", () => {
  const validationHandler = jest.fn();

  render(
    <FormField
      name="Got milk?"
      onValidation={validationHandler}
      placeholder="I hold places."
    />,
  );

  expect(validationHandler).toHaveBeenCalled();
  expect(validationHandler).toHaveBeenCalledWith(undefined);
});

test("it should call the validation handler with a message when there is an error", async () => {
  const validationHandler = jest.fn();
  const validate = val => (val == "Bob" ? "message" : "foo");

  const { getByLabelText } = render(
    <FormField
      type="text"
      name="Got milk?"
      onValidation={validationHandler}
      placeholder="I hold places"
      validations={{
        validate,
      }}
    />,
  );

  getByLabelText("I hold places").focus();
  fireEvent.change(getByLabelText("I hold places"), {
    target: { value: "Bob" },
  });
  getByLabelText("I hold places").blur();

  await waitFor(() => {
    expect(validationHandler).toHaveBeenCalledWith("message");
  });
});

test("it should handle when the enter key is pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
  });

  expect(enterHandler).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
  });

  expect(enterHandler).toHaveBeenCalledTimes(2);
});

test("it should not handle when the shift key and enter key are pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
    shiftKey: true,
  });

  expect(enterHandler).toHaveBeenCalledTimes(0);
});

test("it should not handle when the shift key and control key are pressed", () => {
  const enterHandler = jest.fn();
  const placeholder = "Milk heals bones";

  const { getByLabelText } = render(
    <FormField
      name="Enter the milk house"
      onEnter={enterHandler}
      placeholder={placeholder}
    />,
  );

  fireEvent.keyDown(getByLabelText(placeholder), {
    key: "Enter",
    code: "Enter",
    ctrlKey: true,
  });

  expect(enterHandler).toHaveBeenCalledTimes(0);
});

test("it should not have a name by default", () => {
  const { getByLabelText } = render(<FormField placeholder="foo" />);
  expect(getByLabelText("foo")).not.toHaveAttribute("name");
});

test("it should use the name prop when set", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" name="dillan" />,
  );
  expect(getByLabelText("foo")).toHaveAttribute("name", "dillan");
});

test("it should generate a name if validations are set", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" validations={{ required: true }} />,
  );
  const input = getByLabelText("foo");
  const name = input.getAttribute("name");
  expect(name).toContain("generatedName--");
});

test("it should set the inputMode when the keyboard prop is set", () => {
  const keyboardMode = "numeric";
  const { getByLabelText } = render(
    <FormField placeholder="foo" keyboard={keyboardMode} />,
  );
  const input = getByLabelText("foo");
  const name = input.getAttribute("inputMode");
  expect(name).toContain(keyboardMode);
});

test("it should render the spinner when loading is true", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" type="text" loading={true} />,
  );
  const spinner = getByLabelText("loading");

  expect(spinner).toBeInstanceOf(HTMLElement);
});

it("it should set the autocomplete value with one-time-code", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={"one-time-code"} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("one-time-code");
});

it("it should set the autocomplete value with address-line1", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={"address-line1"} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("address-line1");
});

it("it should set the autocomplete value with address-line2", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={"address-line2"} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("address-line2");
});

it("it should set the autocomplete value to off", () => {
  const { getByLabelText } = render(
    <FormField placeholder="foo" autocomplete={false} />,
  );
  const input = getByLabelText("foo");
  const autocomplete = input.getAttribute("autocomplete");
  expect(autocomplete).toContain("autocomplete-off");
});

describe("when the formfield has a prefix", () => {
  it("shows an icon", () => {
    const { getByTestId } = render(<FormField prefix={{ icon: "home" }} />);

    expect(getByTestId("home")).toBeInstanceOf(SVGElement);
  });
});

describe("when the formfield has a suffix", () => {
  it("shows an icon", () => {
    const { getByTestId } = render(<FormField suffix={{ icon: "home" }} />);

    expect(getByTestId("home")).toBeInstanceOf(SVGElement);
  });

  it("calls the onClick when set", () => {
    const clickHandler = jest.fn();
    const { getByTestId } = render(
      <FormField
        suffix={{ arialLabel: "Go home", icon: "home", onClick: clickHandler }}
      />,
    );

    const icon = getByTestId("home");
    fireEvent.click(icon);

    expect(clickHandler).toHaveBeenCalled();
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
