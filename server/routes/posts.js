var express = require('express');
var router = express.Router();

import db from '../middleware/db.js';
import httpStatus from 'http-status-codes';

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        let postInfo = await db.query('SELECT * from todolists;');
        
        if(postInfo.length > 0){
            const returnObj = {
                postInfo : postInfo
            }
            res.status(httpStatus.OK).send(returnObj)
        } else{
            res.status(httpStatus.NOT_FOUND).send()
        }
   } catch(error) {
        console.error(error, "posts api error")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
   }
});

router.get('/:id', async function(req, res, next) {
  try {
    const id = req.params.id;
      let postInfo = await db.query('SELECT * from todolists where tid = ?;', [id]);
      
      if(postInfo.length > 0){
          const returnObj = {
              postInfo : postInfo
          }
          res.status(httpStatus.OK).send(returnObj)
      } else{
          res.status(httpStatus.NOT_FOUND).send()
      }
 } catch(error) {
      console.error(error, "posts api error")
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send([])
 }
});

module.exports = router;