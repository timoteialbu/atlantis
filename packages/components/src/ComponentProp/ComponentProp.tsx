import React, { ReactElement } from "react";
import classnames from "classnames";
import styles from "./ComponentProp.css";

interface ComponentPropProps {
  /**
   * Styles the text bold and uppercased
   * @default false
   */
  readonly loud?: boolean;

  /**
   * Click handler.
   */
  onClick?(): void;
  thing: ReactElement<ChildProps>;
}

interface ChildProps {
  children: string;
}

export function ComponentProp({
  loud = false,
  onClick,
  thing,
}: ComponentPropProps) {
  if (thing.type !== CorrectChild) {
    throw Error(
      `You can only pass in <CorrectChild /> as the component. ${thing.type} is not a valid child`,
    );
  }

  const className = classnames(styles.componentProp, { [styles.bold]: loud });
  return (
    <div className={className} onClick={onClick}>
      {thing}
    </div>
  );
}

export function CorrectChild({ children }: ChildProps) {
  return <div>{children}</div>;
}
