const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include:
      {
        model: Product,
        attributes: ['product_name','price','stock'],
        
        include: {
          model: Category,
          attributes: ['category_name']
        }
      }
    
  })
  .then(dataResponse => res.json(dataResponse))
  .catch( err => {
    console.log("An error has occured");
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include:[
      {
        model: Product,
        attributes: ['product_name','price','stock'],
        include: {
          model: Category,
          attributes: ['category_name']
        }
      }
    ],
    where:{
      id: req.params.id
    }
  })
  .then(dataResponse => res.json(dataResponse))
  .catch( err => {
    console.log("An error has occured");
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dataResponse => res.json(dataResponse))
  .catch(err => {
    console.log('An error has occured');
    console.log(err)
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dataResponse => {
    if (dataResponse[0] === 0) {
      res.status(404).json({message: "An error has occured"});
      return;
    }
    res.json(dataResponse);
  })
  .catch(err => {
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
  })
  .then(dataResponse => {
    if (!dataResponse) {
      res.status(404).json({ message: "Item not found"})
      return;
    }
    res.json(dataResponse);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
