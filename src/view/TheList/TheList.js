import React,{Component} from "react";
import TrasparentFooter from '../../components/Footers/TransparentFooter.js';


import './TheList.css';

// reactstrap components
import { Container, 
    Row,
    Col,
    Table ,
    NavItem,
    NavLink,
    Nav,
    Card,
    CardHeader,
    CardBody,
    TabContent,
    TabPane } from "reactstrap";

// core components

class TheList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plainTabs:'1',
    }
}

  componentDidMount(){
    this.props.buildList('All');
    this.props.buildList('Watched');
    this.props.buildList('Want to watch');
    document.body.classList.add("list-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

    
   /* if (window.innerWidth > 991) {
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
    componentWillUnmount() {
      document.body.classList.remove("list-page");
      document.body.classList.remove("sidebar-collapse");
    }

  render(){
    const {plainTabs} = this.state;
    const {tableValue,tableWanto,tableWatched}= this.props;
  return (
    <>
    <div className="wrapper">
      <div className="section section-contact-us text-center">
        <Container>
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h2 className="title">Your List</h2>
            <h5 className="description">
              You can see here all the movie that you entered, 
              and change the status of them from "WANT TO WATCH" to "WATCHED".
            </h5>
          </Col>
        </Row>
        <Card className="card-nav-tabs card-plain">
          <CardHeader className="card-header-danger">
          <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
              <Nav data-tabs="tabs" tabs>
                  <NavItem>
                  <NavLink 
                      className={plainTabs === "1" ? "active" : ""}
                      onClick={e => {
                      e.preventDefault();
                      this.setState({plainTabs:'1'});
                      }}
                      style={{cursor:'pointer'}}
                  >
 
                     <h6 >All</h6>
                  </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink
                      className={plainTabs === "2" ? "active" : ""}
                      onClick={e => {
                      e.preventDefault();
                      this.setState({plainTabs:'2'});
                      }}
                      style={{cursor:'pointer'}}
                  >
                      <h6 >Want to watch</h6>
                  </NavLink>
                  </NavItem>
                  <NavItem>
                  <NavLink
                      className={plainTabs === "3" ? "active" : ""}
                      onClick={e => {
                      e.preventDefault();
                      this.setState({plainTabs:'3'});
                      }}
                      style={{cursor:'pointer'}}
                  >
                      <h6 >Watched</h6>
                  </NavLink>
                  </NavItem>
              </Nav>
              </div>
          </div>
          </CardHeader>
          <CardBody>
          <TabContent
            className="text-center"
            activeTab={"plainTabs" + plainTabs}
          >
              <TabPane tabId="plainTabs1">
              <Table responsive>
                <thead className="fit">
                <tr>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Watched?</th>
                  <th>Yes|No</th> 
                  <th>Date Added</th>
                  <th>Remove</th>
                </tr>
                </thead>
                <tbody className="text-center fit">
                  {tableValue.length > 0 ? tableValue :null}
                </tbody>
              </Table>
              </TabPane>
              <TabPane tabId="plainTabs2">
              <Table responsive >
                <thead className="fit">
                <tr>
                  <th>Poster</th>
                  <th>Title</th>
                  <th>Watched?</th>
                  <th>Yes|No</th> 
                  <th>Date Added</th>
                  <th>Remove</th>
                </tr>
                </thead>
                <tbody className="text-center fit">
                {tableWanto}
                </tbody>
              </Table>
              </TabPane>
              <TabPane tabId="plainTabs3">
              <Table responsive >
                  <thead className="fit">
                  <tr>
                      <th>Poster</th>
                      <th>Title</th>
                      <th>Watched?</th>
                      <th>Yes|No</th> 
                      <th>Date Added</th>
                      <th>Remove</th>
                  </tr>
                  </thead>
                  <tbody className="text-center fit">
                  {tableWatched}
                  </tbody>
              </Table>
              </TabPane>
          </TabContent>
          </CardBody>
        </Card>
      </Container>
      </div>
      <TrasparentFooter routeChange={this.props.routeChange}/>
      </div>
    </>
  );
  }
}


export default TheList;
