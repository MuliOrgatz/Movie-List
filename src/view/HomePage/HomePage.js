import React from "react";
import DarkFooter from '../../components/Footers/DarkFooter.js';
import { Container, Button } from "reactstrap";

const HomePage =({routeChange}) => {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
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
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  return (
    <>      
      <div className="wrapper">
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require('../../assets/img/header.jpg') + ")"
            }}
            ref={pageHeader}
          ></div>
          <Container>
            <div className="content-center brand">
              <img
                alt="..."
                className="n-logo"
                src={require('../../assets/img/now-logo.png')}
              ></img>
              <h1 className="h1-seo"> Your Movie List </h1>
              <h3>Make a list of all the movie you want to see</h3>
              <Button onClick ={()=> routeChange('signup')} className="btn-round" color="info" size="lg"> Sign Up Now </Button>
            </div>
          </Container>
        </div>
        <DarkFooter routeChange={routeChange}/>
      </div>
    </>
  );
}

export default HomePage;
