import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { QUERIES } from "../../utils";
import Logo from "../Logo";
import SuperHeader from "../SuperHeader";
import MobileMenu from "../MobileMenu";
import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";

const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <SuperHeader />
      <MainHeader>
        <Side>
          <Logo />
        </Side>
        <Nav>
          <NavLink href="/sale">Saleasdf</NavLink>
          <NavLink href="/new">New&nbsp;Releasesasdf</NavLink>
          <NavLink href="/men">Menasdf</NavLink>
          <NavLink href="/women">Womenasdf</NavLink>
          <NavLink href="/kids">Kidsasdf</NavLink>
          <NavLink href="/collections">Collectionsasdf</NavLink>
          <UnstyledButtons>
            <UnstyledButton>
              <Icon id="shopping-bag" strokeWidth={3} />
            </UnstyledButton>
            <UnstyledButton>
              <Icon id="search" strokeWidth={3} />
            </UnstyledButton>
            <MenuButton onClick={() => setShowMobileMenu(true)}>
              <Icon id="menu" strokeWidth={3} />
            </MenuButton>
          </UnstyledButtons>
        </Nav>
        <Side />
      </MainHeader>

      <MobileMenu
        isOpen={showMobileMenu}
        onDismiss={() => setShowMobileMenu(false)}
      />
    </header>
  );
};

const MainHeader = styled.div`
  display: flex;
  align-items: baseline;
  padding: 18px 32px;
  height: 72px;
  border-bottom: 1px solid ${COLORS.gray[300]};

  @media ${QUERIES.tabletAndDown} {
    justify-content: space-between;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: clamp(1rem, 1vw + 1rem, 4rem);
  margin: 0px 48px;

  @media ${QUERIES.tabletAndDown} {
    margin: 0px;
  }
`;

const UnstyledButtons = styled.div`
  display: none;
  @media ${QUERIES.tabletAndDown} {
    display: flex;
    gap: clamp(1rem, 6.9vw - 1.5rem, 2.5rem);
  }
`;

const MenuButton = styled(UnstyledButton)``;

const Side = styled.div`
  flex: 1;

  @media ${QUERIES.tabletAndDown} {
    &:last-of-type {
      display: none;
    }

    flex: none;
  }
`;

const NavLink = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: ${COLORS.gray[900]};
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: ${COLORS.secondary};
  }

  @media ${QUERIES.tabletAndDown} {
    display: none;
  }
`;

export default Header;
