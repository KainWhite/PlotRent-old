import React from 'react';
import {PlotBalloon} from './plot-balloon/plot-balloon';
import $ from 'jquery';

function PlotPolygon(ymaps, props) {
  const makeLayout = (layoutFactory) => {
    const plotBalloon = new PlotBalloon(props);
    const Layout = layoutFactory.createClass(
        plotBalloon.renderAsString(),
        {
          build: function() {
            Layout.superclass.build.call(this);

            this.element = $('.map__plot-balloon', this.getParentElement());
            this.element
                .find('#plot-balloon__profile-btn_plot-id_' + props.plot.id)
                .on('click',
                    {user: this.user},
                    (event) => this.profileClick(event.data.user));
            this.element
                .find('#plot-balloon__details-btn_plot-id_' + props.plot.id)
                .on('click',
                    {plot: this.plot},
                    (event) => this.showPlotDetailsClick(event.data.plot));
            if (props.user === props.currentUser)
            {
              this.element
                  .find('#plot-balloon__edit-btn_plot-id_' + props.plot.id)
                  .on('click',
                      {plot: this.plot},
                      (event) => this.editPlotClick(event.data.plot));
            }
          },

          clear: function() {
            this.element
                .find('#plot-balloon__profile-btn_plot-id_' + props.plot.id)
                .off('click');
            this.element
                .find('#plot-balloon__details-btn_plot-id_' + props.plot.id)
                .off('click');
            if (props.user === props.currentUser)
            {
              this.element
                  .find('#plot-balloon__edit-btn_plot-id_' + props.plot.id)
                  .off('click');
            }
            Layout.superclass.clear.call(this);
          },

          user: props.user,
          plot: props.plot,
          profileClick: props.profileClick,
          editPlotClick: props.editPlotClick,
          showPlotDetailsClick: props.showPlotDetailsClick,
        });
    return Layout;
  };

  return new ymaps.Polygon(
    props.geometry,
    props.properties,
    {
      ...props.options,
      balloonContentLayout: makeLayout(ymaps.templateLayoutFactory),
      balloonPanelMaxMapArea: 0,
    },
  );
}

export {PlotPolygon};
