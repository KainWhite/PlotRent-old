import {RoundImage} from '../../../../common/components/round-image';
import './plot-balloon.scss'
import API from '../../../../api';

class PlotBalloon {
  constructor(props) {
    this.props = props;
  }

  /**
   * @return {string}
   */
  renderAsString() {
    return `
    <div class="map__plot-balloon">
      <div class="plot-balloon__image">
        ${
        new RoundImage({
          imgUrl: this.props.plot.photoUrl,
          alt: "Some cool photo"
        }).renderAsString()
    }
      </div>
      <h2 class="plot-balloon__address">
        ${this.props.plot.address}
      </h2>
      <p>
        ${this.props.plot.description}
      </p>
      <div class="plot-balloon__buttons">
        <button class="plot-balloon__button"
                id="plot-balloon__profile-btn_plot-id_${this.props.plot.id}">
          Show owner profile
        </button>
        <button class="plot-balloon__button"
                id="plot-balloon__details-btn_plot-id_${this.props.plot.id}">
          Show plot details
        </button>
        ${
          this.props.user === this.props.currentUser? `
            <button class="plot-balloon__button"
                    id="plot-balloon__edit-btn_plot-id_${this.props.plot.id}">
              Edit
            </button>
          ` : ''
        }
      </div>
    </div>
  `;
  }
}

export {PlotBalloon}
