import React from "react";
import { Link } from "react-router-dom";
import PersonRow from './PersonRow';
import axios from 'axios';

class PeopleTable extends React.Component {

    state = {
        people: [],
        searchText: ''
    };

    componentDidMount = async () => {
        await this.loadPeople();

    }

    loadPeople = async () => {
        const { data } = await axios.get('/api/people/getall');
        this.setState({ people: data });
    }

    onClearClick = async () => {
        this.loadPeople();
        this.setState({ searchText: '' });
    }

    onSearchTextChange = async (e) => {
        this.setState({ searchText: e.target.value });
        const { data } = await axios.get('/api/people/getall');
        this.setState({ people: data });

        const { people, searchText } = this.state;
        const peopleCopy = people.filter(p => p.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            p.lastName.toLowerCase().includes(searchText.toLowerCase()));
        this.setState({ people: peopleCopy });
    }

    render() {
        const { people, searchText } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <input type="text" className="form-control form-control-lg" value={searchText} onChange={this.onSearchTextChange}
                        placeholder="Search People"></input>
                    <button className="btn btn-info btn-block" onClick={this.onClearClick}>Clear Search</button>
                </div>
                <div className="row mt-5">
                    <Link to='/addperson'>
                        <button type="button" className="btn btn-primary btn-lg btn-block">Add Person</button>
                    </Link>
                </div>

                <div className="row">
                    <table className="table table-bordered table-hover table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Car Count</th>
                                <th>Add a Car</th>
                                <th>Delete Cars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map(p => <PersonRow
                                person={p}
                                key={p.id}

                            />)}
                        </tbody>

                    </table>
                </div>
            </div>
                )
    }
}

export default PeopleTable;