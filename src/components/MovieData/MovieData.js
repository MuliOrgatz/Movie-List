import React from 'react';
import animateScrollTo from 'animated-scroll-to';
import {
    Container,Row
  } from "reactstrap";


const MovieData =({movieTitle,movieTable}) =>{

    return(
        <div className="section section-team text-center" >
          <Container>  
            <h2 className="title">{`Result for "${movieTitle}"`} </h2>
              <Row>
              
                {movieTable}
                {animateScrollTo(600)}
              </Row>
              
          </Container>
        </div>
    );
}

export default MovieData;