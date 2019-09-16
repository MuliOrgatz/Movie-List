import React, {Component} from 'react';
import SearchMovie from './view/SearchMovie/SearchMovie.js';
import './App.css';
import swal from 'sweetalert';
import HomePage from './view/HomePage/HomePage.js';
import SignUP from './view/SignUp/SignUp.js';
import LoginPage from './view/LoginPage/LoginPage.js';
import IndexNavBar from './components/Navbars/IndexNavbar.js';
import SignedNavBar from './components/Navbars/SignedNavbar.js';
import MovieData from './components/MovieData/MovieData.js';
import MovieTable from './components/MovieData/MovieTable.js';
import TheList from './view/TheList/TheList';
import ColorNavBar from './components/Navbars/ColorNavbar.js';
import SignNavBar from './components/Navbars/SignNavBar.js';
import SignUpNavBar from './components/Navbars/SignUpNavBar.js';
import MovieList from "./components/MovieData/MovieList.js";
import HowItWork from './view/HowItWork/HowItWork.js';
import AboutMe from './view/AboutMe/AboutMe.js';


const initialState = {
  input:'',
  route:'home',
  movieTitle:'',
  isSearch:false,
  results:[],
  movieTable:[],
  tableValue:[],
  tableWanto:[],
  tableWatched:[],
  currentUserConnect:'',
  user:{
    id:'',
    firstName:'',
    lastName:'',
    email:'',
    gener:'',
    joined:'',
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  buildList = (status) =>{
    fetch('https://calm-sierra-48939.herokuapp.com/getList',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        userid:this.state.currentUserConnect,
        status:status
      })
    })
    .then(response => response.json())
    .then(list=>{
      if(list){
        let listRows = []
        list.forEach((movie) => {
          const listRow = <MovieList 
            key={movie.movieid} 
            movie={movie} 
            currentUserConnect={this.state.currentUserConnect} 
            buildList={this.buildList}
          />
          listRows.push(listRow)
        })
        if(status === 'All'){
          this.setState({tableValue: ''})
          this.setState({tableValue: listRows})
        }else if (status === 'Want to watch'){
          this.setState({tableWanto: listRows})
        }else {
          this.setState({tableWatched: listRows})
        }
        
      }else{
        console.log('not good')
      }  
    })
  }

  handelData = (data) =>{
    let len = data.length; 
    this.setState({results: []}) 
    for (let i = 0; i < len; i++) {
        this.state.results.push({
          imageUrl: data[i].poster_path,
          title: data[i].title,
          releaseDate: data[i].release_date,
          id:data[i].id
        });
    }
    let movieRows = []
    const {currentUserConnect} = this.state;
    this.state.results.forEach((movie) => {
      const movieRow = <MovieTable 
        key={movie.id} 
        movie={movie} 
        currentUserConnect={currentUserConnect} 
        buildList={this.buildList}
        addMassage={this.addMassage}  
      />
      movieRows.push(movieRow)
    })
    this.setState({movieTable: movieRows})
  }


  inputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      gener:data.gener,
      joined:data.joined,
    }})
  }

  updateCurrentUser = (userId) =>{
    this.setState({currentUserConnect:userId});
  }

  routeChange = (route) => {
    if (route === 'home')
      {
        this.setState(initialState)
      } 
    this.setState({route:route})
    
  }

  buttonSearchPress = () =>{
    this.setState({movieTable:''})
    this.setState({isSearch:true});
    this.setState({movieTitle:this.state.input})
    if(this.state.input){
      fetch('https://calm-sierra-48939.herokuapp.com/movieSearch',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            input: this.state.input
          })
      })
      .then(data => data.json())
      .then(data =>{
        if(data){
          this.handelData(data.results);
        }
      })
    }else{
      swal({title: "Please enter a title", icon: "warning"});
    }
  }    
  
  

  render() {
    const {route, isSearch, movieTitle,movieTable,results,tableValue,tableWanto,tableWatched} = this.state;
    return(
    <div className="App">
      { route ==='home' ?
      <div>
        <IndexNavBar routeChange={this.routeChange}/>
        <HomePage routeChange={this.routeChange}/>
      </div>
      :route ==='signup' ?
      <div>
        <SignUpNavBar routeChange={this.routeChange}/>
        <SignUP loadUser={this.loadUser} routeChange={this.routeChange} />
      </div>
      :route ==='login' ?
      <div>
        <SignNavBar routeChange={this.routeChange}/>
        <LoginPage routeChange={this.routeChange} updateCurrentUser={this.updateCurrentUser}/>
      </div> 
      : route ==='search-page' ?
      <div>
        <SignedNavBar routeChange={this.routeChange}/>
        <SearchMovie 
        inputChange ={this.inputChange} 
        buttonSearchPress = {this.buttonSearchPress}
        />
        { isSearch ?
          <MovieData movieTitle={movieTitle} movieTable= {movieTable} />
          :<div></div>
        }
      </div>
      : route ==='howwork' ?
      <div>
        <IndexNavBar routeChange={this.routeChange}/>
        <HowItWork routeChange={this.routeChange}/>
      </div>
      : route ==='aboutme' ?
      <div>
        <IndexNavBar routeChange={this.routeChange}/>
        <AboutMe routeChange={this.routeChange}/>
      </div>
      :
      <div>
        <ColorNavBar routeChange={this.routeChange} />
        <TheList 
        results={results} 
        tableValue={tableValue} 
        buildList={this.buildList} 
        tableWanto={tableWanto}
        tableWatched={tableWatched}
        routeChange={this.routeChange}
        />
      </div>
      }    
    </div>
    );
  }
}

export default App;
