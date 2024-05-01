const Post = require("../models/postsModel");

const getPostController = async function (req, res, next) {
    let post = "";
    let timeSort = "";
    let keywordFilter = {};

    if (req.query.timeSort == "desc" || req.query.timeSort == "monthDesc") {
        timeSort = "-createdAt";
    } else {
        timeSort = "createdAt";
    }

    if (req.query.timeSort == "monthDesc") {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        keywordFilter = {
            createdAt: {
                $gte: startOfMonth,
            }
        };
    }

    if (req.query.Keyword) {
        const keywords = req.query.Keyword.split(' ');
        const regexArray = keywords.map(keyword => ({ content: new RegExp(keyword) }))
        keywordFilter.$or = regexArray;
    }

    try {
        post = await Post.find(keywordFilter).populate({
            path: 'userName',
            select: 'userName photo'
        }).sort(timeSort);
        res.status(200).json({
            success: true,
            message: "搜尋成功",
            post
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "查詢異常",
            errMsg: err.message
        });
    }
};

const createPostController = async function (req, res, next) {
    try {
        const newPost = await Post.create(req.body);
        res.status(200).json({
            success: true,
            message: "新增貼文成功",
            post: newPost
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "新增貼文失敗",
            errMsg: err.message
        })
    }
};

module.exports = {
    getPostController: getPostController,
    createPostController: createPostController
}