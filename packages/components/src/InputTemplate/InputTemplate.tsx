import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  Editor,
  EditorState,
  Modifier,
  // genKey,
} from "draft-js";
import styles from "./InputTemplate.css";

interface VariableDefinition {
  name: string;
  label: string;
  sample: string;
}

const availableVariables: VariableDefinition[] = [
  { name: "NAME", label: "Name", sample: "Darryl" },
];

function findVariableEntities(
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState,
) {
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
  readonly value: string;
  onChange?(newText: string): void;
}

export function InputTemplate({ value, onChange }: InputTemplateProps) {
  const className = classnames(styles.inputTemplate, {});
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      // ContentState.createFromBlockArray([
      //   new ContentBlock({ key: genKey(), text: "foo", type: "unstyled" }),
      //   new ContentBlock({ key: genKey(), text: "bar", type: "unstyled" }),
      // ]),
      ContentState.createFromText(value),
      new CompositeDecorator([
        { strategy: findVariableEntities, component: VariableSpan },
      ]),
    ),
  );

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(
        // ContentState.createFromBlockArray([
        //   new ContentBlock({ key: genKey(), text: "foo", type: "unstyled" }),
        //   new ContentBlock({ key: genKey(), text: "bar", type: "unstyled" }),
        // ]),
        ContentState.createFromText(value),
        new CompositeDecorator([
          { strategy: findVariableEntities, component: VariableSpan },
        ]),
      ),
    );
  }, [value]);

  return (
    <>
      <div className={className}>
        <Editor editorState={editorState} onChange={handleChange} />
        <a onClick={handleClick}>Insert</a>
      </div>
      <pre>
        {editorState
          .getCurrentContent()
          .getBlocksAsArray()
          .map(block => block.getText())
          .join("\n")}
      </pre>
    </>
  );

  function handleChange(newEditorState: EditorState) {
    setEditorState(newEditorState);

    onChange &&
      onChange(
        editorState
          .getCurrentContent()
          .getBlocksAsArray()
          .map(block => block.getText())
          .join("\n"),
      );
  }

  function handleClick() {
    const variable = availableVariables[0];
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "VARIABLE",
      "IMMUTABLE",
      variable,
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const contentStateWithVariable = Modifier.insertText(
      contentStateWithEntity,
      editorState.getSelection(),
      `{{ ${variable.name} }}`,
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
  contentState: ContentState;
  entityKey: string;
}

function VariableSpan(props: VariableSpanProps) {
  const { name, label, sample } = props.contentState
    .getEntity(props.entityKey)
    .getData() as VariableDefinition;
  const className = classnames(styles.variable);

  return (
    <span contentEditable={false} className={className}>
      <span className={styles.variableDelimiter}>{"{{"}</span>
      {label}
      <span className={styles.variableDelimiter}>{"}}"}</span>
    </span>
  );
}
