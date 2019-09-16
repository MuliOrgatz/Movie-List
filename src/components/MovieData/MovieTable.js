import React,{Component} from 'react';
import './MovieData.css'
import swal from 'sweetalert';



import {
    Button,
    Col,
  } from "reactstrap";


  class MovieTable extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    onAddClick = () =>{
        fetch('https://calm-sierra-48939.herokuapp.com/addMovie',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            userid:this.props.currentUserConnect,
            movieid: this.props.movie.id,
            posterurl: `http://image.tmdb.org/t/p/w300/${this.props.movie.imageUrl}`,
            title:this.props.movie.title,
            datarelease:this.props.movie.releaseDate
            })
        }).then(res => res.json())
            .then(res=>{
            if(res === 'added successfully'){
                this.props.buildList('All');
                this.props.buildList('Want to watch');
                swal(`"${this.props.movie.title}"`, "Add successfully to your list", "success");
            }else{
                swal({title: "This movie is already on your list", icon: "warning"});
            }
        })
        
    }

    render(){
    const {movie} = this.props
    return (
        <Col md="4"> 
            <div className="team-player">
            <img
                alt="..."
                className="img-raised hight"
                src ={`http://image.tmdb.org/t/p/w300/${movie.imageUrl}`}
                onClick={this.onAddClick}
            ></img> 
            <h4 >{`${movie.title}`}</h4>   
            <p className="category text-info">{`${movie.releaseDate}`}</p>
            <Button
                className="btn-round"
                color="info"
                onClick = {this.onAddClick}
            >
                <i className="now-ui-icons ui-1_check"></i>
                Add To Watch List
            </Button>
            </div>
            
        </Col>
    );
  }
}

  export default MovieTable;