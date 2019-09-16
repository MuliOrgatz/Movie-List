import React from "react";
import './SearchMovie.css';
// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components


const SearchMovie = ({inputChange, buttonSearchPress}) => {
    let pageHeader = React.createRef();
    const [firstFocus, setFirstFocus] = React.useState(false);

    React.useEffect(() => {
    document.body.classList.add("movie-search");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    document.body.scrollTop = 0;
    
    /*if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }*/
    return function cleanup() {
      document.body.classList.remove("movie-search");
      document.body.classList.remove("sidebar-collapse");}
    });


  return (
    <>
      <div className="page-header page-header-small" >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require('../../assets/img/bg10.jpg') + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container >
            <h1 className="title big" >Let's build your movie list</h1>
            <img
                alt="..."
                className="n-logo"
                width="150"
                src={require('../../assets/img/download.png')}
            ></img>
          </Container>
        </div>
      </div>
      <div className="section section-contact-us text-center">
      <Container>
        <h2 id = "modal02" className="title">Search for the movie you want to add to your list</h2>
        <p className="description">Enter the title of the movie</p>
        <Col className="text-center ml-auto mr-auto" lg="6" md="8">
        <InputGroup
          className={
            "input-lg" + (firstFocus ? " input-group-focus" : "")
          }
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="now-ui-icons ui-1_zoom-bold"></i>
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Title"
            type="text"
            onFocus={() => setFirstFocus(true)}
            onBlur={() => setFirstFocus(false)}
            onChange={inputChange}
          ></Input>
        </InputGroup>
          <div className="send-button">
            <Button
              block 
              className="btn-round"
              color="info"
              size="lg"
              onClick={buttonSearchPress}
            >
              Search
            </Button>
          </div>
        </Col>
      </Container>
      </div>
    </>
  );
}

export default SearchMovie;