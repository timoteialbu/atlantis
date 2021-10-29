import React, { KeyboardEvent, useRef } from "react";
import styles from "./ChatBox.css";

export function ChatBox() {
  // eslint-disable-next-line no-null/no-null
  const messagesRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line no-null/no-null
  const inputRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className={styles.container} tabIndex={0}>
      <div
        ref={messagesRef}
        className={styles.messages}
        onKeyDown={handleInputKeyDown}
      >
        {Array.from(Array(24).keys()).map(i => {
          return (
            <div key={i} className={styles.chatBubble} tabIndex={0}>
              {i} hello
            </div>
          );
        })}
      </div>
      <div className={styles.inputHolder}>
        <textarea ref={inputRef} onKeyDown={handleInputKeyDown}></textarea>
      </div>
    </div>
  );

  // eslint-disable-next-line max-statements
  function handleInputKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement | HTMLDivElement>,
  ) {
    if (event.key === "Tab") {
      let target;

      const first = messagesRef.current?.firstElementChild;
      const last = messagesRef.current?.lastElementChild;
      const isActiveElementInput = document.activeElement === inputRef.current;

      if (event.shiftKey) {
        if (document.activeElement === last) {
          target = messagesRef?.current?.parentElement;
        } else if (isActiveElementInput) {
          target = first;
        } else {
          target = document.activeElement?.nextElementSibling;
        }
      } else {
        if (document.activeElement === first) {
          target = inputRef?.current;
        } else if (document.activeElement === last) {
          target = messagesRef?.current;
        } else if (!isActiveElementInput) {
          target = document.activeElement?.previousElementSibling;
        }
      }

      if (target instanceof HTMLElement) {
        event.preventDefault();
        target.focus();
      }
    }
  }
}
