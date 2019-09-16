import React,{Component} from "react";
import EmailValidator from 'email-validator';

import {
  Button,
  Card,
  Badge,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  CardTitle
} from "reactstrap";

// core components
import TransparentFooter from '../../components/Footers/TransparentFooter.js';

const initialState = {
  firstFocus: false,
  lastFocus: false,
  emailFocus:false,
  passwordFocus:false,
  selectFocus:false,
  regEmail:'',
  regPassword:'',
  firstName:'',
  lastName:'',
  gener:'',
  erorFirst:'',
  erorLast:'',
  erorEmail:'',
  erorPassword:'',
  errorGener:'',
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  emailChange =(event) =>{
    this.setState({regEmail:event.target.value})
  }

  passwordChange =(event) =>{
    this.setState({regPassword:event.target.value})
  }

  firstNameChange =(event) =>{
    this.setState({firstName:event.target.value})
  }

  lastNameChange =(event) =>{
    this.setState({lastName:event.target.value})
  }

  selectChange =(event) =>{
    this.setState({gener:event.target.value})
  }

  componentDidMount(){
    document.body.classList.add("signup-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    document.body.scrollTop = 0;
  }

  filedValidtion = () =>{
    let erorMesFirst = "";
    let erorMesLast = "";
    let erorMesPassword = "";
    let erorMesEmail = "";
    let erorMesGener = "";
    var hasNumber = /\d/;
    const {firstName, lastName, regPassword, regEmail,gener} = this.state;

    if(!firstName){
      erorMesFirst = "First name cannot be blank";
    } else if(hasNumber.test(firstName)){
      erorMesFirst = "Letters only";
    }

    if(!lastName){
      erorMesLast = "Last name cannot be blank";
    } else if(hasNumber.test(lastName)){
      erorMesLast = "Letters only";
    }

    if(!regPassword){
      erorMesPassword = "Password cannot be blank";
    }
    else if(regPassword.length < 6){
      erorMesPassword = "Password must contain at least 6 characters";
    }

    if(!EmailValidator.validate(regEmail)){
      erorMesEmail="Email is not Valid"
    }

    if(!gener){
      erorMesGener = "Please Choose a gener";
    }

    if (erorMesFirst || erorMesLast || erorMesPassword || erorMesEmail || erorMesGener) {
      this.setState({ erorFirst:erorMesFirst, erorLast:erorMesLast, 
        erorPassword:erorMesPassword, erorEmail:erorMesEmail, erorGener:erorMesGener});
      return false;
    }

    return true;
  }

  getStartedButtonPress = () =>{
    const isValid = this.filedValidtion();
    if(isValid){
      fetch('http://localhost:3001/register',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          email:this.state.regEmail,
          password: this.state.regPassword,
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          gener:this.state.gener,
        })
      })
      .then(response => response.json())
      .then(user=>{
        if(user.id){
          this.props.loadUser(user);
          this.props.routeChange('login');
        }else if(user === 'unable to register'){
            this.setState({erorEmail:'Email address already exists'})
        }
      })

      this.setState(initialState);
    }
  }

  componentWillUnmount() { 
    document.body.classList.remove("signup-page");
    document.body.classList.remove("sidebar-collapse");
}

  render(){
    const {erorFirst,erorLast,erorEmail,erorGener,erorPassword, firstFocus, lastFocus,emailFocus,passwordFocus,selectFocus} = this.state;
  return (
      <>
        <div className="page-header clear-filter" filter-color="blue">
          <div
            className="page-header-image"
            style={{
              backgroundImage: "url(" + require('../../assets/img/bg11.jpg') + ")"
            }}
          ></div>
          <div className="content-center">
            <Container>
              <Row>
                <Card className="card-signup" data-background-color="blue">
                  <Form action="" className="form" method="">
                    <CardHeader className="text-center">
                      <CardTitle className="title-up" tag="h2">
                        Sign Up
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                    {erorFirst? <Badge color="danger">{erorFirst}</Badge>: ""}
                      <InputGroup
                        className={
                          "no-border" + (firstFocus ? " input-group-focus" : "")
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
                          onFocus={() => this.setState({firstFocus:true})}
                          onBlur={() => this.setState({firstFocus:false})}
                          onChange={this.firstNameChange}
                        ></Input>
                      </InputGroup>
                      {erorLast? <Badge color="danger">{erorLast}</Badge>: ""}
                      <InputGroup
                        className={
                          "no-border" + (lastFocus ? " input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Last Name..."
                          type="text"
                          onFocus={() => this.setState({lastFocus:true})}
                          onBlur={() => this.setState({lastFocus:false})}
                          onChange={this.lastNameChange}
                        ></Input>
                      </InputGroup>
                      {erorEmail? <Badge color="danger">{erorEmail}</Badge>: ""}
                      <InputGroup
                        className={
                          "no-border" + (emailFocus ? " input-group-focus" : "")
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
                          onFocus={() => this.setState({emailFocus:true})}
                          onBlur={() => this.setState({emailFocus:false})}
                          onChange={this.emailChange}
                        ></Input>
                      </InputGroup>
                      {erorPassword? <Badge color="danger">{erorPassword}</Badge>: ""}
                      <InputGroup
                        className={
                          "no-border" + (passwordFocus ? " input-group-focus" : "")
                        }
                      >
                      <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons objects_diamond"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={"Password..."}
                          type="password"
                          onFocus={() => this.setState({passwordFocus:true})}
                          onBlur={() => this.setState({passwordFocus:false})}
                          onChange={this.passwordChange}
                        ></Input>
                      </InputGroup>
                      <div>                  
                        <FormGroup >
                        <label className="" htmlFor="gener">Choose your favorite genre</label>
                        <Input className={
                          "no-border" + (selectFocus ? " input-group-focus" : "")
                        } style={{background: "#1aa3ff"}} id="gener" type="select" 
                        onFocus={() => this.setState({selectFocus:true})}
                        onBlur={() => this.setState({selectFocus:false})}
                        onChange={this.selectChange}
                        >
                          <option>Choose One</option>
                          <option>Action/Crime</option>
                          <option>Comedy</option>
                          <option>Sci-Fi</option>
                          <option>Horror</option>
                          <option>Drama</option>
                        </Input>
                      </FormGroup>
                      {erorGener? <Badge color="danger">{erorGener}</Badge>: ""}
                      </div> 
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-neutral btn-round"
                        color="info"
                        onClick ={this.getStartedButtonPress}
                        size="lg"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Row>
            </Container>
          </div>
          <TransparentFooter routeChange={this.props.routeChange}/>
        </div>
      </>
    );
  }
}

export default SignUp;
