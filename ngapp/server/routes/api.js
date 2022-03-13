const express= require ('express');
const router =express.Router();
const mongoose = require('mongoose');
const Video= require('../models/video');

const db = "mongodb://localhost:27017/videoplayer"
mongoose.Promise =global.Promise;
mongoose.connect(db,function(err){
    if(err){
        console.log("error!"+ err);
    }
});
      //Get Api
router.get('/videos',function(req,res){
    console.log('Get request for all videos');
    Video.find({})
    .exec(function(err,videos){
        if(err){
            console.log("error in retreiving videos");
        }else{
            res.json(videos);
        }
    })

});
       //GetByid API
router.get('/videos/:id',function(req,res){
    console.log('Get request for a single video');
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log("error in retreiving a video");
        }else{
            res.json(video);
        }
    })

});
        // Post Api Add video to database

router.post('/video',function(req,res){
    console.log('post a video');
    var newVideo= new Video();
    newVideo.title= req.body.title;
    newVideo.url= req.body.url;
    newVideo.description= req.body.description;

    newVideo.save(function(err,insertedVideo){

        if(err){
            console.log("error in retreiving a video");
        }else{
            res.json(insertedVideo);
        }
    })

});

  // Update Api

  router.put('/video/:id',function(req,res){
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id,
        {
           $set: {title:req.body.title,
                  url:req.body.url,
                description:req.body.description}
           },
           {
               new: true
           },
        (function(err,updatedVideo){

        if(err){
            res.send ("error in updating a video");
        }else{
            res.json(updatedVideo);
        }
    }
        ));
    
});


      // Delete  Api

      router.delete('/video/:id',function(req,res){
          console.log('Deleting a video');
          Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
              if(err){
                  res.send("Error in deleting video");
              }else{
                  res.json(deletedVideo);
              }
          })
      })





module.exports=router;