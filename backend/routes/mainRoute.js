const express = require('express')
const router = express.Router()
const BlogPostModel = require('../models/BlogPostModel');
const natural = require('natural');

//fuzzy search algorithm
function searchArticles(query) {
  const searchQuery = query.trim();

  return BlogPostModel.find(
    { $text: { $search: searchQuery } },
    { score: { $meta: 'textScore' }, title: 1, body: 1, genre: 1, author: 1, imageUrl:1, date:1 }
  )
  .sort({ score: { $meta: 'textScore' } })
  .then((articles) => {
    return articles;
  })
  .catch((err) => {
    console.error('Error searching articles', err);
    return [];
  });
}



// middleware that is specific to this router
router.post('/',async (req,res)=>{
    const {title,author,body,caption,date,genre,featured,imageUrl} = req.body;
    try {
        const blogPost=await BlogPostModel.create({title,author,caption,body,date,genre,featured,imageUrl})
        res.status(200).json(blogPost);
    } catch (err){
        console.log(err);
        res.status(404).json({error: err.message});
    }
})

router.get('/', (req, res) => {
  BlogPostModel.find()
  .then(data => res.json(data))
  .catch(error => res.json(error))
});

router.get('/:id', (req, res) => {
    BlogPostModel.findById(req.params.id, (err, document) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error retrieving document');
      } else {
        res.json(document);
      }
    });
  });

router.delete('/blogs/:id', (req, res) => {
  BlogPostModel.findByIdAndDelete(req.params.id).then((blog) => {
      if (!blog) {
          return res.status(404).send();
      }
      res.send(blog);
  }).catch((error) => {
      res.status(500).send(error);
  })
})

//toggle the featured status
router.post('/blogs/feature/:id',async (req, res) => {
  try {
    const id  = req.params.id;
    const document = await BlogPostModel.findById(id);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const newValue = !document.featured;
    const updatedDocument = await BlogPostModel.findOneAndUpdate({ _id: id }, { featured: newValue }, { new: true });

    res.status(200).json({ message: 'Boolean field updated successfully!', document: updatedDocument });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/search',async (req,res)=>{
  const searchQuery = req.body.query;
  searchArticles(searchQuery).then(results => {
    res.json(results);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Internal Server Error');
  });
  // try {
  //   const allTasks = await BlogPostModel.find({title : req.body.query})
  //   if(!allTasks || allTasks.length === 0)
  //   {
  //     res.status(400).send({error : "No task was found"})
  //   } else {
  //     res.status(200).send(allTasks);
  //   }
  // } catch(error){
  //   res.status(500).send(error);
  // }
})

module.exports = router