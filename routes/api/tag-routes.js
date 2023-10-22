const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/tags` endpoint


// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  router.get('/', async (req, res) => {
    try {
      const tagsData = await Tag.findAll({
        include: [Category, Product] // Include the associated Category and Tag
      });
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
});


// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product] // Include the associated Products
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      id: req.body.id,
      name: req.body.name,
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const existingTags = await Tag.findAll({
        where: {
          id: req.body.tagIds,
        },
      });

      await updatedTag.setTags(existingTags);
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
