import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

// import FileUpload from './FileUpload.jsx';
class FileUpload extends Component {
    
    state = {
        uploadedFiles: [],
        uploading: false
    }

    onDrop = files => {
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);                                  // 3
        axios
            .post('/api/admin/uploadimage', formData, config)
            .then(res => {
                this.setState({
                    uploading: false,
                    uploadedFiles: [
                        ...this.state.uploadedFiles, res.data
                    ]
                })
                return this.state.uploadedFiles
            })
            .then(files => {
                this.props.imagesHandler(files)
            })
    }

    onRemove = (id) => {
        axios
            .get(`/api/admin/removeimage?public_id=${id}`)
            .then(res => {
                let remainingImages = this.state.uploadedFiles.filter(f => {
                    return f.public_id !== id;
                });
                this.setState({uploadedFiles: remainingImages});
                return remainingImages;
            })
            .then(rI => this.props.imagesHandler(rI))
    }

    showUploadedImages = () => (
        this.state.uploadedFiles
            .map(img => (
                <div    className='dropzone_box'
                        key={img.public_id}
                        onClick={() => this.onRemove(img.public_id)}>
                    <div    className="wrap"
                            style={{background:`url(${img.url}) no-repeat`}}>
                        {/*<FontAwesomeIcon icon={faPlusCircle}/>*/}
                    </div>
                </div>
            ))
    )

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.reset) return prevState = {uploadedFiles: []}
        return null;
    }


    render() {
        return (
            <div>
                <section>
                    <div className="dropzone clear">
                        <Dropzone   className='dropzone_box'
                                    onDrop={e => this.onDrop(e)}
                                    multiple={false}>
                            <div className="wrap">
                                <FontAwesomeIcon icon={faPlusCircle}/>
                            </div>
                        </Dropzone>
                        {this.showUploadedImages()}
                        {this.state.uploading &&
                        <div    className='dropzone_box'
                                style={{textAlign: 'center', paddingTop: '60px'}} >
                            <CircularProgress   style={{color:'#00bcd4'}}
                                                thickness={7}/>
                        </div>}
                    </div>
                </section>
                FileUpload
            </div>
        );
    }
}

export default FileUpload;


// 3 -  the string you choose will be the object placed on req.files