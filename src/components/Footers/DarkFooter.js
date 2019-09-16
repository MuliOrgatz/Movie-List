/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";
import { runInContext } from "vm";

function DarkFooter({routeChange}) {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <p
                style={{cursor:'pointer'}} onClick={()=>routeChange('aboutme')}
              >
                About Me
              </p>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Coded By Muli Orgatz.
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
