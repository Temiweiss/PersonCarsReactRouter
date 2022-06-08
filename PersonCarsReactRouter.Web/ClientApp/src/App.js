import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './Layout';
import PeopleTable from './PeopleTable';
import AddPerson from './AddPerson';
import AddCar from './AddCar';
import DeleteCars from './DeleteCars';

const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PeopleTable} />
            <Route exact path='/addperson' component={AddPerson} />
            <Route exact path='/addcar/:id' component={AddCar} />
            <Route exact path='/deletecars/:id' component={DeleteCars} />
        </Layout >
    )
}

export default App;