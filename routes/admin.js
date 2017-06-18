const router = require('express').Router()
const User = require('../controllers/users')
const Task = require('../controllers/tasks')
const Authentization = require('../controllers/authentization')

router.use(Authentization.adminAuth)

router.get('/users', User.showAll)
router.post('/users', User.createAdmin)
router.delete('/users/:id', User.destroy)
router.put('/users/:id', User.updateAdmin)

router.post('/tasks', Task.create)
router.get('/tasks', Task.showAll)
router.delete('/tasks/:id', Task.destroy)
router.put('/tasks/:id', Task.update)

module.exports = router
