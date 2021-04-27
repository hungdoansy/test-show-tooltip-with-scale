import React, { useRef, useState } from "react";
import styled from "styled-components";

const defaultObject = {};

const Test = ({ className }) => {
  const wrapperRef = useRef(null);
  const child0Ref = useRef(null);
  const child1Ref = useRef(null);
  const child2Ref = useRef(null);
  const child3Ref = useRef(null);

  const [which, setWhich] = useState(0);
  const [position, setPosition] = useState(defaultObject);

  const refs = [child0Ref, child1Ref, child2Ref, child3Ref];

  const handleClick = (index) => {
    console.log("here");
    setWhich(index);

    const selectedRef = refs[index];
    const childBoundary = selectedRef.current.getBoundingClientRect();
    const wrapperBoundary = wrapperRef.current.getBoundingClientRect();

    const toTop = childBoundary.top - wrapperBoundary.top;
    const toBottom = wrapperBoundary.bottom - childBoundary.bottom;
    const toLeft = childBoundary.left - wrapperBoundary.left;
    const toRight = wrapperBoundary.right - childBoundary.right;

    const pos = {};

    if (toTop > toBottom) {
      pos.bottom = wrapperBoundary.bottom - childBoundary.top;
    } else {
      pos.top = childBoundary.bottom - wrapperBoundary.top;
    }

    if (toLeft > toRight) {
      pos.right = wrapperBoundary.right - childBoundary.left;
    } else {
      pos.left = childBoundary.right - wrapperBoundary.left;
    }

    setPosition(pos);
  };

  return (
    <div className={className} ref={wrapperRef}>
      <div
        className="child"
        ref={child0Ref}
        style={{
          width: 30,
          height: 40,
          top: 20,
          left: 15
        }}
        onClick={() => handleClick(0)}
      ></div>

      <div
        className="child"
        ref={child1Ref}
        style={{
          width: 50,
          height: 30,
          top: 80,
          left: 600
        }}
        onClick={() => handleClick(1)}
      ></div>

      <div
        className="child"
        ref={child2Ref}
        style={{
          width: 100,
          height: 60,
          top: 400,
          left: 600
        }}
        onClick={() => handleClick(2)}
      ></div>

      <div
        className="child"
        ref={child3Ref}
        style={{
          width: 100,
          height: 60,
          top: 400,
          left: 110
        }}
        onClick={() => handleClick(3)}
      ></div>

      <div
        className="child"
        style={{
          width: 100,
          height: 100,
          ...position
        }}
      ></div>
    </div>
  );
};

export default styled(Test)`
  transform: scale(0.5);

  margin: 10px 15px 20px 25px;
  width: 800px;
  height: 500px;

  background-color: beige;
  border: 1px solid black;

  position: relative;

  .child {
    position: absolute;
    background-color: maroon;
    border: 1px solid black;
  }
`;
