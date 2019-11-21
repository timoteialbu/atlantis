/* eslint-disable max-statements */
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

function showMenu(options: Option[]) {
  return options.length > 0;
}

enum IndexChange {
  Previous = -1,
  Next = 1,
}

// Design decision: component should call the function to return results
// or should it just display results? Should the calling be a layer on top
// of Autocomplete?

export function Autocomplete({
  initialOptions = [],
  value,
  onChange,
  getOptions,
  placeholder,
}: AutocompleteProps) {
  const [options, setOptions] = useState(initialOptions);
  const [menuVisible, setMenuVisible] = useState(false);
  const [inputText, setInputText] = useState((value && value.label) || "");
  const [menuHighlightIndex, setMenuHighlightIndex] = useState(-1);

  // Needed to make setting the value from the outside work.
  useEffect(() => {
    if (value) {
      updateInput(value.label);
    } else {
      updateInput("");
    }
  }, [value]);

  // Re-learned:
  // event.preventDefault stops the browser's default action from happening
  // event.stopPropagation stops the event from going up to parent element
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "ArrowDown") {
      if (!showMenu(options) || !menuVisible) return;

      event.preventDefault();
      setMenuHighlightIndex(
        Math.min(options.length - 1, menuHighlightIndex + IndexChange.Next),
      );
    }

    if (event.key == "ArrowUp") {
      if (!showMenu(options) || !menuVisible) return;

      event.preventDefault();
      setMenuHighlightIndex(
        Math.max(0, menuHighlightIndex + IndexChange.Previous),
      );
    }

    if (event.key == "Enter") {
      if (!showMenu(options) || !menuVisible) return;

      event.preventDefault();
      handleMenuChange(options[menuHighlightIndex]);
    }

    if (event.key == "Escape") {
      if (!showMenu(options) || !menuVisible) return;

      event.preventDefault();
      updateInput("");
    }
  };

  return (
    <div
      role="combobox"
      onKeyDown={handleKeyDown}
      className={styles.autocomplete}
    >
      <InputText
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />

      {showMenu(options) && menuVisible && (
        <Menu options={options} highlightedIndex={menuHighlightIndex} />
      )}
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
