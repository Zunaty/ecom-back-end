const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories and its associated Products
  Category.findAll({
    include: Product
  }).then(cataData => {
    res.json(cataData);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: Product
  }).then(oneCataData => {
    res.json(oneCataData);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(newCata => {
    res.json(newCata);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updateCata => {
    res.json(updateCata);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(cataDelete => {
    res.json(cataDelete);
  });
});

module.exports = router;
