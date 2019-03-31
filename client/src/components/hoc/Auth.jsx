import React, { Component } from 'react';
import {connect} from 'react-redux';
import {auth} from '../../actions/userActions.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const circStyles = { color: '#2196F3' }

export default (ComposedClass, reroute, adminRoute=null) => {
    class AuthCheck extends Component {

        state = {loading:true}

        componentDidMount() {
            const {history} = this.props;
            this.props
                .dispatch(auth())
                .then(res => {
                    let user = this.props.user.userData
                    if (!user.isAuth) {
                        if (reroute) history.push('/register_login')
                    } else {
                        if (adminRoute && !user.isAdmin) {
                            history.push('/user/dashboard')
                        } else {
                            if (reroute === false) history.push('/user/dashboard')
                        }
                    }
                    this.setState({loading:false})
                })
        }


        render() {
            if (this.state.loading) {
                return (
                    <div className='main_loader'>
                        <CircularProgress   style={circStyles}
                                            thickness={7}/>
                    </div>
                )
            }
            return (
                <ComposedClass  {...this.props}
                                user={this.props.user}/>
            );
        }
    }

    // const mapStateToProps = (state, props) => ({
    const mapStateToProps = state => ({
        user: state.user
    });

    return connect(mapStateToProps)(AuthCheck)
}
// import AuthCheck from './AuthCheck.jsx';



