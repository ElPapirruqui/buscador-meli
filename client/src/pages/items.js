import React, { Component } from "react";
import Search from "../components/search/search";
import Breadcrum from "../components/breadcrum/breadcrum";
import ListItems from "../components/listItems/listItems";

class Items extends Component {
  state = { data: [], loading: true, categories: [] };

  getItems = async query => {
    this.setState({
      loading: true
    });

    const response = await fetch(`http://localhost:5000/api/items?q=${query}`);
    const data = await response.json();
    this.setState({
      data: data.items,
      categories: data.categories,
      loading: false
    });
  };

  onSearch = query => {
    this.getItems(query);
  };

  render() {
    return (
      <div>
        <Search onSearch={this.onSearch} />
        {!this.state.loading ? (
          <div>
            <Breadcrum filters={this.state.categories} />
            <ListItems items={this.state.data} />
          </div>
        ) : (
          <div className="ml-loading"></div>
        )}
      </div>
    );
  }
}

export default Items;
