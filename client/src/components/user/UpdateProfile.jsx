import React from 'react';
import DashboardNav from '../hoc/DashboardNav.jsx';
import UpdatePersonalInfo from './UpdatePersonalInfo.jsx';

const UpdateProfile = () => {

    return (
        <DashboardNav>
            <h1>Profile</h1>
            <UpdatePersonalInfo/>
        </DashboardNav>
    );
};

export default UpdateProfile;