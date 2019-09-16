/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter({routeChange}) {
  return (
    <footer className="footer">
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

export default TransparentFooter;
