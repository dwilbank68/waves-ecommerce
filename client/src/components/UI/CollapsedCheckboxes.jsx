import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CollapsedCheckboxes extends Component {

    state = {open: false, checked: []}

    componentDidMount() {
        if (this.props.initState) {
            this.setState({open: this.props.initState})
        }
    }

    handleAngle = () => {
        let dir = this.state.open ? faAngleUp : faAngleDown;
        return <FontAwesomeIcon className='icon' icon={dir}/>
    }

    handleClick = () => {
       this.setState({open: !this.state.open})
    }
    
    handleToggle = v => () => {
        const {checked} = this.state;
        const curIdx = checked.indexOf(v);
        const newChecked = [...checked];
        if (curIdx === -1) {
            newChecked.push(v);
        } else {
            newChecked.splice(curIdx, 1);
        }
        this.setState({checked: newChecked}, () => this.props.handleFilters(newChecked))
    }

    renderList = () => (
        this.props.list && this.props.list.map(v => (
            <ListItem key={v._id}
                      style={{padding:'10px 0'}}>
                <ListItemText primary={v.name}/>
                <ListItemSecondaryAction>
                    <Checkbox   color='primary'
                                onChange={this.handleToggle(v._id)}
                                checked={this.state.checked.indexOf(v._id) !== -1}/>
                </ListItemSecondaryAction>
            </ListItem>
        ))
    )
    
    
    render() {
        return (
            <div    className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem   onClick={this.handleClick}
                                style={{padding:'10px 23px 10px 0'}}>
                        <ListItemText   primary={this.props.title}
                                        className='collapse_title'/>
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse   in={this.state.open}
                                timeout='auto'
                                unmountOnExit>
                        <List component='div' disablePadding>
                            {this.renderList()}
                        </List>

                    </Collapse>
                </List>
            </div>
        );
    }
}

export default CollapsedCheckboxes;
