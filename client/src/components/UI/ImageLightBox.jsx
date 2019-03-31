import React, { Component } from 'react';
import Lightbox from 'react-images';

// import ImageLightBox from './ImageLightBox.jsx';
class ImageLightBox extends Component {

    state = {
        currentImage: this.props.pos,
        images:[],
        lightboxIsOpen: true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.images) {
            const images = [];
            nextProps.images.forEach(img => {
                images.push({src:img})
            })
            return prevState = {images}
        }
        return false;
    }

    closeLightbox = () => this.props.onClose();

    gotoNext = () => {
        this.setState({currentImage: this.state.currentImage + 1})
    }

    gotoPrevious = () => {
        this.setState({currentImage: this.state.currentImage - 1})
    }

    render() {
        const {currentImage, images, lightboxIsOpen} = this.state;
        console.log('------------------------------------------');
        console.log('currentImage ',currentImage);
        console.log('------------------------------------------');
        return (
            <div    className="">
                <Lightbox   currentImage={currentImage}
                            images={images}
                            isOpen={lightboxIsOpen}
                            onClickNext={() => this.gotoNext()}
                            onClickPrev={() => this.gotoPrevious()}
                            onClose={() => this.closeLightbox()}/>
            </div>
        );
    }
}

export default ImageLightBox;