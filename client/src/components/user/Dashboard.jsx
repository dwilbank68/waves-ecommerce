import React from 'react';

import DashboardNav from '../hoc/DashboardNav.jsx';
import Button from '../UI/Button.jsx';
import HistoryBlock from '../user/HistoryBlock.jsx';

// const Dashboard = (props) => {
const Dashboard = ({user, whatever2}) => {


    return (
        <DashboardNav>
            <div    className="user-dashboard">

                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastname}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <Button type='default'
                            title='Edit Account Info'
                            linkTo='user/user_profile'/>
                </div>

                {user.userData.history &&
                <div className="user_nfo_panel">
                    <h1>Purchases History</h1>
                    <div className="user_product_block_wrapper">
                        <HistoryBlock history={user.userData.history}/>
                    </div>
                </div>}

            </div>
        </DashboardNav>
    );
};

export default Dashboard;
