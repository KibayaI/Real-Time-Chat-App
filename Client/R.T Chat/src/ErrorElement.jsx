import React from "react";
import { Link } from "react-router-dom";
import "./styles/globalStyles.css"

function ErrorElement({ ErrorMessage }) {
  return (
    <div className="entry">
      <div>
        <h2 className="error">{ErrorMessage}</h2>

        <div style={{textAlign: "center"}}>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}
export default ErrorElement;
