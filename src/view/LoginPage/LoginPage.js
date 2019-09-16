import React, {Component} from "react";
import EmailValidator from 'email-validator';

import {
  Button,Alert ,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col
} from "reactstrap";

// core components
import TransparentFooter from '../../components/Footers/TransparentFooter.js';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstFocus: false,
      lastFocus: false,
      signInEmail:'',
      signInpassword:'',
      emailIsValid:false,
      alartStack:'',
    };
  }

  componentDidMount(){
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;     
  }

  componentWillUnmount() {
    document.body.classList.remove("login-page");
    document.body.classList.remove("sidebar-collapse");
  }

  emailChange =(event) =>{
    this.setState({signInEmail:event.target.value})
  }

  passwordChange =(event) =>{
    this.setState({signInpassword:event.target.value})
  }

  signInButtonPress = () =>{
    if(this.state.emailIsValid)
    {
      fetch('https://whispering-shelf-53305.herokuapp.com/signin',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:this.state.signInEmail,
          password: this.state.signInpassword
        })
      })
      .then(response => response.json())
      .then(user=>{
        if(user.id){
          this.props.updateCurrentUser(user.id);
          this.props.routeChange('search-page'); 
        }else{this.setState({alartStack:<Alert color="danger">
        Wrong Email or Password
        </Alert>})    
        }
      })
    }
  }

   isValidEmailAddress = () => {
     const {signInEmail} = this.state;
     if(!EmailValidator.validate(signInEmail))
     {
      this.setState({alartStack:<Alert color="danger">
      Please Enter a valid Email Address.
      </Alert>})
      return false;
     }
     else{
      this.setState({alartStack:''})
      return true;
     }
  }

  render(){
    const {firstFocus, lastFocus} = this.state;
    return (
      <>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require('../../assets/img/login.jpg') + ")"
            }}
          ></div>
          <div className="content-center brand">
            <Container>
              <Col className="ml-auto mr-auto" md="5">
                <Card className="card-login card-plain">
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      <div className="logo-container">
                        <img
                          alt="..."
                          src={require('../../assets/img/now-logo.png')}
                        ></img>
                      </div>
                    </CardHeader>
                    <CardBody>
                    {this.state.alartStack}
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (firstFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="text"
                          onFocus={() => this.setState({firstFocus:true})}
                          onChange={this.emailChange}
                          onBlur={() => this.setState({firstFocus:false, emailIsValid: this.isValidEmailAddress()})}
                        ></Input>
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border input-lg" +
                          (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          onFocus={() => this.setState({lastFocus:true})}
                          onBlur={() => this.setState({lastFocus:false})}
                          onChange={this.passwordChange}
                        ></Input>
                      </InputGroup>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        block
                        onClick ={this.signInButtonPress}
                        className="btn-round"
                        color="info"
                        size="lg"
                      >
                        Sign In
                      </Button>
                      <div className="pull-left">
                        <h6 className="link" onClick={() => this.props.routeChange('signup')}>
                            Create Account
                        </h6>
                      </div>
                      <div className="pull-right">
                        <h6 className="link" onClick={e => e.preventDefault()}>
                            Need Help?
                        </h6>
                      </div>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>  
            </Container>
            </div>
          <TransparentFooter routeChange={this.props.routeChange}/>
        </div>
      </>
    );
  }
}

export default LoginPage;
