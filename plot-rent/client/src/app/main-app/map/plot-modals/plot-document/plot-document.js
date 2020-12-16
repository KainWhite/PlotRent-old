import React from 'react';
import {ModalWindow} from '../../../../common/components/modal-window';
import './plot-document.scss'

class PlotDocument extends React.Component {
  render() {
    console.log(this.props.plot.docUrl);
    return (
        <ModalWindow title={"Plot details"}
                     onClose={this.props.onClose}
                     className="modal_pdf-view">
          {
            this.props.plot.docUrl ?
                <embed src={this.props.plot.docUrl} width="100%" height="100%"/> :
                <div className="plot-document__no-doc">
                  No document avaliable
                </div>
          }

        </ModalWindow>
    );
  }
}

export {PlotDocument}
