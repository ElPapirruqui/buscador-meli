import React from "react";
import "./breadcrum.css";

class Breadcrum extends React.Component {
  bcindex = 0;

  render() {
    return (
      <div className="ml-breadcrum ml-container">
        {this.props.filters && this.props.filters.length
          ? this.props.filters.map(item => {
              return (
                <span key={`bc-${this.bcindex++}`} className="ml-category">
                  {item}
                </span>
              );
            })
          : ""}
      </div>
    );
  }
}

export default Breadcrum;
