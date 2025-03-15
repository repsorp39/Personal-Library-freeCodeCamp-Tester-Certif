const Book = require("../db/Book");


async function addBook(req, res, next){
    const { title } = req.body;
    if(!title) return res.send("missing required field title");
    const{ _id, title:ttl }= await Book.create({ title });
    
    res.status(201).json({ _id,title:ttl });
}


async function getAllBooks(res, res, next){
    const foundBooks = await Book.find();
    const results = foundBooks.map(({ comments, title,_id}) => {
        let el = { _id, title, commentcount:comments.length};
       
        return el;
    })

    res.json(results);
}


async function getASingleBook(req, res, next){
   try {
        const { _id } = req.params;
        
        const foundBook = await Book.findOne({ _id });
        if(!foundBook) return res.send("no book exists");

        res.json(foundBook);
   } catch (error) {
        res.send("no book exists");
   }
}


async function addComment(req, res, next){
 try {
        const { _id } = req.params;
        const { comment } = req.body;
        if(!comment) return res.send("missing required field comment");
        
        const foundBook = await Book.findOne({ _id });
        if(!foundBook) return res.send("no book exists");

        foundBook.comments = [... foundBook.comments, comment];
        await foundBook.save();

        res.json(foundBook);

 } catch (error) {
         res.send("no book exists");
 }  
}

async function deleteBook(req, res, next){
   try {
        const { _id } = req.params;

        const foundBook = await Book.findOne({ _id });
        if(!foundBook) return res.send("no book exists");

        
        await Book.deleteOne({ _id });

        res.send("delete successful");
   } catch (error) {
    res.send("no book exists");
   }
}


async function deleteAll(req, res, next){
    await Book.deleteMany();
    res.send("complete delete successful");
}


module.exports = {
    addBook,
    getAllBooks,
    getASingleBook,
    addComment,
    deleteBook,
    deleteAll,
}