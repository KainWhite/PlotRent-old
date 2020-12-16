class PlotModel {
  constructor(plot) {
    if (!plot) {
      return;
    }
    this.id = plot.id;
    this.userId = plot.userId;
    this.address = plot.address;
    this.polygon = plot.polygon ?
        plot.polygon.map(shell => shell.map(point => [point.x, point.y])) :
        undefined;
    this.area = plot.area;
    this.price = plot.price;
    this.description = plot.description;
    this.photoUrl = plot.photoUrl;
    this.docUrl = plot.docUrl;
  }
}

module.exports = PlotModel;
