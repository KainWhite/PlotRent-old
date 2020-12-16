import React from 'react';
import API from '../../../../../api';
import './doc-form.scss';

class DocForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: undefined,
    };
  }

  updateDocClick = async (e) => {
    e.preventDefault();
    if (this.state.selectedFile) {
      const formData = new FormData();
      formData.append('document', this.state.selectedFile);
      try {
        let response = await API.post(
            `upload-doc`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        );

        await this.props.updatePlot({
          ...this.props.plot,
          docUrl: response.data.fileUrl,
          docThumbnail: response.data.docThumbnail,
        });
      } catch(err) {
        console.log(err);
      }
    }
  };

  inputChange = async (e) => {
    if(e.target.files[0]) {
      this.setState({
        selectedFile: e.target.files[0],
      });
    }
  };

  render() {
    return (
      <form className="plot-balloon__doc-form"
            onSubmit={this.updateDocClick}>
        <div className="plot-balloon__doc-thumbnail"
             style={{
               borderWidth: this.state.selectedFile ?
                   0 : null,
             }}>
          <img src={this.state.selectedFile ?
              "http://localhost:3000/images/pdf.png" : null}/>
        </div>
        <label className="plot-balloon__doc-label"
               htmlFor={"docFileName" + this.props.plot.id}>
          Choose document
        </label>
        <input className="plot-balloon__doc-input"
               id={"docFileName" + this.props.plot.id}
               name="docFileName"
               type="file"
               accept=".pdf"
               required
               onChange={this.inputChange}/>
        <input className="plot-balloon__doc-btn"
               type="submit"
               value="Upload"
               style={{
                 borderColor: this.state.selectedFile ? '#6db33f' : null,
               }}/>
      </form>
    );
  }
}

export {DocForm};
