const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags and its associated Product data
  Tag.findAll({
    include: [Product, ProductTag]
  }).then(tagData => {
    res.json(tagData);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` and its associated Product data
   Tag.findOne({
     where: {
       id: req.params.id
     },
     include: [Product, ProductTag]
   }).then(oneTagData => {
     res.json(oneTagData);
   });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tagAdd => {
    res.json(tagAdd);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tagUpdate => {
    res.json(tagUpdate);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagDelete => {
    res.json(tagDelete);
  });
});

module.exports = router;
