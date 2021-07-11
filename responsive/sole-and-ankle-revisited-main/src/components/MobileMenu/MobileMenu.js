/* eslint-disable no-unused-vars */
import React from "react";
import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";

import { QUERIES } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const MobileMenu = ({ isOpen, onDismiss }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Overlay>
      <Content>
        <Dismiss onClick={onDismiss}>
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
          <UnstyledButton>
            <Icon id="close" strokeWidth={2} />
          </UnstyledButton>
        </Dismiss>
        <InnerContent>
          <Nav>
            <NavItem href="/sale">Sale</NavItem>
            <NavItem href="/new">New&nbsp;Releases</NavItem>
            <NavItem href="/men">Men</NavItem>
            <NavItem href="/women">Women</NavItem>
            <NavItem href="/kids">Kids</NavItem>
            <NavItem href="/collections">Collections</NavItem>
          </Nav>
          <Footer>
            <a href="/terms">Terms and Conditions</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/contact">Contact Us</a>
          </Footer>
        </InnerContent>
      </Content>
    </Overlay>
  );
};

const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: black;
  font-size: clamp(0.25rem, 1vw + 1rem, 2rem);
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: hsl(0deg 0% 0% / 0.5);
  display: flex;
  align-items: center;
`;

const Content = styled(DialogContent)`
  position: relative;
  background: white;
  border-radius: 0 8px 8px 0;
  padding: 36px;
  width: 65%;
  min-width: 220px;
  height: 100%;
`;

const Dismiss = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  font-size: 1.2rem;
  background-color: inherit;
`;

const Footer = styled.footer`
  font-size: 0.5rem;
  display: flex;
  gap: 8px;
`;

export default MobileMenu;
