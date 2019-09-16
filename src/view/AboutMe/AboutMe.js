import React from 'react';
import DefaultFooter from '../../components/Footers/DefaultFooter.js'

import { 
    Button,
    Container,
    UncontrolledTooltip
 } from "reactstrap";

function LandingPage({routeChange}) {
    let pageHeader = React.createRef();

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
    return function cleanup() {
        document.body.classList.remove("profile-page");
        document.body.classList.remove("sidebar-collapse");
      };
  });
  return (
    <>
    <div className="wrapper">
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/about2.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("../../assets/img/me2.jpg")}></img>
          </div>
          <h3 className="title">Muli Orgatz</h3>
          <p className="category">Front End Developer</p>
          <div className="content">
            <div className="social-description">
              <h2>2</h2>
              <p>Projects</p>
            </div>
            <div className="social-description">
              <h2>3</h2>
              <p>Year of study</p>
            </div>
            <div className="social-description">
              <h2>7</h2>
              <p>Languages</p>
            </div>
          </div>
        </Container>
      </div>
      <div className="section">
          <Container>
            <div className="button-container">
              <Button
                href="https://github.com/MuliOrgatz"
                target="_blank"
                className="btn-round btn-icon"
                color="info"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-github"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Check my GitHub
              </UncontrolledTooltip>
            </div>
            <h3 className="title">About me</h3>
            <h5 className="description" style={{fontWeight:'bold'}}>
            I am a Computer Science student, Third year at Holon Institute of Technology College in israel.
            I have highly independent learning skills, am able to lead processes, 
            have a wide view of systems and excellent interpersonal communication skills.<br></br>
            For further impressions, 
            you can enter to my <u style={{cursor:'pointer'}} href="https://github.com/MuliOrgatz" target="_blank"><b>Githab</b></u>.<br></br>
            To contact me send me an email to <u>Muli652@gmail.com</u>
            </h5>
          </Container>
        </div>
        <DefaultFooter routeChange={routeChange}/>
      </div>
    </>
  )
}

export default LandingPage;