import React from 'react';

import './common-components.scss';
import {CloseButton} from './close-button';

class ModalWindow extends React.Component {
  render() {
    return (
      <div className="ModalWindowContainer"
           onClick={this.props.onClose}>
        <div className={"ModalWindow " + this.props.className}
             onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h2 className="modal__title">{this.props.title}</h2>
            {
              this.props.onClose &&
              <CloseButton onClose={this.props.onClose}/>
            }
          </div>
            <div className="ModalWindowContentWrapper Aligner">
              {this.props.children}
            </div>
        </div>
      </div>
    );
  }
}

export {ModalWindow};
