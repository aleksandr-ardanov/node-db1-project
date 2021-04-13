const db = require('../../data/db-config')

const getAll = () => {
  return db("accounts")
}

const getById = id => {
  return db("accounts").where({id}).first()
}

const create = async account => {
  const [id] = await db("accounts").insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db("accounts").where("id",id).update(account)
  return getById(id)
}

const deleteById = async id => {
  const post = await getById(id)
   await db("accounts").where("id",id).delete()
  return post
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
