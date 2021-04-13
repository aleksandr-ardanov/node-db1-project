const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/:id',checkAccountId, (req, res) => {
  res.status(200).json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
   Account.create(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(err =>{
      next(err)
    })
})

router.put('/:id',checkAccountId, checkAccountPayload,
 checkAccountNameUnique, (req, res, next) => {
  const {id} = req.params;
  Account.updateById(id, req.body)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(err =>{
      next(err)
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const {id} = req.params;
  Account.deleteById(id)
    .then(deleted => {
      res.status(200).json(deleted)
    })
    .catch(err => {
      next(err)
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({message: err.message})
})


module.exports = router;
