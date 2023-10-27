const router = require('express').Router();
const { Category, Product, ProductTag, Tag } = require('../../models');

// find all products
// includes its associated Category and Tag data
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag }
      ]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find a single product by its `id`
// includes its associated Category and Tag data
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: ProductTag }
      ]
    })
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  try {
    const productData = await Product.create({
      id: req.body.id,
      product_name: req.body.name,
      price: req.body.price,
      stock: req.body.stock
    });

    // if there's product tags, create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: productData.id,
          tag_id,
        };
      });

      await Product.bulkCreate(productIdArr);
    }

    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (req.body.productIds && req.body.productIds.length) {
      const existingProduct = await Product.findAll({
        where: {
          id: req.body.productIds,
        },
      });
    await updatedProduct.setProducts(existingProducts);
  }

res.status(200).json({ message: 'Your Product has been updated' });
} catch (err) {
  res.status(400).json('No Product with this id');
}
});


// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id }
    });

    if (!productData) {
      res.status(404).json({ message: 'No product with this id!' });
      return;
    }

    res.status(200).json({ message: '!Your product has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
