import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import {getSiteDataAction} from "../../actions/siteActions";

class Layout extends Component {

    componentDidMount() {
        if (Object.keys(this.props.site).length !== 0) return;
        this.props.dispatch(getSiteDataAction());
    }


    render() {
        const {children, site} = this.props;
        return (
            <div>
                <Header/>
                <div    className="page_container">
                    {children}
                </div>
                <Footer data={site}/>
            </div>

        );
    }
}

// const mapStateToProps = (state, props) => ({
const mapStateToProps = state => ({
    site: state.site
});

export default connect(mapStateToProps)(Layout);

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
