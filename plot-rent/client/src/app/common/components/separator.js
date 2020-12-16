import React from 'react';

class Separator extends React.Component {
  render() {
    return (
      <hr style={{
        height: (this.props.height ? this.props.height : '3') + 'px',
        width: (this.props.width ? this.props.width : '90') + '%',
        backgroundColor: this.props.backgroundColor ?
            this.props.backgroundColor : '#707070',
        marginTop: (this.props.margin ? this.props.margin : '10') + 'px',
        marginBottom: (this.props.margin ? this.props.margin : '10') + 'px',
      }}/>
    );
  }
}

export {Separator};
