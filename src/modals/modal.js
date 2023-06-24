import { getDB } from '../config/db.js';

const db = await getDB();


const insert = (model, data) => db.collection(model).insertOne(data)

const find = (model, condition, project = {}) => db.collection(model).find(condition, { projection: project || {} }).limit(5).toArray();

const createIndex = (model, condition) => db.collection(model).createIndex(condition)

const findOne = (model, condition, project = {}) => db.collection(model).findOne(condition, { projection: project || {} })

const update = (model, condition, data) => db.collection(model).updateOne(condition, data)

const aggregate = (model, condition) => db.collection(model).aggregate(condition).limit(5).toArray()


export {
    insert,
    update,
    find,
    findOne,
    aggregate,
    createIndex
}