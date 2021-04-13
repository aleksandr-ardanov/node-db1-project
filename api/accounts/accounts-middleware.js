const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const {name,budget} = req.body;
  if (name!==undefined && budget!==undefined){
    if (typeof name === 'string' && typeof budget ==='number'){
      const trimmed = name.trim();
      if(trimmed.length>=3 && trimmed.length<=100 && budget>=0 && budget<=1000000){
        req.body = {...req.body, name: trimmed}
        next()
      }
      else{
        if (trimmed.length<3 || trimmed.length>100){
          res.status(400).json({ message: "name of account must be between 3 and 100" })
        }
        else if(budget<0 || budget>1000000){
          res.status(400).json({ message: "budget of account is too large or too small" })
        }
      }
    }
    else if (typeof name !=="string"){
      res.status(400).json({ message: "name of account must be a string" })
    }
    else if (typeof budget !== 'number'){
      res.status(400).json({ message: "budget of account must be a number" })
    }
  }
  else{
    res.status(400).json({ message: "name and budget are required" })
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const uniqueName = req.body.name;
  const accounts = await Account.getAll();
  const check = accounts.some(acc => acc.name === uniqueName);
  if (check){
    res.status(400).json({ message: "that name is taken" })
  }
  else{
    next()
  }
}

exports.checkAccountId = async (req, res, next) => {
  const {id} = req.params;
  const account = await Account.getById(id);
  if (account){
    req.account = account;
    next()
  }
  else{
    res.status(404).json({message:`account not found`})
  }
}
