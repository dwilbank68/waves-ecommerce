import React, { Component } from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

class CollapsedRadio extends Component {

    state = {open: false, value: '0'}

    componentDidMount() {
        if (this.props.initState) {
            this.setState({open: this.props.initState})
        }
    }

    handleAngle = () => {
        let dir = this.state.open ? faAngleUp : faAngleDown;
        return <FontAwesomeIcon className='icon' icon={dir}/>
    }

    handleChange = (e) => {
        this.props.handleFilters(e.target.value)
        this.setState({value: e.target.value})
    }

    handleClick = () => {
        this.setState({open: !this.state.open})
    }
    
    renderList = () => (
        this.props.list && this.props.list.map(val => (
            <FormControlLabel   key={val._id}
                                value={`${val._id}`}
                                control={<Radio/>}
                                label={val.name}/>
        ))
    )
    
    
    render() {
        return (
            <div    className="">
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
                            <RadioGroup aria-label='prices'
                                        name='prices'
                                        value={this.state.value}
                                        onChange={this.handleChange}>
                                {this.renderList()}
                            </RadioGroup>
                        </List>

                    </Collapse>
                </List>
            </div>
        );
    }
}

// CollapsedRadio.defaultProps = {};
// CollapsedRadio.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// CollapsedRadio.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default CollapsedRadio;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')
    
// }

///////////////////////////////////// BACKGROUND IMAGE /////////////////////////////////////

// import Foo from './images/foo.png';

// style={{background:`white url(${Foo})`}}


///////////////////////////////////// REACT-REVEAL EFFECT /////////////////////////////////////

// import Fade from 'react-reveal/Fade.js';
// import Slide from 'react-reveal/Slide.js';
// import Zoom from 'react-reveal/Zoom.js';

// <Fade delay={500}>...</Fade>
// <Slide left delay={1000}>...</Slide
// <Zoom delay={foo.delay}>...</Zoom>
