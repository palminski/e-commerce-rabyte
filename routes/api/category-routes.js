const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include:[
      {
        model: Product,
        attributes: ['product_name','price','stock']
      }
    ]
  })
  .then(dataResponse => res.json(dataResponse))
  .catch( err => {
    console.log("An error has occured");
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    include: [
      {
        model: Product,
        attributes: ['product_name','price','stock']
      }
    ],
    where: {
      id: req.params.id
    }
  })
  .then(dataResponse => res.json(dataResponse))
  .catch( err => {
    console.log("An error has occured");
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then(dataResponse => res.json(dataResponse))
  .catch(err => {
    console.log('An error has occured');
    console.log(err)
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
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
  // delete a category by its `id` value
  Category.destroy({
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
