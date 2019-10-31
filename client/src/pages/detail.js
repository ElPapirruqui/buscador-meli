import React, { Component } from "react";
import Search from "../components/search/search";
import ItemDetail from "../components/itemDetail/itemDetail";

class Detail extends Component {
  render() {
    return (
      <div>
        <Search />
        <ItemDetail />
      </div>
    );
  }
}

export default Detail;
