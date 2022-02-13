import React, { useState } from 'react'

import { Card, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  SideNavMenu,
  SideNavMenuItem
} from "carbon-components-react";
import AddTransaction from './transaction/AddTransaction';
import '../styles/dashboard.scss';

const StoryContent = () => {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/');
    } catch (error) {
      setError('Failed to logout')
    }
  }   
  
  const content = (
    <div className="bx--grid bx--grid--narrow main-content-box">
      <div className="bx--row">
        <section className="bx--col">
          <AddTransaction />
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>

          </Card>
          <div className="w-100 text-center mt2">
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
          </div>
          <h2
            style={{
              fontWeight: "800",
              margin: "30px 0",
              fontSize: "20px"
            }}
          >
            Purpose and function
          </h2>
          <p style={{ lineHeight: "20px" }}>
            The shell is perhaps the most crucial piece of any UI built with
            Carbon. It contains the shared navigation framework for the entire
            design system and ties the products in IBM’s portfolio together in a
            cohesive and elegant way. The shell is the home of the topmost
            navigation, where users can quickly and dependably gain their
            bearings and move between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2
            style={{
              fontWeight: "800",
              margin: "30px 0",
              fontSize: "20px"
            }}
          >
            Header responsive behavior
          </h2>
          <p style={{ lineHeight: "20px" }}>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2
            style={{
              fontWeight: "800",
              margin: "30px 0",
              fontSize: "20px"
            }}
          >
            Secondary navigation
          </h2>
          <p style={{ lineHeight: "20px" }}>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
        </section>
      </div>
    </div>
  );

  return <Content id="main-content">{content}</Content>;
};

const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

export default function Dashboard() {
    

  return (
    <>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            
            <Header aria-label="Money">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                isCollapsible
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName href="#" prefix="">
                Money
              </HeaderName>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                  <Search20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
                  <Notification20 />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="App Switcher" onClick={() => {}}>
                  <AppSwitcher20 />
                </HeaderGlobalAction>
              </HeaderGlobalBar>


            </Header>
                <SideNav isRail aria-label="Side navigation" expanded={isSideNavExpanded}>
                  <SideNavItems>
                    <SideNavMenu renderIcon={Fade16} title="Category title" large>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem
                        aria-current="page"
                        href="/"
                      >
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavMenu renderIcon={Fade16} title="Category title" large>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem
                        aria-current="page"
                        href="/"
                      >
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavMenu renderIcon={Fade16} title="Category title" large>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem
                        aria-current="page"
                        href="/"
                      >
                        Link
                      </SideNavMenuItem>
                      <SideNavMenuItem href="/">
                        Link
                      </SideNavMenuItem>
                    </SideNavMenu>
                    <SideNavLink renderIcon={Fade16} href="/" large>
                      Link
                    </SideNavLink>
                    <SideNavLink renderIcon={Fade16} href="/" large>
                      Link
                    </SideNavLink>
                  </SideNavItems>
                </SideNav>
            <StoryContent />
            
          </>
        )}
      />
      
    </>
  )
}
