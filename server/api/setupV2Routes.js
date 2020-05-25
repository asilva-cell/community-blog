const express = require('express')


const bodyParser = require('body-parser')
const database = require('../database')

const setupV2Routes = (apiRouter) => {
    // Controller Functions
    function findAllPosts(request, response) {
        let allPosts = database.findAllPosts()
        response.send(allPosts)
    }

    // function addUserId(body) {
    //     body.uid = new Date().getTime()
    // }

    function addNewPost(request, response) {
        const requestBody = request.body
        // addUserId(requestBody)
        console.log('saving post', requestBody)
        database.addPost(requestBody)
        response.json(requestBody)
    }

    function updatePost(request, response) {
        const requestBody = request.body
        database.updatePost(requestBody)
        response.json(requestBody)
    }

    function clearAllPosts() {
        database.clearAllPosts()
    }

    function deletePost(uid) {
        return database.deletePost(uid)
    }

    // Middleware
    const textParser = bodyParser.json()

    // Routing
    const router = express.Router()
    router.get('/posts', findAllPosts)
    router.post('/addPost', textParser, addNewPost)
    router.post('/updatePost', textParser, updatePost)
    router.post('/clear', clearAllPosts)
    router.post('/delete', textParser, deletePost)

    apiRouter.use('/v2', router)
};

module.exports = setupV2Routes

