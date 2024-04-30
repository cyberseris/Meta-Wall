const Post = require("../models/postsModel");

const searchController = async function (req, res, next) {
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
        keywordFilter.content = new RegExp(req.query.Keyword)
    }

    try {
        post = await Post.find(keywordFilter).sort(timeSort);

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

const postController = async function (req, res, next) {
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
    searchController: searchController,
    postController: postController
}