import { RESPONSE_CODES, Collection } from "../config/constants.js";
import { insert, findOne } from '../modals/modal.js'
import { ObjectId } from "mongodb";
import moment from "moment";

let current_timestamp = moment().format('MMMM Do YYYY, h:mm:ss')

const authController = {
    registerUser: async (req, res) => {
        try {
            let response = {}
            let data = req.body;
            let condition = { "$or": [{ email: data.email }, { username: data.username }, { phone: data.phone }] }
            const checkUserInfo = await findOne(Collection.User, condition);
            if (checkUserInfo) {
                if (checkUserInfo.email === data.email) {
                    response = {
                        status: 1,
                        statusCode: RESPONSE_CODES.POST,
                        msg: 'Email already exists !'
                    }
                } else if (checkUserInfo.username === data.username) {
                    response = {
                        status: 1,
                        statusCode: RESPONSE_CODES.POST,
                        msg: 'Username Already exists !'
                    }
                } else {

                    response = {
                        status: 1,
                        statusCode: RESPONSE_CODES.POST,
                        msg: "Phone Is Already Exist "

                    }
                }
            } else {
                console.log("ddd")
                data.address = req.body.address
                data.city = req.body.city
                data.loc = { type: "Point", coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)] }
                data.created_at = current_timestamp
                data.updated_at = current_timestamp
                data.isDeleted = false
                data.deleted_at = null
                await insert(Collection.User, data);

                // let verificationInfo = {
                //     verificationCode: otp(),
                //     email: data.email,
                //     maxAttempt: 0,
                //     created_at: current_timestamp,
                //     updated_at: current_timestamp,
                //     isDeleted_at: false,
                //     deleted_at: null,
                //     isEmailVerified: false
                // }
                // await insert(Collection.VerifyOtp, verificationInfo);
                // data.verificationCode = otp()
                // sendmail(data)
                response = {
                    status: 1,
                    statusCode: RESPONSE_CODES.POST,
                    msg: "Data inserted Successfully",
                    data: data
                }

            }
            res.status(response.statusCode).json(response);

        } catch (error) {
            res.status(500).send({
                status: 0,
                statusCode: RESPONSE_CODES.ERROR,
                msg: "Server Error"
            })

        }
    }
}

export default authController;