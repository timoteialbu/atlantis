import React from "react";
import classnames from "classnames";
import { Option } from "./Option";
import styles from "./Autocomplete.css";
import { Text } from "../Text";
import { Icon } from "../Icon";

function isSelected(index: number, selectedIndex?: number) {
  return selectedIndex && selectedIndex == index;
}

interface MenuProps {
  readonly options: Option[];
  readonly selectedIndex?: number;
  readonly highlightedIndex?: number;
}

export function Menu({ options, selectedIndex, highlightedIndex }: MenuProps) {
  const optionMenuClass = classnames(styles.options);
  const optionElements = options.map((option, index) => {
    const optionClass = classnames(styles.option, {
      [styles.active]: index === highlightedIndex,
    });
    return (
      <button className={optionClass} key={option.value}>
        <div className={styles.icon}>
          {isSelected(index, selectedIndex) && (
            <Icon name="checkmark" size="small" />
          )}
        </div>
        <div className={styles.text}>
          <Text>{option.label}</Text>
        </div>
      </button>
    );
  });
  return <div className={optionMenuClass}>{optionElements}</div>;
}
