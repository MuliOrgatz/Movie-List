import React, {Component} from "react";
import swal from 'sweetalert';

import { Button } from 'reactstrap'

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            watch:this.props.movie.watched,
            answer:'NO',
        }
    }

    componentDidMount(){
        this.watchChack();
    }

    watchChack = () => {
        const {watch} = this.state;
        if(watch === false){
            this.setState({answer:'NO'})
        }else{
            this.setState({answer:'YES'})
        }
    }

    buttonYesPress = () =>{
        if(this.state.watch === false){
            fetch('https://calm-sierra-48939.herokuapp.com/watched',{
                method:'put',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                userid:this.props.currentUserConnect,
                movieid: this.props.movie.movieid,
                watched:true
                })
            }).then(res=>{
                if(res){
                    this.setState({watch:true});
                    this.watchChack();
                    this.props.buildList('All');
                    this.props.buildList('Want to watch');
                    this.props.buildList('Watched');
                }
            })
            
        }
    }

    buttonNoPress = () =>{
        if(this.state.watch === true){
            fetch('https://calm-sierra-48939.herokuapp.com/watched',{
                method:'put',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                userid:this.props.currentUserConnect,
                movieid: this.props.movie.movieid,
                watched:false
                })
            }).then(res=>{
                if(res){
                    this.setState({watch:false});
                    this.watchChack(this.props.movie.movieid);
                    this.props.buildList('All');
                    this.props.buildList('Want to watch');
                    this.props.buildList('Watched');
                }
            })
  
        }
    }

    buttonRemovePress = () =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will forget if you see this movie or not",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch('https://calm-sierra-48939.herokuapp.com/removeMovie',{
                method:'delete',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                userid:this.props.currentUserConnect,
                movieid: this.props.movie.movieid,
                })
            }).then(res=>{
                if(res){
                    this.props.buildList('All');
                    this.props.buildList('Watched');
                    this.props.buildList('Want to watch');
                }
            })
            swal(`"${this.props.movie.title}" Deleted successfully`, {
                icon: "success",
            });
            } else {
              swal("You made the right choice");
            }
          });
        
    }

    render(){
        const {movie} = this.props;
        const {answer} = this.state;
        return(
        <tr >
            <td><img
            alt="..."
            width="120"
            src ={movie.posterurl}
            ></img>
            </td>
            <td>{`${movie.title}`}</td>
            <td>{answer}</td>
            <td>
                <Button color="success" onClick={this.buttonYesPress}>
                    <i className="now-ui-icons ui-1_check"></i>
                </Button> 
                <Button color="danger" onClick={this.buttonNoPress}>
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                </Button> 
            </td>
            <td>{`${movie.joined}`}</td>
            <td> 
                <Button color="danger" onClick={this.buttonRemovePress}>
                    <i className="now-ui-icons objects_spaceship"></i>
                </Button>
            </td>
        </tr>
        );
    }
}

export default MovieList;