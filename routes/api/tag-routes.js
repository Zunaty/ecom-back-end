const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags and its associated Product data
  Tag.findAll({
    include: Product
  }).then(tagData => {
    res.json(tagData);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` and its associated Product data
   Tag.findOne({
     where: {
       id: req.params.id
     },
     include: [Product]
   }).then(oneTagData => {
     if(!oneTagData) {
       return res.status(404).json({message: 'No tag with ID'});
     }
     res.json(oneTagData);
   }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(tagAdd => {
    res.json(tagAdd);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tagUpdate => {
    if(!tagUpdate){
      return res.status(404).json({message: 'No tag with ID'});
    }
    res.json(tagUpdate);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagDelete => {
    if(!tagDelete) {
      return res.status(404).json({message: 'No tag with ID'});
    }
    res.json(tagDelete);
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
