import './map.scss';
import React from 'react';
import {YMaps, Map, Polygon, Button} from 'react-yandex-maps';
import {PlotPolygon} from './plot-polygon/plot-polygon';
import {EditablePlot} from './plot-modals/editable-plot/editable-plot';
import {PlotDocument} from './plot-modals/plot-document/plot-document';
import {PlotService} from '../plot-service/plot-service';
import {PlotModel} from '../../common/dto/plot-model';
import API from '../../api';

class YandexMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserPlots: [],
    };
    this.userPlots = [];
    this.users = [];
  }

  setCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userPosition: [
          position.coords.latitude, position.coords.longitude
        ],
      });
    });
  };

  setPlots = async () => {
    const plots = await PlotService.getAll();
    this.userPlots = plots.filter(plot =>
        plot.userId !== this.props.currentUser.id);
    this.setState(() => {
      const currentUserPlots = [];
      plots.filter(plot =>
          plot.userId === this.props.currentUser.id).forEach(plot => {
        currentUserPlots[plot.id] = plot;
      });
      return {
        currentUserPlots: currentUserPlots,
      }
    });
  };

  setUsers = async () => {
    const users = (await API.get(
        `users/`,
        {headers: {"Content-Type": "application/json"}}
    )).data.users;
    users.forEach((user) => this.users[user.id] = user);
  };

  newPlotClick = async () => {
    if (!this.state.ymaps) {
      console.error('no ymaps set');
      return;
    }
    if (this.state.editingPlot) {
      await this.savePlotClick();
    }
    const plot = await PlotService.create({userId: this.props.currentUser.id});
    plot.polygon = PlotPolygon(
        this.state.ymaps,
        {
          geometry: [],
          options: {
            editorDrawingCursor: "crosshair",
            fillColor: "#0000FF30",
            strokeColor: "#0000FF",
            strokeWidth: 5,
          },
          user: this.props.currentUser,
          currentUser: this.props.currentUser,
          plot: plot,
          profileClick: this.props.profileClick,
          editPlotClick: this.editPlotClick,
          showPlotDetailsClick: this.showPlotDetailsClick,
        }
    );
    this.mapRef.geoObjects.add(plot.polygon);
    plot.polygon.editor.startDrawing();
    this.setState(prevState => {
      const currentUserPlots = [...prevState.currentUserPlots];
      currentUserPlots[plot.id] = plot;
      return {
        editingPlot: plot,
        currentUserPlots: currentUserPlots
      };
    });
  };

  editPlotClick = (plot) => {
    if (plot.polygon.editor) {
      plot.polygon.editor.startEditing();
    }
    this.setState({
      editingPlot: plot,
    }, () => {
      this.setState({
        modalWindow: (
            <EditablePlot
                plot={this.state.editingPlot}
                updatePlot={this.updatePlot}
                deletePlot={this.deletePlot}
                onClose={() => this.setState({
                  modalWindow: undefined,
                })}/>
        ),
      });
    });
  };

  showPlotDetailsClick = (plot) => {
    this.setState({
      modalWindow: (
          <PlotDocument
              plot={plot}
              onClose={() => this.setState({
                modalWindow: undefined,
              })}/>
      ),
    });
  };

  savePlotClick = async () => {
    if(this.state.editingPlot) {
      if (this.state.editingPlot.polygon.editor) {
        this.state.editingPlot.polygon.editor.stopEditing();
      }
      if (this.state.editingPlot.polygon.geometry
          ._coordPath._coordinates[0].length > 3) {
        await this.updatePlot(this.state.editingPlot);
      } else {
        this.mapRef.geoObjects.remove(this.state.editingPlot.polygon);
        await PlotService.delete(this.state.editingPlot.id);
      }
      this.setState({
        editingPlot: undefined,
      })
    }
  };

  updatePlot = async (plot) => {
    if (!plot) {
      return;
    }
    this.mapRef.geoObjects.remove(this.state.editingPlot.polygon);
    const newPlot = await PlotService.update(new PlotModel(plot));
    this.setState(prevState => {
      const currentUserPlots = [...prevState.currentUserPlots];
      currentUserPlots[newPlot.id] = newPlot;
      return {
        editingPlot: newPlot,
        currentUserPlots: currentUserPlots,
      };
    }, () => {
      const newPolygon = PlotPolygon(
          this.state.ymaps,
          {
            geometry: this.state.editingPlot.polygon,
            options: {
              editorDrawingCursor: "crosshair",
              fillColor: "#0000FF30",
              strokeColor: "#0000FF",
              strokeWidth: 5,
            },
            user: this.props.currentUser,
            currentUser: this.props.currentUser,
            plot: this.state.editingPlot,
            profileClick: this.props.profileClick,
            editPlotClick: this.editPlotClick,
            showPlotDetailsClick: this.showPlotDetailsClick,
          }
      );
      this.mapRef.geoObjects.add(newPolygon);
      this.state.editingPlot.polygon = newPolygon;
      console.log(this.state.editingPlot);
    });
  };

  deletePlot = async (plotId) => {
    this.mapRef.geoObjects.remove(this.state.editingPlot.polygon);
    this.state.currentUserPlots[plotId] = null;
    this.setState({
      editingPlot: undefined,
    });
    await PlotService.delete(plotId);
  };

  componentDidMount() {
    this.setCurrentPosition();
    this.setPlots();
    this.setUsers();
  }

  onMapLoad = (ymaps) => {
    this.userPlots.forEach(plot => {
      const newPolygon = PlotPolygon(
          ymaps,
          {
            geometry: plot.polygon,
            options: {
              fillColor: "#FF000030",
              strokeColor: "#770000",
              strokeWidth: 5,
            },
            user: this.users[plot.userId],
            currentUser: this.props.currentUser,
            plot: plot,
            profileClick: this.props.profileClick,
            editPlotClick: this.editPlotClick,
            showPlotDetailsClick: this.showPlotDetailsClick,
          }
      );
      this.mapRef.geoObjects.add(newPolygon);
      plot.polygon = newPolygon;
    });
    this.state.currentUserPlots.forEach(plot => {
      const newPolygon = PlotPolygon(
          ymaps,
          {
            geometry: plot.polygon,
            options: {
              editorDrawingCursor: "crosshair",
              fillColor: "#0000FF30",
              strokeColor: "#0000FF",
              strokeWidth: 5,
            },
            user: this.props.currentUser,
            currentUser: this.props.currentUser,
            plot: plot,
            profileClick: this.props.profileClick,
            editPlotClick: this.editPlotClick,
            showPlotDetailsClick: this.showPlotDetailsClick,
          }
      );
      this.mapRef.geoObjects.add(newPolygon);
      plot.polygon = newPolygon;
    });
    this.setState({ymaps: ymaps});
  };

  render() {
    return (
      <div className="map">
        <YMaps query={{
               lang: "en_US",
               apikey: "f8a4a7fe-f442-4a37-af5a-a4dec57c863f"}}>
          {
            this.state.userPosition && (
              <Map instanceRef={ref => this.mapRef = ref}
                   defaultState={{center: this.state.userPosition, zoom: 12}}
                   options={{autoFitToViewport: 'always'}}
                   height="100%"
                   width="100%"
                   modules={[
                      "Polygon",
                     "geoObject.addon.editor",
                     "geoObject.addon.balloon",
                     "templateLayoutFactory",]}
                   onLoad={this.onMapLoad}>
                <Button
                    options={{
                      maxWidth: 128,
                      selectOnClick: false,
                    }}
                    data={{content: 'Save plot'}}
                    onClick={this.savePlotClick}/>
                <Button
                    options={{
                      maxWidth: 128,
                      selectOnClick: false,
                    }}
                    data={{content: 'Create new plot'}}
                    onClick={this.newPlotClick}/>
              </Map>
            )
          }
          {this.state.modalWindow && (this.state.modalWindow)}
        </YMaps>
      </div>
    );
  }
}

export {YandexMap}
