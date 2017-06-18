const router = require('express').Router()
const task = require('../controllers/tasks')
const Authentization = require('../controllers/authentization')

router.post('/', Authentization.authentication, task.create)
router.get('/', task.showByUser)
router.put('/:id', Authentization.creatorAuth, task.update)
router.delete('/:id', Authentization.creatorAuth, task.destroy)

module.exports = router
