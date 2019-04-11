import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import {Link} from 'react-router-dom';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import DashboardNav from '../../hoc/DashboardNav.jsx';

class AddFile extends Component {

    state = {
        files: [],
        formError: false,
        formSuccess: false,
        uploading: false
    }

    componentDidMount() {
        axios
            .get('/api/admin/admin_files')
            .then(res => this.setState({ files: res.data }))
    }

    onDrop = files => {
        this.setState({uploading: true});
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0]);                                  // 3
        axios
            .post('/api/admin/uploadfile', formData, config)
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        formError: false,
                        formSuccess: true,
                        uploading: false
                    }, () => {setTimeout(() => this.setState({formSuccess: false}), 2000)})
                }
            })

    }
       
    showFiles = () => (
        this.state.files &&
        this.state.files.map((filename,i) => (
            <li key={i}>

                <Link   to={`/api/admin/download/${filename}`}
                        target="_blank">
                    {filename}
                </Link>

            </li>
        ))
    )
    
    render() {
        return (
            <DashboardNav>

                <h1>Upload File</h1>

                <div >
                    <Dropzone   className='dropzone_box'
                                onDrop={e => this.onDrop(e)}
                                multiple={false}>
                        <div className="wrap">
                            <FontAwesomeIcon icon={faPlusCircle}/>
                        </div>
                    </Dropzone>

                    {this.state.uploading &&
                    <div    className='dropzone_box'
                            style={{textAlign: 'center', paddingTop: '60px'}} >
                        <CircularProgress   style={{color:'#00bcd4'}}
                                            thickness={7}/>
                    </div>}

                    <div style={{clear: 'both'}}>
                        {this.state.formSuccess &&
                        <div className='form_success'> Success </div>}
                        {this.state.formError &&
                        <div className='error_label'> Error </div>}
                    </div>
                    <a href="/api/admin/download/1554686323039_rapidgator.net.png" target='_blank'>file 1</a>
                    <hr/>

                    <div>
                        <ul>{this.showFiles()}</ul>
                    </div>

                </div>
            </DashboardNav>
        );
    }
}

export default AddFile;