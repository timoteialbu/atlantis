import { omit } from "lodash";
import React, { useState } from "react";
// import classnames from "classnames";
// import styles from "./InputDate.css";
import { DatePicker } from "../DatePicker";
import { FormField, Suffix } from "../FormField";

// TODO: Expose some input props like placeholder, validation, etc.

// interface InputDateProps {
//   /**
//    * Styles the text bold and uppercased
//    * @default false
//    */
//   readonly loud?: boolean;

//   /**
//    * Text to display.
//    */
//   readonly text: string;

//   /**
//    * Click handler.
//    */
//   onClick?(event: React.MouseEvent<HTMLDivElement>): void;
// }

export function InputDate() {
  const [selected, setSelected] = useState(new Date());
  return (
    <DatePicker
      selected={selected}
      activator={props => {
        const fieldProps = omit(props, ["onChange", "activator"]);
        const suffix = {
          icon: "calendar",
          ...(props.onClick && {
            onClick: props.onClick,
            ariaLabel: "Show calendar",
          }),
        } as Suffix;

        return (
          <FormField
            {...fieldProps}
            onChange={(_, event) => props.onChange && props.onChange(event)}
            placeholder="Date baby!"
            suffix={suffix}
          />
        );
      }}
      onChange={setSelected}
    />
  );
}
