import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as bikeService from '../../services/bikeService';

class BikeList extends Component {

	constructor() {
	    super();
	    this.state = {
	      bikes: [],
	      isFetching: false
	    };
	    this.fetch = this.fetch.bind(this);
	    this.deleteBike=this.deleteBike.bind(this);
	    this.eachBikes=this.eachBikes.bind(this);
	 }

	 componentDidMount() {
	 	this.fetch();

	 }

	fetch() {
		this.setState({isFetching: true});
	    bikeService.fetchBikes().then((response) => {
	      this.setState({bikes: response.data.data, isFetching: false});
	    }).catch((err) => {
	      console.log(err.message);
	    });
	}

	deleteBike(id) {
		console.log('delete');
		bikeService.removeBike(id).then(() => {
			this.fetch();
		}).catch((err) => {
	        console.log(err.message);
	      });
	}

	eachBikes(bike, index) {
		return (
			<li className="list-item" key={index} index={index}>
				<Link to={`/${bike.id}/update`}>
					{bike.manufacturer} {bike.model} {bike.horsepower}
				</Link>
				<span onClick={() => {this.deleteBike(bike.id)}} className="glyphicon glyphicon-remove pull-right"></span> 
			</li>
		);
	}

	render() {
	    return (
	    	<div>
		    	{this.state.isFetching ?
			        <div className="spinner center"></div>
			        :
				    <ul className="bike-list">
					      	<li className='list-title'>
					      	List of bikes
					      	</li>
					      	{this.state.bikes.map(this.eachBikes)}
					</ul>
			    }
		    </div>	      
	    );
	}


}

export default BikeList;
