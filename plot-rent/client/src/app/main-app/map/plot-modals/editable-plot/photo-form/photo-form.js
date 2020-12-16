import React from 'react';
import './photo-form.scss';
import API from '../../../../../api';

class PhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updatePhotoClick = async (e) => {
    e.preventDefault();
    if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.state.selectedFile);
      try {
        let response = await API.post(
            `upload-image`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        await this.props.updatePlot({
          ...this.props.plot,
          photoUrl: response.data.fileUrl,
        });
      } catch(err) {
        console.log(err);
      }
    }
  };

  inputChange = async (e) => {
    e.preventDefault();
    if(e.target.files[0]) {
      this.setState({
        selectedFileUrl: URL.createObjectURL(e.target.files[0]),
        selectedFile: e.target.files[0],
      });
    }
  };

  render() {
    return (
      <form className="plot-balloon__photo-form"
            onSubmit={this.updatePhotoClick}>
        <div className="plot-balloon__photo-img"
             style={{
               borderWidth: this.state.selectedFileUrl ?
                   0 : null,
             }}>
          <img src={this.state.selectedFileUrl}/>
        </div>
        <label className="plot-balloon__photo-label"
               htmlFor={"photoFileName" + this.props.plot.id}>
          Choose photo
        </label>
        <input className="plot-balloon__photo-input"
               id={"photoFileName" + this.props.plot.id}
               name="photoFileName"
               type="file"
               required
               onChange={this.inputChange}/>
        <input className="plot-balloon__photo-btn"
               type="submit"
               value="Upload"
               style={{
                 borderColor: this.state.selectedFileUrl ? '#6db33f' : null,
               }}/>
      </form>
    );
  }
}

export {PhotoForm};
