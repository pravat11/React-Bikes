import React, { Component } from 'react';
import AddButton from './addButton'
import BikeList from './bikeList'

class Home extends Component {

  render() {
    return (
      <div id="container">
        <h1>Bikes Logger</h1>
        <AddButton />
        <BikeList />
      </div>
    );
  }

}

export default Home;
