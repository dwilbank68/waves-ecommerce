import React from 'react';

import DashboardNav from '../../hoc/DashboardNav.jsx';
import ManageBrands from './ManageBrands.jsx';
import ManageWoods from './ManageWoods.jsx';

const ManageCategories = () => {

    return (
        <DashboardNav>
            <ManageBrands/>
            <ManageWoods/>
        </DashboardNav>
    );
};

export default ManageCategories;
