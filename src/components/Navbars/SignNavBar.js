import React from "react";
// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

const SignNavbar = ({routeChange})=> {
    const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = React.useState(false);
  
    React.useEffect(() => {
      const updateNavbarColor = () => {
        if (
          document.documentElement.scrollTop > 399 ||
          document.body.scrollTop > 399
        ) {
          setNavbarColor("");
        } else if (
          document.documentElement.scrollTop < 400 ||
          document.body.scrollTop < 400
        ) {
          setNavbarColor("navbar-transparent");
        }
      };
      window.addEventListener("scroll", updateNavbarColor);
      return function cleanup() {
        window.removeEventListener("scroll", updateNavbarColor);
      };
    });
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
        <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
          <Container>
            <div className="navbar-translate"> 
              <NavbarBrand
                href="/"
                target="_self"
                id="navbar-brand"
              >
                Home Page
              </NavbarBrand>
              <UncontrolledTooltip target="#navbar-brand">
                Back to the first screen
              </UncontrolledTooltip>
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
                  <NavLink
                  style={{cursor:'pointer'}}
                    onClick={()=> routeChange('signup')}
                  >
                    <i className="now-ui-icons objects_key-25"></i>
                      <p>Sign Up</p>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle
                    caret
                    color="default"
                    nav
                    onClick={e => e.preventDefault()}
                  >
                    <i className="now-ui-icons ui-1_settings-gear-63"></i>
                    <p>See More</p>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={()=> routeChange('login')}>
                    <i className="now-ui-icons ui-1_lock-circle-open"></i>
                    Sign In   
                    </DropdownItem>
                    <DropdownItem
                      onClick={()=> routeChange('howwork')}
                    >
                      <i className="now-ui-icons travel_info"></i>
                      How it Works
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
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
                    Soon..
                  </UncontrolledTooltip>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
}

export default SignNavbar;
