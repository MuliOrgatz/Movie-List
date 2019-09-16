import React from "react";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

const ColorNavbar = ({routeChange})=> {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  React.useEffect(() => {
    setNavbarColor("");
  },[]);
  
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} color="info" expand="lg">
        <Container>
          <UncontrolledDropdown className="button-dropdown">
            <DropdownToggle
              caret
              data-toggle="dropdown"
              id="navbarDropdown"
              tag="a"
              onClick={e => e.preventDefault()}
            >
              <span className="button-bar"></span>
              <span className="button-bar"></span>
              <span className="button-bar"></span>
            </DropdownToggle>
            <DropdownMenu aria-labelledby="navbarDropdown">
              <DropdownItem header tag="a">
                User Menu
              </DropdownItem>
              <DropdownItem  onClick={()=> routeChange('search-page')}>
                Search Movie
              </DropdownItem>
              <DropdownItem  onClick={()=> routeChange('howwork')}>
                How It Works
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem onClick={()=> routeChange('home')}>
              Sign out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="navbar-translate">
            
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <NavLink onClick={()=> routeChange('search-page')} style={{cursor:'pointer'}}>
                <i className="now-ui-icons ui-1_zoom-bold"></i>
                Search Movie
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{cursor:'pointer'}} onClick={()=> routeChange('howwork')}>
                 <i className="now-ui-icons travel_info"></i>  
                  How it Works
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=> routeChange('home')} style={{cursor:'pointer'}}>
                  <i className="now-ui-icons sport_user-run"></i>
                  Sign out
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.linkedin.com/in/muli-orgatz-0642b9145/"
                  target="_blank"
                  id="linkedin-tooltip"
                >
                  <i className="fab fa-linkedin"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#linkedin-tooltip">
                Connect me By Linkedin
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/muli.orgatz"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Add me on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href=""
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Soon
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorNavbar;
