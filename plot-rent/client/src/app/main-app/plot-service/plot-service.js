import API from '../../api';

class PlotService {
  static async create(plotModel) {
    try{
      const response = await API.post(
          `plots/create`,
          plotModel,
          {headers: {"Content-Type": "application/json"}}
      );
      if (!response.error) {
        return response.data.plot;
      } else {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async get(plotId) {
    try {
      const response = await API.get(
          `plots/${plotId}`,
          {headers: {"Content-Type": "application/json"}}
      );
      if (!response.error) {
        return response.data.plot;
      } else {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getAll() {
    try {
      const response = await API.get(
          `plots/`,
          {headers: {"Content-Type": "application/json"}}
      );
      if (!response.error) {
        return response.data.plots;
      } else {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async update(plotModel) {
    try {
      const response = await API.put(
          `plots/${plotModel.id}`,
          plotModel,
          {headers: {"Content-Type": "application/json"}}
      );
      if (!response.error) {
        return response.data.plot;
      } else {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async delete(plotId) {
    try {
      const response =  await API.delete(
          `plots/${plotId}`,
          {headers: {"Content-Type": "application/json"}}
      );
      if (response.error) {
        console.error(response.error);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export {PlotService};
