import React from "react";
import styled from "styled-components";

function Header({ children }) {
  return (
    <Wrapper>
      <Title>App Name</Title>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 75px;
  background: dodgerblue;
  padding: 24px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
`;

export default Header;
