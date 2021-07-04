import React from "react";
import styled from "styled-components";

function Sidebar() {
  return (
    <Wrapper>
      <Title>Navigation Title</Title>
      <Navigation>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">About</a>
          </li>
          <li>
            <a href="/">Other thing</a>
          </li>
        </ul>
      </Navigation>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  width: 240px;
  min-height: 100vh;
  background: hsl(0deg, 0%, 90%);
  padding: 24px 8px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Navigation = styled.nav`
  padding: 8px;

  ul {
    margin-left: 16px;
    list-style-type: circle;
    color: dodgerblue;
  }

  a {
    display: block;
    padding: 6px 0;
    color: dodgerblue;
    text-decoration: none;
  }
`;

export default Sidebar;
