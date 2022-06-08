import React from 'react';
import axios from 'axios';

class AddPerson extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onAddClick = async () => {
        await axios.post('/api/people/addperson', this.state.person);
        this.props.history.push('/');
    }



    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    //componentDidMount = async () => {
    //    const { id } = this.props.match.params;
    //    const { data } = await axios.get(`/api/people/getbyid?id=${id}`);
    //    this.setState({ person: data });
    //}

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <input type="text" name='firstName' onChange={this.onTextChange} className="form-control" placeholder="First Name" />
                    <br />
                    <input type="text" name='lastName' onChange={this.onTextChange} className="form-control" placeholder="Last Name" />
                    <br />
                    <input type="text" name='age' onChange={this.onTextChange} className="form-control" placeholder="Age" />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add</button>
                </div>
            </div>
        )
    }
}

export default AddPerson;