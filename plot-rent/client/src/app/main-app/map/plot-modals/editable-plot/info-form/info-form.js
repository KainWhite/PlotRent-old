import React from 'react';
import './info-form.scss';

class InfoForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: undefined,
    };
  }

  saveClick = (e) => {
    e.preventDefault();
    this.props.updatePlot({
      ...this.props.plot,
      address: e.target.infoAddress ?
          e.target.infoAddress.value : this.props.plot.address,
      description: e.target.infoDescription ?
          e.target.infoDescription.value : this.props.plot.description,
    });
    this.props.onClose();
  };

  deleteClick = (e) => {
    e.preventDefault();
    this.props.deletePlot(this.props.plot.id);
    this.props.onClose();
  };

  render() {
    return (
      <form className="plot-balloon__info-form"
            onSubmit={this.saveClick}>
        <label className="plot-balloon__info-label"
               htmlFor={"info-address" + this.props.plot.id}>
          Address
        </label>
        <input className="plot-balloon__info-input"
               id={"info-address" + this.props.plot.id}
               name="infoAddress"
               type="text"
               onChange={this.inputChange}
               defaultValue={this.props.plot.address}/>
        <label className="plot-balloon__info-label"
               htmlFor={"info-address" + this.props.plot.id}>
          Description
        </label>
        <textarea className="plot-balloon__info-textarea"
                  id={"info-address" + this.props.plot.id}
                  name="infoDescription"
                  onChange={this.inputChange}
                  defaultValue={this.props.plot.description}
                  rows={7}/>
        <div className="plot-balloon__buttons">
          <input className="plot-balloon__button plot-balloon__invisible-btn"
                 type="button"
                 value="Delete"/>
          <input className="plot-balloon__button plot-balloon__save-btn"
                 type="submit"
                 value="Save"
                 style={{
                   borderColor: this.state.selectedFile ? '#6db33f' : null,
                 }}/>
          <input className="plot-balloon__button plot-balloon__delete-btn"
                 type="button"
                 value="Delete"
                 onClick={this.deleteClick}/>
        </div>
      </form>
    );
  }
}

export {InfoForm};
