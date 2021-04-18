import React from "react";
import styled from "styled-components";

import LoadingSpinner from "./vendor/LoadingSpinner";
import Sidebar from "./Sidebar";

function PageContent() {
  return (
    <Row>
      <MainContent>
        {/* Normally, an app would load here. */}
        <LoadingSpinner />
      </MainContent>
      <Sidebar />
    </Row>
  );
}

const Row = styled.div`
  position: relative;
`;

const MainContent = styled.main`
  padding: 64px;
  padding-right: 304px;
  display: flex;
  justify-content: center;
`;

export default PageContent;
