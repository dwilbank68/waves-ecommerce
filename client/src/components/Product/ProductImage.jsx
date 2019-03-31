import React, { Component } from 'react';

import ImageLightBox from '../UI/ImageLightBox.jsx';

class ProductImage extends Component {
    
    state = {
        lightboxOpen: false,
        imagePos: 0,
        lightboxImages: []
    }

    componentWillReceiveProps(props) {
        const {images} = props.product;
        if (images && images.length > 0) {
            let lightboxImages = [];
            images.forEach(i => {
                lightboxImages.push(i.url)
            })
            this.setState({lightboxImages})
        }
    }

    handleLightbox = (pos) => {
        if (this.state.lightboxImages.length > 0) {
            this.setState({
                lightbox: true,
                imagePos: pos
            })
        }
    }

    handleLightboxClose = () => {
        this.setState({
            lightbox: false
        })
    }

    renderCardImage = (images) => {
        if (images.length > 0) {
            return images[0].url
        } else {
            return `/images/image_not_available.png`
        }
    }

    showThumbs = () => (
        this.state.lightboxImages.map((img, i) => (
            i > 0 ?
                <div    key={i}
                        onClick={() => this.handleLightbox(i)}
                        className='thumb'
                        style={{background:`url(${img}) no-repeat`}}>

                </div>
            : null
        ))
    )

    render() {
        const {product} = this.props;
        const {imagePos, lightboxImages, open} = this.state;
        return product ? (
            <div    className="product_image_container">

                <div className="main_pic">
                    <div    style={{background:`url(${this.renderCardImage(product.images)}) no-repeat`}}
                            onClick={() => this.handleLightbox(0)}>
                    </div>
                </div>

                <div className="main_thumbs">
                    {this.showThumbs(product)}
                </div>
                {this.state.lightbox &&
                <ImageLightBox  id={product.id}
                                images={lightboxImages}
                                onClose={this.handleLightboxClose}
                                open={open}
                                pos={imagePos}/>}
            </div>
        ) : null;
    }
}

// ProductImage.defaultProps = {};
// ProductImage.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

// ProductImage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

export default ProductImage;

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
