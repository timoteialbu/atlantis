import React, { ReactNode, useState } from "react";
import classnames from "classnames";
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
  Modifier,
  genKey,
} from "draft-js";
import styles from "./InputTemplate.css";

const VARIABLE_REGEX = /\{\{[ ]*([\w]+)[ ]*\}\}/;

function variableStrategy(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) {
  findWithRegex(new RegExp(VARIABLE_REGEX.source, "g"), contentBlock, callback);
}

function findWithRegex(
  regex: RegExp,
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findVariableEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "VARIABLE"
    );
  }, callback);
}

interface InputTemplateProps {
  /**
   * Text to display.
   */
  readonly text: string;
}

export function InputTemplate({ text }: InputTemplateProps) {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // ContentState.createFromBlockArray([
      //   new ContentBlock({ key: genKey(), text: "foo", type: "unstyled" }),
      //   new ContentBlock({ key: genKey(), text: "bar", type: "unstyled" }),
      // ]),
      ContentState.createFromText(`foo bar tim ${text}`),
      new CompositeDecorator([
        { strategy: findVariableEntities, component: VariableSpan },
        { strategy: variableStrategy, component: VariableSpan },
      ]),
    ),
  );

  const className = classnames(styles.inputTemplate, {});

  return (
    <div className={className}>
      <Editor editorState={editorState} onChange={setEditorState} />
      <a onClick={handleClick}>Clickme</a>
    </div>
  );

  function handleClick() {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "VARIABLE",
      "IMMUTABLE",
      { name: "Name" },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    // const contentStateWithVariable = Modifier.applyEntity(
    //   contentStateWithEntity,
    //   editorState.getSelection(),
    //   entityKey,
    // );

    const contentStateWithVariable = Modifier.insertText(
      contentStateWithEntity,
      editorState.getSelection(),
      "Customer Name",
      undefined,
      entityKey,
    );

    const newEditorState = EditorState.push(
      editorState,
      contentStateWithVariable,
      "insert-fragment",
    );
    setEditorState(newEditorState);
  }
}

interface VariableSpanProps {
  contentState: any;
  entityKey: any;
  children: any;
}

function VariableSpan(props: VariableSpanProps) {
  // const { name } = props.contentState.getEntity(props.entityKey).getData();
  const className = classnames(styles.variable);

  return (
    <span contentEditable={false} className={className}>
      <span className={styles.variableDelimiter}>{"{{"}</span>
      {props.children}
      <span className={styles.variableDelimiter}>{"}}"}</span>
    </span>
  );
}
