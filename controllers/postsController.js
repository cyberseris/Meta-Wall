const Post = require("../models/postsModel");
let post = "";

const searchController =  async function(req, res, next) {
    if(req.query.timeSort == "desc"){
        const timeSort = "-createdAt";  
        try{
        if(typeof req.query.Keyword!=='undefined'){
            Keyword = {"content": new RegExp(req.query.Keyword)}
            post = await Post.find(Keyword).sort(timeSort);    
        }else{
            post = await Post.find().sort(timeSort);
        } 
        return res.status(200).json({
            success: true,
            message: "搜尋成功",
            post
        })
        }catch(err){
            res.status(400).json({
                success: false,
                message: "查詢異常",
                errMsg: err.message
              })
        }
    }else if(req.query.timeSort == "monthDesc"){
        const timeSort = "-createdAt";  
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        try{
            if(typeof req.query.Keyword!=='undefined'){
                Keyword = {"content": new RegExp(req.query.Keyword)}
                post = await Post.find({...Keyword,
                    createdAt: {
                        $gte: startOfMonth,
                    }
                }).sort(timeSort);  
            }else{
                post = await Post.find({
                    createdAt: {
                        $gte: startOfMonth,
                    }
                }).sort(timeSort);
            }
    
            return res.status(200).json({
                success: true,
                message: "搜尋成功",
                post
            })  
        }catch(err){
            res.status(400).json({
                success: false,
                message: "查詢異常",
                errMsg: err.message
              })
        }
    }else{
        try{
            if(typeof req.query.Keyword!=='undefined'){
                Keyword = {"content": new RegExp(req.query.Keyword)}
                post = await Post.find(Keyword);    
            }else{
                post = await Post.find();
            }
            return res.status(200).json({
                success: true,
                message: "搜尋成功",
                post
            })
        }catch(err){
            res.status(400).json({
                success: false,
                message: "查詢異常",
                errMsg: err.message
              })
        }
    }
};

const postController =  async function(req, res, next) {
    try{
        const newPost = await Post.create(req.body);
        return res.status(200).json({
            success: true,
            message: "新增貼文成功",
            post: newPost
        })
    }catch(err){
        res.status(400).json({
            success: false,
            message: "新增貼文失敗",
            errMsg: err.message
          })
    }
  };

  module.exports = {
    searchController:searchController,
    postController:postController
  }