const PlotDAO = require('../dao/plot-dao');
const PlotModel = require('../dto/plot-model');
const express = require('express');
const bodyparser = require('body-parser');

const plotRouter = express.Router();

plotRouter.use(bodyparser.json());

//! base route '/plots'

/**
 * Get all plots
 */
plotRouter.get('/', async function(req, res, next) {
  let plots = await PlotDAO.getAll();
  if (!plots.error) {
    plots = plots.map(plot => new PlotModel(plot));
  }
  handleDefaultDaoResponse(plots, res, 'plots');
});

/**
 * Get plot by id
 */
plotRouter.get('/:plotId', async function(req, res, next) {
  let plot = await PlotDAO.getById(req.params.plotId);
  if (!plot.error) {
    plot = new PlotModel(plot);
  }
  handleDefaultDaoResponse(plot, res, 'plot');
});

/**
 * Create plot
 */
plotRouter.post('/create', async function(req, res, next) {
  let plot = await PlotDAO.create(req.body);
  if (!plot.error) {
    plot = new PlotModel(plot);
  }
  handleDefaultDaoResponse(plot, res, 'plot');
});

/**
 * Update plot
 */
plotRouter.put('/:plotId', async function(req, res, next) {
  let plot = await PlotDAO.update(req.body);
  if (!plot.error) {
    plot = new PlotModel(plot);
  }
  handleDefaultDaoResponse(plot, res, 'plot');
});

/**
 * Update photo
 */
plotRouter.put('/:plotId/update-photo', async function(req, res, next) {
  let daoResponse = await PlotDAO.updatePhoto(req.params.plotId, req.body.photoUrl);
  if (!daoResponse.error) {
    daoResponse = new PlotModel(daoResponse);
  }
  handleDefaultDaoResponse(daoResponse, res, 'plot');
});

/**
 * Update doc
 */
plotRouter.put('/:plotId/update-doc', async function(req, res, next) {
  let plot = await PlotDAO.updateDoc(req.params.plotId, req.body.docUrl);
  if (!plot.error) {
    plot = new PlotModel(plot);
  }
  handleDefaultDaoResponse(plot, res, 'plot');
});

plotRouter.delete('/:plotId', async function(req, res, next) {
  let daoResponse = await PlotDAO.delete(req.params.plotId);
  handleDefaultDaoResponse(daoResponse, res, 'deleteResult');
});

function handleDefaultDaoResponse(daoResponse, res, propertyName) {
  if (daoResponse.error) {
    res.json(daoResponse);
  } else {
    res.json({[propertyName]: daoResponse});
  }
}

module.exports = plotRouter;
