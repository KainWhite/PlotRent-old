import React from 'react';

import './common-components.scss';

class CloseButton extends React.Component {
  render() {
    return (
      <div className="close-btn"
            onClick={this.props.onClose}>
        <i className="fas fa-times"/>
      </div>
    );
  }
}

export {CloseButton};
