import React, {
  MouseEvent,
  ReactElement,
  RefObject,
  createRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { v1 as uuidv1 } from "uuid";
import classnames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { IconNames } from "@jobber/design";
import { useOnKeyDown } from "@jobber/hooks";
import styles from "./Menu.css";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

const variation = {
  overlayStartStop: { opacity: 0 },
  startOrStop: (position: string) => {
    let y = 10;

    if (position === "below") y *= -1;
    if (window.innerWidth < 640) y = 150;

    return { opacity: 0, y };
  },
  done: { opacity: 1, y: 0 },
};

interface Position {
  vertical: "above" | "below";
  horizontal: "left" | "right";
}

interface MenuProps {
  /**
   * Custom menu activator. If this is not provided a default [… More] will be used.
   */
  readonly activator?: ReactElement;
  /**
   * Collection of action items.
   */
  readonly items: SectionProps[];
}

export interface SectionProps {
  /**
   * Defines the section header to further explain the group of actions.
   */
  header?: string;

  /**
   * List of actions.
   */
  actions: Omit<ActionProps, "shouldFocus">[];
}

// eslint-disable-next-line max-statements
export function Menu({ activator, items }: MenuProps) {
  const [visible, setVisible] = useState(false);
  const fullWidth = activator?.props?.fullWidth || false;
  const [position, setPosition] = useState<Position>({
    vertical: "below",
    horizontal: "right",
  });
  const wrapperRef = createRef<HTMLDivElement>();
  const buttonID = uuidv1();
  const menuID = uuidv1();

  useOnKeyDown(handleKeyboardShortcut, ["Escape"]);
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      const bounds = wrapperRef.current.getBoundingClientRect();
      const newPosition = { ...position };

      if (bounds.top <= window.innerHeight / 2) {
        newPosition.vertical = "below";
      } else {
        newPosition.vertical = "above";
      }

      if (bounds.left <= window.innerWidth / 2) {
        newPosition.horizontal = "right";
      } else {
        newPosition.horizontal = "left";
      }

      setPosition(newPosition);
    }
  }, [visible, fullWidth]);

  if (!activator) {
    activator = (
      <Button
        fullWidth={true}
        label="More Actions"
        icon="more"
        type="secondary"
      />
    );
  }

  const menuClasses = classnames(
    styles.menu,
    position.vertical === "above" && styles.above,
    position.vertical === "below" && styles.below,
    position.horizontal === "left" && styles.left,
    position.horizontal === "right" && styles.right,
  );

  const wrapperClasses = classnames(styles.wrapper, {
    [styles.fullWidth]: fullWidth,
  });

  return (
    <div className={wrapperClasses} ref={wrapperRef}>
      {React.cloneElement(activator, {
        onClick: toggle(activator.props.onClick),
        id: buttonID,
        ariaControls: menuID,
        ariaExpanded: visible,
        ariaHaspopup: true,
      })}
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={toggle()}
              variants={variation}
              initial="overlayStartStop"
              animate="done"
              exit="overlayStartStop"
              transition={{
                type: "tween",
                duration: 0.15,
              }}
            />
            <motion.div
              className={menuClasses}
              role="menu"
              aria-labelledby={buttonID}
              id={menuID}
              onClick={hide}
              variants={variation}
              initial="startOrStop"
              animate="done"
              exit="startOrStop"
              custom={position}
              transition={{
                type: "tween",
                duration: 0.25,
              }}
            >
              {items.map((item, key: number) => (
                <div key={key} className={styles.section}>
                  {item.header && <SectionHeader text={item.header} />}

                  {item.actions.map((action, index) => (
                    <Action
                      sectionLabel={item.header}
                      key={action.label}
                      shouldFocus={key === 0 && index === 0}
                      {...action}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  function toggle(callbackPassthrough?: (event?: MouseEvent) => void) {
    return (event: MouseEvent) => {
      setVisible(!visible);
      callbackPassthrough && callbackPassthrough(event);
    };
  }

  function hide() {
    setVisible(false);
  }

  function handleKeyboardShortcut(event: KeyboardEvent) {
    const { key } = event;
    if (!visible) return;

    event.preventDefault();
    event.stopPropagation();
    key === "Escape" && hide();
  }
}

interface SectionHeaderProps {
  text: string;
}

function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader} aria-hidden={true}>
      <Typography
        element="h6"
        size="small"
        textCase="uppercase"
        textColor="greyBlue"
        fontWeight="bold"
      >
        {text}
      </Typography>
    </div>
  );
}

export interface ActionProps {
  /**
   * Action label
   */
  label: string;

  /**
   * Parent Section Label
   */
  sectionLabel?: string;

  /**
   * Visual cue for the action label
   */
  icon?: IconNames;

  /**
   * Callback when an action gets clicked
   */
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void;

  /**
   * Focus on the action when rendered
   */
  shouldFocus?: boolean;
}

function Action({
  label,
  sectionLabel,
  icon,
  onClick,
  shouldFocus = false,
}: ActionProps) {
  const actionButtonRef = useRef() as RefObject<HTMLButtonElement>;

  useEffect(() => {
    if (actionButtonRef.current && shouldFocus) {
      actionButtonRef.current.focus();
    }
  }, [shouldFocus]);

  return (
    <button
      role="menuitem"
      className={styles.action}
      key={label}
      onClick={onClick}
      ref={actionButtonRef}
    >
      {icon && (
        <span className={styles.icon}>
          <Icon name={icon} />
        </span>
      )}
      <Typography element="span" size="base" textColor="greyBlueDark">
        {sectionLabel && (
          <span className={styles.screenReaderOnly}>{sectionLabel}</span>
        )}
        {label}
      </Typography>
    </button>
  );
}
