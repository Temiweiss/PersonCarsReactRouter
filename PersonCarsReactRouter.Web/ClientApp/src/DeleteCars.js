import React from "react";
import CarRow from './CarRow';
import axios from 'axios';

class DeleteCars extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
        },
        cars: [],
        car: {
            make: '',
            model: '',
            year: ''
        },
        searchText: ''
    };

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/getcars?id=${id}`);
        this.setState({ cars: data }); 
    }
    onNoClick = async () => {
        this.props.history.push('/');
    }

    onDeleteClick = async () => {
        const { id } = this.props.match.params;
        await axios.post(`/api/people/deletecars?id=${id}`);
        this.props.history.push('/');
    }

    onClearClick = async () => {
        this.setState({ searchText: '' });
    }

    onSearchTextChange = async (e) => {
        const { id } = this.props.match.params;
        this.setState({ searchText: e.target.value });
        const { data } = await axios.get(`/api/people/deletecars?id=${id}`);
        this.setState({ cars: data });

        const { cars, searchText } = this.state;
        const carsCopy = cars.filter(c => c.make.toLowerCase().includes(searchText.toLowerCase()) ||
            c.model.toLowerCase().includes(searchText.toLowerCase()) || c.year.includes(searchText));
        this.setState({ cars: carsCopy });
    }


    render() {
        const { cars, searchText } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <input type="text" className="form-control form-control-lg" value={searchText} onChange={this.onSearchTextChange}
                        placeholder="Search Cars"></input>
                    <button className="btn btn-info btn-block" onClick={this.onClearClick}>Clear Search</button>
                </div>
    

                <div className="row">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Make</th>
                                <th>Model</th>
                                <th>Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map(c => <CarRow
                                car={c}
                            />)}
                        </tbody>
                    </table>
                    <h1>Are you sure you want to delete all of these cars?</h1>
                    <div className='row'>
                        <button className='btn btn-lg btn-block btn-primary' onClick={this.onNoClick}>No</button>
                        <button className='btn btn-lg btn-block btn-danger' onClick={this.onDeleteClick}>Yes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteCars;