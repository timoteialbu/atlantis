import React, { useLayoutEffect } from "react";
import { CivilTime } from "@std-proposal/temporal";
// eslint-disable-next-line import/no-internal-modules
// import supportsTime from "time-input-polyfill/supportsTime";
// import TimePolyfill from "time-input-polyfill";
import { FormField, FormFieldProps } from "../FormField";

/**
 * The following is the same as:
 *   type BaseProps = Omit<FormFieldProps, "type" | "children">;
 * Unfortunately Docz doesn't currently support Omit so it has been reduced to
 * its component parts.
 */
type BaseProps = Pick<
  FormFieldProps,
  Exclude<
    keyof FormFieldProps,
    "type" | "children" | "rows" | "defaultValue" | "value" | "onChange"
  >
>;

interface TimePickerProps extends BaseProps {
  /**
   * Initial value.
   *
   * defaultValue is for when you want to set an initial value of
   * an uncontrolled component, i.e a component that you won't be monitoring
   * through a value/onChange loop. The value/onChange pair is for controlled
   * components. If you try to set value without setting onChange you end up
   * with a readOnly component and have to set that flag to get rid of the React
   * warning.
   */
  readonly defaultValue?: CivilTime;

  /**
   * Set the component to the given value.
   * Must be used with onChange to create a "controlled component" or
   * set `readOnly` to silence the warning.
   */
  readonly value?: CivilTime;

  /**
   * Function called when user changes input value.
   */
  onChange?(newValue: CivilTime): void;
}

export function TimePicker({
  defaultValue,
  value,
  onChange,
  ...params
}: TimePickerProps) {
  const inputTime = React.createRef<HTMLInputElement>();

  const handleChange = (newValue: string) => {
    onChange && onChange(htmlTimeToCivilTime(newValue));
  };

  // useLayoutEffect(() => {
  //   if (!supportsTime) {
  //     const input = inputTime.current;

  //     if (input) {
  //       new TimePolyfill(input);

  //       input.addEventListener("change", (event: Event) => {
  //         const value = (event.currentTarget as HTMLInputElement).dataset.value;

  //         if (value) {
  //           handleChange(value);
  //         }
  //       });
  //     }
  //   }
  // });

  const fieldProps: FormFieldProps = {
    onChange: handleChange,
    defaultValue:
      defaultValue != undefined ? civilTimeToHTMLTime(defaultValue) : undefined,
    value: value != undefined ? civilTimeToHTMLTime(value) : undefined,
    ...params,
  };

  return <FormField ref={inputTime} type={"time"} {...fieldProps} />;
}

function civilTimeToHTMLTime(civilTime: CivilTime) {
  const timeString = civilTime.toString();
  return timeString.substring(0, timeString.indexOf("."));
}

function htmlTimeToCivilTime(timeString: string) {
  return CivilTime.fromString(timeString + ":00.000000000");
}
