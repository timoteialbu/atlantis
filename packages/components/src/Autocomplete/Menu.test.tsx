import React from "react";
import renderer from "react-test-renderer";
import { Option } from "./Option";
import { Menu } from "./Menu"; // system under test

test("A Menu shows a list of Options", () => {
  const options: Option[] = [
    { value: "asdf", label: "foo" },
    { value: "basdf", label: "bar" },
  ];
  const menu = renderer.create(<Menu options={options}></Menu>);

  expect(menu).toMatchSnapshot();
});

test("One Menu item can be highlighted", () => {
  const options: Option[] = [
    { value: "asdf", label: "foo" },
    { value: "basdf", label: "bar" },
  ];

  const highlightedIndex = 1;

  const menu = renderer.create(
    <Menu options={options} highlightedIndex={highlightedIndex}></Menu>,
  );

  expect(menu).toMatchSnapshot();
  // expect(first element) to be highlighted
});

test("One Menu item can be selected", () => {
  const options: Option[] = [
    { value: "asdf", label: "foo" },
    { value: "basdf", label: "bar" },
  ];

  const selectedIndex = 1;

  const menu = renderer.create(
    <Menu options={options} selectedIndex={selectedIndex}></Menu>,
  );

  expect(menu).toMatchSnapshot();
  // expect(first element) to be highlighted
});
