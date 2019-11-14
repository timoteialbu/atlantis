import React, { useEffect, useState } from "react";
import styles from "./Autocomplete.css";
import { Menu } from "./Menu";
import { Option } from "./Option";
import { InputText } from "../InputText";

interface AutocompleteProps {
  /**
   * Initial options to show when user first focuses the Autocomplete
   */
  readonly initialOptions?: Option[];

  /**
   * Set Autocomplete value.
   */
  readonly value: Option | undefined;

  /**
   * Hint text that goes above the value once the form is filled out.
   */
  readonly placeholder: string;

  /**
   * Simplified onChange handler that only provides the new value.
   * @param newValue
   */
  onChange(newValue?: Option): void;

  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void;

  /**
   * Called as the user types in the input. The autocomplete will display what
   * is retuned from this method to the user as available options.
   * @param newInputText
   */
  getOptions(newInputText: string): Option[] | Promise<Option[]>;
}

// Design decision: component should call the function to return results
// or should it just display results? Should the calling be a layer on top
// of Autocomplete?

export function Autocomplete({
  initialOptions = [
    { label: "foo", value: "FOO" },
    { label: "bar", value: "BAR" },
  ],
  value,
  onChange,
  onKeyDown,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(true);
  const [inputText, setInputText] = useState((value && value.label) || "");

  useEffect(() => {
    if (value) {
      updateInput(value.label);
    } else {
      updateInput("");
    }
  }, [value]);

  // event.preventDefault stops the browser's default action from happening
  // event.stopPropagation stops the event from going up to parent element
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event.key);
    console.log(event.keyCode);
    console.log(event.which);
  };

  return (
    <div
      role="combobox"
      onKeyDown={handleKeyDown}
      className={styles.autocomplete}
    >
      <input type="text" placeholder="foo" />
      {/* <InputText
      // value={inputText}
      // onChange={handleInputChange}
      // placeholder={placeholder}
      // onFocus={handleInputFocus}
      // onBlur={handleInputBlur}
      /> */}
      <Menu options={options} />
    </div>
  );

  async function updateInput(newText: string) {
    setInputText(newText);
    if (newText) {
      setOptions(await getOptions(newText));
    } else {
      setOptions(initialOptions);
    }
  }

  function handleMenuChange(chosenOption: Option) {
    onChange(chosenOption);
    updateInput(chosenOption.label);
    setMenuVisible(false);
  }

  function handleInputChange(newText: string) {
    updateInput(newText);
    setMenuVisible(true);
  }

  function handleInputBlur() {
    setMenuVisible(false);
    if (value == undefined || value.label !== inputText) {
      onChange(undefined);
    }
  }

  function handleInputFocus() {
    setMenuVisible(true);
  }
}

// TODO: control visibility from Autocomplete instead of Menu
//   const optionMenuClass = classnames(styles.options, {
//   [styles.visible]: visible,
// });

// keyboard nav code from Menu

// import useEventListener from "@use-it/event-listener";

// enum IndexChange {
//   Previous = -1,
//   Next = 1,
// }

// function setupKeyListeners() {
//   useOnKeyDown("ArrowDown", (event: KeyboardEvent) => {
//     if (!visible) return;

//     event.preventDefault();
//     setHighlightedIndex(
//       Math.min(options.length - 1, highlightedIndex + IndexChange.Next),
//     );
//   });

//   useOnKeyDown("ArrowUp", (event: KeyboardEvent) => {
//     if (!visible) return;

//     event.preventDefault();
//     setHighlightedIndex(Math.max(0, highlightedIndex + IndexChange.Previous));
//   });

//   useOnKeyDown("Enter", (event: KeyboardEvent) => {
//     if (!visible) return;

//     event.preventDefault();
//     onOptionSelect(options[highlightedIndex]);
//   });
// }
// }

// // Split this out into a hooks package.
// function useOnKeyDown(
// keyName: string,
// handler: (event: KeyboardEvent) => boolean | void,
// ) {
// // Pending: https://github.com/donavon/use-event-listener/pull/12
// // The types in useEventListener mistakenly require a SyntheticEvent for the passed generic.
// // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// //@ts-ignore
// useEventListener<KeyboardEvent>("keydown", (event: KeyboardEvent) => {
//   if (event.key === keyName) {
//     handler(event);
//   }
// });
