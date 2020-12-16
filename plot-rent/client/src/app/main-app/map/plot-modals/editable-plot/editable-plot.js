import React from 'react';
import {ModalWindow} from '../../../../common/components/modal-window';
import {RoundImage} from '../../../../common/components/round-image';
import {Separator} from '../../../../common/components/separator';
import {PhotoForm} from './photo-form/photo-form';
import {DocForm} from './doc-form/doc-form';
import {InfoForm} from './info-form/info-form';

class EditablePlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plot: {
        ...this.props.plot
      },
    };
  }

  updatePlot = (plot) => {
    this.setState({plot: plot});
    this.props.updatePlot(plot);
  };

  render() {
    return (
      <ModalWindow title={"Edit plot"}
                   onClose={this.props.onClose}>
        <div className="AlignedItem">
          <div className="Aligner">
            <RoundImage imgUrl={this.state.plot.photoUrl} alt="Plot photo"/>
          </div>
        </div>
        <PhotoForm plot={this.state.plot}
                   updatePlot={this.updatePlot}/>
        <Separator/>
        <DocForm plot={this.state.plot}
                 updatePlot={this.updatePlot}/>
        <Separator/>
        <InfoForm plot={this.state.plot}
                  updatePlot={this.updatePlot}
                  deletePlot={this.props.deletePlot}
                  onClose={this.props.onClose}/>
      </ModalWindow>
    );
  }
}

export {EditablePlot}
