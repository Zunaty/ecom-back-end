const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories and its associated Products
  Category.findAll({
    include: Product
  }).then(cataData => {
    res.json(cataData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then(oneCataData => {
    if(!oneCataData) {
      return res.status(404).json({message: 'No category with ID'});
    }
    res.json(oneCataData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(newCata => {
    res.json(newCata);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updateCata => {
    if(!updateCata) {
      return res.status(404).json({message: 'No category with ID'});
    }
    res.json(updateCata);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(cataDelete => {
    if(!cataDelete) {
      return res.status(404).json({message: 'No category with ID'});
    }
    res.json(cataDelete);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
