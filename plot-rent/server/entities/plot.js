class Plot {
  static tableName = 'plot';
  static className = 'Plot';

  constructor(responseObject) {
    if (!responseObject) {
      return;
    }
    this.id = responseObject.id;
    this.userId = responseObject.user_id;
    this.address = responseObject.address ?
        responseObject.address : 'Your cool address';
    this.polygon = responseObject.map_polygon;
    this.area = responseObject.area;
    this.price = responseObject.price ?
        responseObject.price : 0;
    this.description = responseObject.description ?
        responseObject.description : 'Your cool address';
    this.photoUrl = responseObject.photo_url ?
        responseObject.photo_url : "http://localhost:3000/images/notFound.jpg";
    this.docUrl = responseObject.doc_url;
  }

  static getCreateSql(polygon) {
    return `INSERT INTO ${this.tableName} (
              user_id,
              address,
              map_polygon,
              area,
              price,
              description,
              photo_url,
              doc_url)
             VALUES (?, ?, ST_GeomFromText(?), ?, ?, ?, ?, ?)`;
  }

  static getCreatePlaceholdersArray(plotModel) {
    return [
      plotModel.userId,
      plotModel.address,
      this.modelPolygonToSqlPolygon(plotModel.polygon),
      plotModel.area,
      plotModel.price,
      plotModel.description,
      plotModel.photoUrl,
      plotModel.docUrl,
    ];
  }

  static getUpdateSql() {
    return `UPDATE ${this.tableName} SET
              user_id = ?,
              address = ?,
              map_polygon = ST_GeomFromText(?),
              area = ?,
              price = ?,
              description = ?,
              photo_url = ?,
              doc_url = ?
             WHERE id = ?`;
  }

  static getUpdatePlaceholdersArray(plotModel) {
    return [
      plotModel.userId,
      plotModel.address,
      this.modelPolygonToSqlPolygon(plotModel.polygon),
      plotModel.area,
      plotModel.price,
      plotModel.description,
      plotModel.photoUrl,
      plotModel.docUrl,
      plotModel.id
    ];
  }

  static modelPolygonToSqlPolygon(polygon) {
    if (!polygon || !polygon[0] || !polygon[0][0]) {
      return null;
    }
    let result = 'POLYGON((';
    polygon.forEach(shell => shell.forEach(point => {
      result += `${point[0]} ${point[1]},`
    }));
    result = result.substring(0, result.length - 1);
    result += '))';
    return result;
  }
}

module.exports = Plot;
