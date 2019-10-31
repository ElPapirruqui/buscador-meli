import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./search.css";
import melilogo from "../../images/Logo_ML.png";

class Search extends React.Component {
  state = {
    searchBox: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const query = this.getQueryFromUrl();
      if (query !== null && query !== "") {
        this.setState({
          searchBox: query || ""
        });
        if (this.props.onSearch) this.props.onSearch(query);
      }
    }
  }

  componentDidMount() {
    const query = this.getQueryFromUrl();
    if (query !== null && query !== "") {
      this.setState({
        searchBox: query || ""
      });
      this.updateUrl(query);
      if (this.props.onSearch) this.props.onSearch(query);
    }
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      const query = e.target.value;
      this.setState({
        [e.target.name]: query
      });
      this.updateUrl(query);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getQueryFromUrl = () => {
    const search = new URLSearchParams(this.props.location.search);
    const query = search.get("search");
    return query;
  };

  updateUrl = query => {
    if (typeof query !== "string") query = this.state.searchBox;
    this.props.history.push(`/items?search=${query}`);
  };

  render() {
    return (
      <div className="ml-bg-brand">
        <div className="ml-container ml-searchbox">
          <Link to="/">
            <img src={melilogo} alt="" />
          </Link>
          <input
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange}
            type="text"
            name="searchBox"
            value={this.state.searchBox}
          />
          <button onClick={this.searchItems}></button>
        </div>
      </div>
    );
  }
}

Search = withRouter(Search);

export default Search;
