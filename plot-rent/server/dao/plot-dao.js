const GenericDao = require('./generic-dao');
const Plot = require('../entities/plot');

class PlotDAO extends GenericDao {
  static entityClass = Plot;

  static async updatePhoto(id, photoUrl) {
    const sql = `UPDATE ${this.entityClass.tableName} SET
                   photo_url = ?
                 WHERE id = ${this.connection.escape(id)}`;
    await this.connection.query(sql, [photoUrl, id]);
    return await this.getById(id);
  }

  static async updateDoc(id, docUrl) {
    const sql = `UPDATE ${this.entityClass.tableName} SET
                   doc_url = ?
                 WHERE id = ${this.connection.escape(id)}`;
    await this.connection.query(sql, [docUrl, id]);
    return await this.getById(id);
  }
}

module.exports = PlotDAO;
