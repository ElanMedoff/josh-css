/**
 * IMPORTANT: For this exercise, you should
 * assume that this component is part of a
 * third-party library, living in node_modules
 */

import React from "react";
import styled, { keyframes } from "styled-components";

function StaticWidget() {
  return (
    <Wrapper>
      <BallOne />
      <BallTwo />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  width: 50px;
  height: 50px;
`;

const ballOneAnimation = keyframes`
  0% {
    z-index: 0;
    transform: translate(50%, 0%);
  }
  25% {
    z-index: 0;
    transform: translate(140%, 0%);
  }
  50% {
    z-index: -1;
    transform: translate(50%, 0%);
  }
  75% {
    z-index: -1;
    transform: translate(140%, 0%);
  }
  100% {
    z-index: 0;
    transform: translate(50%, 0%);
  }
`;

const ballTwoAnimation = keyframes`
  0% {
    z-index: -1;
    transform: translate(50%, 0%);
  }
  25% {
    z-index: -1;
    transform: translate(-40%, 0%);
  }
  50% {
    z-index: 0;
    transform: translate(50%, 0%);
  }
  75% {
    z-index: 0;
    transform: translate(-40%, 0%);
  }
  100% {
    z-index: -1;
    transform: translate(50%, 0%);
  }
`;

const Ball = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const BallOne = styled(Ball)`
  background-color: hotpink;
  animation: ${ballOneAnimation} 2000ms infinite;
`;
const BallTwo = styled(Ball)`
  background-color: slateblue;
  z-index: -1;
  animation: ${ballTwoAnimation} 2000ms infinite;
`;

export default StaticWidget;
