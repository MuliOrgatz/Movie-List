import React from "react";
import EmailValidator from 'email-validator';
import swal from 'sweetalert';
import DefaultFooter from '../../components/Footers/DefaultFooter.js'

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";


function LandingPage({routeChange}) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [erorFirst, setErorFirst] = React.useState('');
  const [erorEmail, setErorEmail] = React.useState('');
  const [erorMesBody, setErorMesBody] = React.useState('');

  function filedValidtion (){
    let erorMesFirst = "";
    let erorMesEmail = "";
    let erorMesBody = "";
    var hasNumber = /\d/;

    if(!firstName){
      erorMesFirst = "First name cannot be blank";
    } else if(hasNumber.test(firstName)){
      erorMesFirst = "Letters only";
    }

    if(!message){
        erorMesBody = "Message cannot be blank";
    } 

    if(!EmailValidator.validate(email)){
      erorMesEmail="Email is not Valid"
    }

    if (erorMesFirst || erorMesBody || erorMesEmail) {
        setErorFirst(erorMesFirst);
        setErorEmail(erorMesEmail); 
        setErorMesBody(erorMesBody);
        return false;
    }
    return true;
  }

  function sendClick(){
    const isValid = filedValidtion();
    if(isValid){
      fetch('https://calm-sierra-48939.herokuapp.com/sendMessage',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:email,
          firstname:firstName,
          messagebody:message
        })
      })
      .then(response => response.json())
      .then(res=>{
        if(res === 'added successfully'){  
            swal(`Message successfully sent`, {
                icon: "success",
            });
        }if(res === 'Your message already sent'){
            swal("Oops!", "Your message already sent", "error");
        }
      })
    }
  }

  let pageHeader = React.createRef();
  React.useEffect(() => {
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
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <div className="wrapper">
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/bg33.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container >
            <img
                alt="..."
                className="n-logo"
                width="150"
                src={require('../../assets/img/download.png')}
            ></img>
          </Container>
        </div>
      </div>
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h1 className="title">Take your first step into...</h1>
                <h5>
                 <u> <b style={{cursor:'pointer'}} onClick={() => {routeChange('login')}}>Sign in</b></u> or 
                 <u> <b style={{cursor:'pointer'}} onClick={() => {routeChange('signup')}}>register</b></u> to get started. 
                  We’re your home for logging, rating and reviewing films, 
                  your watchlist of titles to see, your source for lists and inspiration, 
                  a cast and crew database and an activity stream of passionate film criticism, discussion and discovery.  
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
            <h2>How MovieList works</h2>
              <Row>
                <Col md="5">
                <h3>
                    Tell us what movie you would like to see or already saw
                  </h3>
                  <h5>
                  Search for the movies you want to see or have already seen 
                  by entering the movie title into the search bar, then select the movie 
                  by clicking "Add Movie to List" or by clicking the movie image,
                  We will add all the movies you click on to <b>Your List</b> tab
                  </h5> 
                
                </Col>
                <Col md="6">
                <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/search.jpeg") + ")"
                    }}
                  ></div>
                </Col>
              </Row>
            </div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("../../assets/img/list.jpeg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                    <h3>
                    Manage your list
                    </h3>
                    <h5>
                    After adding the movies, you can edit your list - delete movies from the list, 
                    update if you've seen the movie, watch the list of movies you've watched 
                    and a list of the movies you haven't watched yet, Plus list of all the movies.
                    </h5> 
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Think something needs to be improved?</h2>
            <h5 className="description">Send me a message and I'll try to improve it</h5>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
              {erorFirst? <Badge color="danger">{erorFirst}</Badge>: ""}
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    onChange={(event)=>setFirstName(event.target.value)}
                  ></Input>
                </InputGroup>
                {erorEmail? <Badge color="danger">{erorEmail}</Badge>: ""}
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                    onChange={(event)=>setEmail(event.target.value)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                {erorMesBody? <Badge color="danger">{erorMesBody}</Badge>: ""}
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                    onChange={(event)=>setMessage(event.target.value)}
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    size="lg"
                    onClick={()=>sendClick()}
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter routeChange={routeChange}/>
      </div>
    </>
  );
}

export default LandingPage;
