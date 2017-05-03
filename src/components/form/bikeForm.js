import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import * as bikeService from '../../services/bikeService';

class BikeForm extends Component {

	constructor() {
		super();
		this.state={
			bike: {
				manufacturer: '',
				model: '',
				horsepower: ''
			},
			isSubmittingBike: false
		};
		this.submitForm=this.submitForm.bind(this);
		this.handleInputChange=this.handleInputChange.bind(this);
	}

	componentDidMount() {
		let bikeId = this.props.match.params.bikeId;

		// Fetch data if on Update page
		if (bikeId) {
			bikeService.fetchBike(bikeId).then((response) => {
				let data = response.data.data;
				this.setState({
				  bike: {
				    manufacturer: data.manufacturer,
				    model: data.model,
				    horsepower: data.horsepower
				  }
				});
			}).catch((err) => {
				console.log(err.message)
			});
		}
	}

	goToListHomePage() {
		this.props.history.push('/');
	}

	handleInputChange(e) {
	    let name = e.target.name;
	    let value = e.target.value;
	    this.state.bike[name] = value;
	    this.setState({bike: this.state.bike});
	}

	submitForm(e) {
		e.preventDefault();
		this.setState({isSubmittingBike: true});
		let manufacturer=this.refs.manufacturer.value;
		let model=this.refs.model.value;
		let horsepower=this.refs.horsepower.value;
		if(!this.props.match.params.bikeId) {
			bikeService.addBike({
		        manufacturer: manufacturer,
		        model: model,
		        horsepower: horsepower
		      }).then((response) => {
		      	this.setState({isSubmittingBike: false});
		      	this.goToListHomePage()
		      }).catch((err) => {
		      	this.setState({isSubmittingBike: false});
		        console.log(err.message)
		    });
		}
		else {
			bikeService.updateBike(this.props.match.params.bikeId,{
		        manufacturer: manufacturer,
		        model: model,
		        horsepower: horsepower				
			}).then((response) => {
				this.setState({isSubmittingBike: false});
				this.goToListHomePage()
			}).catch((err) => {
				this.setState({isSubmittingBike: false});
				console.log(err.message);
			});
		}
	}

	render() {
		return (
		  <div id="container">
		    <h1>Bikes Logger</h1>
		    <h2>{this.props.match.params.bikeId ? 'Update' : 'Add'} bike</h2>
		    <form onSubmit={this.submitForm}>
		    	<div className="form-element">
		    		<label>Manufacturer</label>
		    		<input 
		    			ref="manufacturer" 
		    			name="manufacturer"
		    			type="text" 
		    			value={this.state.bike.manufacturer}
		    			onChange={this.handleInputChange}/>
		    	</div>
		    	<div className="form-element">
		    		<label>Model</label>
		    		<input 
		    			ref="model" 
		    			name="model"
		    			type="text" 
		    			value={this.state.bike.model}
		    			onChange={this.handleInputChange}/>
		    	</div>
		    	<div className="form-element">
		    		<label>Horsepower</label>
		    		<input 
		    			ref="horsepower" 
		    			type="text" 
		    			name="horsepower"
		    			value={this.state.bike.horsepower}
		    			onChange={this.handleInputChange}/>
		    	</div>
		    	<div className="form-buttons">
		    	<input type="submit" value={this.props.match.params.bikeId ? 'Update' : 'Add'} className="form-button"/>
		    	<button onClick={() => {this.goToListHomePage()}} type="button" className="form-button">Cancel</button>
		    	</div>
		    	{this.state.isSubmittingBike ? <div className="spinner center"></div> : null}
		    </form>
		  </div>
		);
	}

}

export default withRouter(BikeForm);
