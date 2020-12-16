class PlotModel {
  constructor(plot) {
    const clone = {...plot};
    clone.polygon = clone.polygon.geometry._coordPath._coordinates;
    return clone;
  }
}

export {PlotModel};
