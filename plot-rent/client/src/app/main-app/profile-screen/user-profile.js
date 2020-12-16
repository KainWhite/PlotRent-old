import React from 'react';

import {ModalWindow} from '../../common/components/modal-window';
import {RoundImage} from '../../common/components/round-image';

class UserProfile extends React.Component{

  handleOpenChat = (event) => {
    this.props.chatClick(this.props.user);
    this.props.onClose();
    event.preventDefault();
  }

  render() {
    return (
      <ModalWindow title="User profile"
                   onClose={this.props.onClose}>
        <div className="AlignedItem">
          <div className="Aligner">
            <RoundImage imgUrl={this.props.user.imageUrl} alt="User avatar"/>
          </div>
        </div>
        <div className="AlignedItem">
          <span className="Aligner">
            {this.props.user.nickname}
          </span>
        </div>
        <p className="AlignedItem AboutP">{this.props.user.about}</p>
      </ModalWindow>
    );
  }
}

export {UserProfile}
