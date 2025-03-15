/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const url = "/api/books";
const testId = "67d5e6b7f6cf17d3d5d67f05";
chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  // test('#example Test GET /api/books', function(done){
  //    chai.request(server)
  //     .get('/api/books')
  //     .end(function(err, res){
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
  //       assert.property(res.body[0], 'title', 'Books in array should contain title');
  //       assert.property(res.body[0], '_id', 'Books in array should contain _id');
  //       done();
  //     });
  // });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
            .keepOpen()
            .post(url)
            .send({title:"Ma new title"})
            .end((err,res) =>{
              assert.equal(res.status, 201);
              assert.isObject(res.body);
              assert.hasAllKeys(JSON.parse(res.text),["_id","title"])
              done();
            })
      });
      
      test('Test POST /api/books with no title given', function(done) {
         chai.request(server)
             .keepOpen()
             .post(url)
             .send({})
             .end((err, res) =>{
              assert.equal(res.status,200);
              assert.equal(res.text,"missing required field title");
              done();
             })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .keepOpen()
        .get(url)
        .end((err, res) =>{
         const data = JSON.parse(res.text);
         assert.equal(res.status,200);
         assert.isArray(data);
         data.forEach(element => {
            assert.hasAllKeys(element,["_id","title","commentcount"])
         });
         done();
        })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
          chai.request(server)
          .keepOpen()
          .get(`${url}/this_id_is_not_in_db`)
          .end((err, res) =>{
           assert.equal(res.status,200);
           assert.equal(res.text,"no book exists");
           done();
          })
        });      
       
     
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
          chai.request(server)
          .keepOpen()
          .get(`${url}/${testId}`)
          .end((err, res) =>{
           const data = JSON.parse(res.text);
           assert.equal(res.status,200);
           assert.hasAllKeys(data, ["_id", "title", "comments"]);
           done();
          })
        }); 
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
        .keepOpen()
        .post(`${url}/${testId}`)
        .send({comment:"My useless comment!"})
        .end((err, res) =>{
         const data = JSON.parse(res.text);
         assert.equal(res.status,200);
         assert.hasAllKeys(data, ["_id", "title", "comments"]);
         done();
        })

      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .keepOpen()
        .post(`${url}/${testId}`)
        .send({})
        .end((err, res) =>{
         assert.equal(res.status,200);
         assert.equal(res.text,"missing required field comment");
         done();
        })

      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .keepOpen()
        .post(`${url}/this_id_not_in_db`)
        .send({comment:"Heyy!!"})
        .end((err, res) =>{
         assert.equal(res.status,200);
         assert.equal(res.text,"no book exists");
         done();
        })

      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
        .keepOpen()
        .delete(`${url}/${testId}`)
        .end((err, res) =>{
         assert.equal(res.status,200);
         assert.equal(res.text,"delete successful");
         done();
        })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
        .keepOpen()
        .delete(`${url}/my_id`)
        .end((err, res) =>{
         assert.equal(res.status,200);
         assert.equal(res.text,"no book exists");
         done();
        })
      });

    });

  });

});
