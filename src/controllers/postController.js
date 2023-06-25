import { RESPONSE_CODES, Collection } from "../config/constants.js";
import { insert, update, findOne, find, aggregate } from '../modals/modal.js'
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

const postController = {
    CreatePost: async (req, res) => {
        let response = {}
        try {
            const data = req.body;
            const userId = req.body.userid;
            data.userid = new ObjectId(userId)
            data.created_at = Date.now()
            data.updated_at = Date.now()
            data.isDeleted = false
            data.deleted_at = null
            data.newId = uuidv4()
            await insert(Collection.UserPost, data);
            response = {
                status: 1,
                statusCode: RESPONSE_CODES.POST,
                msg: "Data inserted Successfully",

            }
        } catch (err) {
            response = {
                status: 0,
                statusCode: RESPONSE_CODES.ERROR,
                msg: error
            }
        }
        res.status(response.statusCode).json(response);
    }

}

export default postController