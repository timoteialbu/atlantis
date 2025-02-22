import React from "react";
import renderer from "react-test-renderer";
import { InputValidation } from ".";

it("renders the input validation messages", () => {
  const tree = renderer
    .create(<InputValidation message="I am an error" />)
    .toJSON();
  expect(tree).toMatchInlineSnapshot(`
    <div
      style={
        Object {
          "height": "0px",
          "opacity": 0,
          "transform": "translateY(5%) translateZ(0)",
        }
      }
    >
      <div
        aria-live="assertive"
        className="message"
        role="alert"
        tabIndex={0}
      >
        <p
          className="base regular base critical"
        >
          I am an error
        </p>
      </div>
    </div>
  `);
});
