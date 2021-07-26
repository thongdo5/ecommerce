const { Category } = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

const create = ({ body }, res) => {
  const category = new Category(body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({ data });
  });
};

const read = (req, res) => {
  res.json({ category: req.category });
};

const update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(data);
  });
};

const remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: 'Category was deleted successfully!',
    });
  });
};

const list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(data);
  });
};

const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: 'Category does not exist.',
      });
    }

    req.category = category;
    next();
  });
};

module.exports = { create, read, update, remove, list, categoryById };
