/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const express = require("express");
const { 
  getAllBooks, 
  addBook, 
  deleteAll, 
  getASingleBook, 
  addComment, 
  deleteBook 

} = require("../controllers");
const router = express.Router();

  router.route('/books')
    .get(getAllBooks)
    
    .post(addBook)
    
    .delete(deleteAll);



  router.route('/books/:_id')
    .get(getASingleBook)
    
    .post(addComment)
    
    .delete(deleteBook);
  



module.exports = router;