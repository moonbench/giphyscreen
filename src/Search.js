import React, { Component } from 'react';


/**
 * A simple search form that submits its value to a provided function
 */
class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      term: ""
    };
  }
  render(){
    return (
      <div className="search">
        <form onSubmit={(e) => {e.preventDefault(); this.props.queryFn(this.state.term)}}>
          <input type="text"
            name="search"
            placeholder="search"
            onChange={(e) => this.setState({term: e.target.value})} />
          {this.props.showButton &&
            <input type="submit" value="Search" />
          }
        </form>
      </div>
    );
  }
}

export default Search;
