import User from '../../model/signupModel.mjs'
import Programs from '../../model/programModel.mjs'
import Posts from '../../model/postModel.mjs'
import Booking from '../../model/bookingModel.mjs'
import Description from '../../model/descriptionModel.mjs'
import Categories from '../../model/categoryModel.mjs'
import Chat from '../../model/chatSchema.mjs'
import { createJwt } from '../../middleware/jwtAuth.mjs'
import { verifyOtp } from '../../nodeMailer/nodeMailer.mjs'
import { sendOtpMessage } from '../../nodeMailer/nodeMailer.mjs'
import bcrypt from 'bcrypt'



export function userSignupHlpr({ firstName, lastName, email, password, otp }) {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email })
        if (!user) {

            verifyOtp(otp).then((result) => {
                if (result.otp == true) {
                    let saltRounds = 11;

                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        bcrypt.hash(password, salt, function (err, hash) {
                            let userDetails = new User({
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                password: hash,
                            })
                            userDetails.save()

                            const token = createJwt({
                                email: email,
                                password: password
                            })
                            let isUser = {
                                is: false,
                                token: token,
                                serverOtp: true


                            }
                            resolve(isUser)

                        });
                    });
                } else {
                    let isUser = {
                        is: false,
                        serverOtp: false,
                        token: null
                    }
                    resolve(isUser)
                }
            })

        } else {
            let isUser = {
                is: true,
                token: null,

            }
            resolve(isUser)
        }
    })
}

export function userLoginHlpr({ email, password }) {
    let status = {}

    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({ email });

        if (!user) {
            status.isuser = false
            resolve(status)
        } else {

            bcrypt.compare(password, user.password, function (err, result) {

                if (result) {
                    const token = createJwt({
                        email: email,
                        password: password
                    })
                    status.isuser = true
                    status.isPass = true
                    status.token = token
                    status.blocked = user.isBlocked
                    resolve(status)
                } else {
                    status.isuser = true
                    status.isPass = false
                    resolve(status)
                }
                console.log(err);


            });
        }
    })
}

export function checkArtistNow(email) {
    return new Promise(async (resolve, reject) => {
        await User.aggregate([
            { $match: { email: email } }, { $match: { isArtist: true } }
        ]).then((actorCheck) => {
            actorCheck.length > 0 ? resolve({ timeOut: false, isArtist: true }) : resolve({ timeOut: false, isArtist: false });
        })

    })

}

export function artistRegister(details, email) {
    return new Promise(async (resolve, reject) => {
        await User.updateOne({ email: email }, { $set: { isArtist: true, about: details.about, domain: details.domain } }).then(() => {
            resolve({ artistDone: true })
        })
    })

}

export function savePropic(body, email) {
    return new Promise(async (resolve, reject) => {
        await User.updateOne({ email: email }, {
            $set:
                { dpimage: body.image }
        }).then(re => {
            resolve({ add: true })
        }).catch(err => console.log(err))

    })
}


export function takedp(email) {

    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }
        ).then(res => {
            resolve(res)
        }).catch(err => {
            resolve(err)
        })

    })
}
export function submitPgToDB(programDetails, email) {
    return new Promise(async (resolve, reject) => {
        await User.find({ email: email }).then((result) => {
            new Programs({
                name: programDetails.name,
                selectedDaates: programDetails.selectedDaates,
                category: programDetails.category,
                amount: programDetails.amount,
                description: programDetails.description,
                imageArray: programDetails.imageArray,
                vdoFile: programDetails.videoUrl,
                user: result[0]._id
            }).save()
            resolve({ Program: true })
        }).catch(err => resolve({ Program: false }))
    })
}

export function viewPr(email) {
    return new Promise(async (resolve, rejecct) => {
        await User.findOne({ email: email }).then(async (user) => {
            await Programs.find({ user: user._id }).then(result => {

                resolve(result)
            })
        })

    })

}

export function tekeSingle(objid) {
    return new Promise(async (resolve, reject) => {
        if (objid == null) {
            resolve({ id: null })
        } else {
            await Programs.findOne({ _id: objid.id }).then(result => {
                resolve(result)
            }).then(err => resolve({ Program: false }))
        }
    })
}

export function addPosts(body, email) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(res => {
            new Posts({
                images: body.images,
                coments: body.coments,
                user: res._id
            }).save()
            resolve({ posted: true })
        })

    })
}

export function pickPostsDb(email, page) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(user => {
            Posts.find({ user: user._id }).sort({ createdAt: -1 }).limit(9 * page).then(res => {

                resolve(res)
            })
        })

    })
}

export function bringPsts(email) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(async (res) => {
            console.log(res);
            await Programs.find({ user: { $ne: res._id }, isBlocked: false }).then(Programs => {
                resolve(Programs)
            })
        })

    })
}

export function takeOnePg(id) {
    return new Promise((resolve, reject) => {
        Programs.findById(id.id).populate('user').then(result => {
            resolve(result)
        })
    })
}

export function bookPg(bookingDetatils, email) {
    let booking = { ...bookingDetatils, userID: email }
    return new Promise((resolve, reject) => {
        Programs.findOneAndUpdate({ _id: booking.program_id }, { $inc: { bookingCount: 1 }, $push: { selectedDaates: bookingDetatils.date } }, { new: true }, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        })
        new Booking(booking).save().then(res => {
            resolve({ booked: true })
        })
    })
}

export function takeBookedPg(email) {
    return new Promise((resolve, reject) => {
        Booking.find({ userID: email }).sort({ date: 1 }).populate('program_id').then(res => {
            resolve(res)
        })
    })
}

export function takeHostBooking(id) {
    return new Promise((resolve, reject) => {
        let bookings = {}
        let pending = []
        let accepted = []
        let history = []
        Booking.find({ program_id: id.id, isAccepted: false, rejected: false }).sort({ date: 1 }).then(res => {
            res.forEach(result => {
                if (new Date(result.date) > new Date()) {
                    pending.push(result)
                }
            })
            bookings.pend = pending
            Booking.find({ program_id: id.id, isAccepted: true }).sort({ date: 1 }).then(res => {
                res.forEach(result => {
                    if (new Date(result.date) > new Date()) {
                        accepted.push(result)
                    }
                })
                bookings.acc = accepted
                Booking.find({ program_id: id.id, }).sort({ date: 1 }).then(res => {
                    res.forEach(result => {
                        if (new Date(result.date) < new Date()) {
                            history.push(result)
                        }
                    })
                    bookings.his = history
                    resolve(bookings)
                })
            })
        })
    })
}

export function programReject(id) {
    return new Promise((resolve, reject) => {
        Booking.findById(id.id).then(res => {
            Programs.findOneAndUpdate({ _id: res.program_id }, { $inc: { bookingCount: -1 } }, { new: true }, (err, data) => {
                if (err) console.log(err);
                console.log(data);
            })
        })
        Booking.updateOne({ _id: id.id }, { $set: { rejected: true } }).then(res => {
        })
        resolve({ reject: true })
    })
}

export function programAccept(id) {
    return new Promise((resolve, reject) => {
        Booking.findById(id.id).then(res => {
            let date = new Date(res.date)
            Programs.findOneAndUpdate({ _id: res.program_id }, { $push: { selectedDaates: date } })
            Programs.findOneAndUpdate({ _id: res.program_id }, { $inc: { bookingCount: -1 } }, { new: true }, (err, data) => {
                if (err) console.log(err);
                console.log(data);
                Booking.updateMany({ date: res.date }, { $set: { rejected: true } }).then(() => {
                    Booking.updateOne({ _id: id.id }, { $set: { isAccepted: true, rejected: false } }).then(() => {
                        resolve({ accepted: true })
                    })
                })
            })


        })


    })
}

export function usersFetch(email) {
    return new Promise((resolve, reject) => {
        User.find({ email: { $ne: email } }).sort({ hypeCount: -1 }).then(res => {
            resolve(res)
        })
    })


}

export function userDataFetch(id) {
    return new Promise((resolve, reject) => {
        User.findById(id.id).then(res => {
            resolve(res)
        })
    })
}

export function postsForUser(id) {
    return new Promise((resolve, reject) => {
        Posts.find({ user: id.id }).sort({ createdAt: -1 }).then(res => {
            resolve(res)
        })
    })
}

export function chat(content) {
    return new Promise(async (resolve, reject) => {
        
        const { from, to, message } = content;
        const newMessage = await Chat.create({
            message: message,
            chatUsers: [from, to],
            sender: from
        })
        resolve(newMessage)
    })
}

export function takeChat(body) {

    return new Promise(async (resolve, reject) => {
        let newMessages = []
        const from = body.userid1;
        let to = body.userid2

        await Chat.find({
            chatUsers: {
                $all: [from, to]
            }
        }).sort({ updateAt: 1 }).then(messages => {
            messages.map(msg => {
                newMessages.push({
                    myself: msg.sender.toString() === from,
                    message: msg.message,
                    hr: msg.updatedAt.getHours(),
                    min: msg.updatedAt.getMinutes()
                })
            })
            resolve(newMessages)
        })

    })
}

export function takePeopleMessage(id, email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email, MessagedPeople: id.toId }).then(res => {
            if (!res) {
                User.findOneAndUpdate({ email: email }, { $push: { MessagedPeople: id.toId } }).then(result => {
                    resolve(result)
                    User.findOne({_id:id.toId , MessagedPeople: result._id}).then(res=>{
                        if(!res){
                            User.findOneAndUpdate({_id:id.toId},{$push: { MessagedPeople: result?._id }})
                        }
                    })
                }).catch((error) => { console.log(error, "error"); })
            } else {
                User.findOneAndUpdate({ email: email }).then(result=>{

                    User.findOne({_id:id.toId , MessagedPeople: result._id}).then(res=>{
                        if(!res){
                            User.findOneAndUpdate({_id:id.toId},{$push: { MessagedPeople: result?._id }})
                        } })
                        resolve(res) 
                    })
            }

        })
    })
}

export function takeUsersChat(idArr) {
    return new Promise(async (resolve, reject) => {
        var arr = [];

        for (let i = 0; i < idArr.people.length; i++) {

            await User.findOne({ _id: idArr.people[i] }).then(res => {
                arr.unshift(res)
                if (arr.length == idArr.people.length) {
                    resolve(arr)
                }

            })
        }
    })
}

export function usersAll(email) {
    return new Promise((resolve, reject) => {
        User.find({ email: { $ne: email } }).sort({ hypeCount: -1 }).then(res => {
            resolve(res)
        })
    })
}

export function descTake() {
    return new Promise((resolve, rejecct) => {
        Description.find().then(res => {
            resolve(res)
        })
    })
}

export function postDelete({ id }) {
    return new Promise((resolve, rejecct) => {
        Posts.findOneAndDelete({ _id: id }).then(res => {
            resolve({ delete: true })
        })
    })
}

export function hypeNow(email, userid) {
    return new Promise((resolve, reject) => {
        User.updateOne({ _id: userid.userId, hype: { $nin: [email] } }, { $push: { hype: email } }).then((res) => {
            resolve()

        }).catch(err => console.log(err))
    })
}


export function unHypeNow(email, userid) {
    return new Promise((resolve, reject) => {
        User.updateOne({ _id: userid.userId }, { $pull: { hype: email } }).then(res => {
            resolve()
        })
    })
}

export function hypeStatus(email, user) {
    return new Promise((resolve, rejecct) => {
        User.findOne({ _id: user.userId, hype: { $in: [email] } }).then(res => {
            if (!res) {
                resolve({ hype: false })
            } else {
                resolve({ hype: true })
            }
        })
    })
}

export function takeCategory() {
    return new Promise((resolve, rejecct) => {
        Categories.find({ user: true }).then(res => {
            resolve(res)
        })
    })
}

export function takeProgramDomain() {
    return new Promise((resolve, rejecct) => {
        Categories.find({ user: false }).then(res => {
            resolve(res)
        })
    })
}
export function messagingPeople(email) {
    return new Promise((resolve, rejecct) => {
        let messageArray = []
        let count = 0;
        User.findOne({ email }).then(res => {
            res.hype.map(e => {
                count++
                User.findOne({ email: e }).then(result => {
                    messageArray.push(result)
                    count == res.hype.length && resolve({ messageArray: messageArray, self: res })

                })
            })
        })
    })
}

export function searchPg(email, cate) {
    return new Promise(async (resolve, reject) => {
        await User.findOne({ email: email }).then(async (res) => {
            const regex = new RegExp(cate.category, 'i');
            await Programs.find({ user: { $ne: res._id }, isBlocked: false, category: regex }).then(Programs => {
                resolve(Programs)
            })
        })

    })

}

export function takeUsersBySearch(name) {
    return new Promise((resolve, reject) => {
        const regex = new RegExp(name.name);
        User.find({ domain: regex }).then(res => {
            resolve(res)

        })
    })
}
export function sentOtpForForgetPass(clientEmail) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: clientEmail.email }).then(res => {
            if (!res) {
                resolve({ email: false })
            } else {
                sendOtpMessage(res.email)
                resolve({ email: true,clientEmail:clientEmail.email })
            }
        })
    })
}
export function otpVerify(otp) {
    return new Promise((resolve, rejecct) => {
        verifyOtp(otp.otp).then(res => {
            res.otp == true ? resolve({ otp: true }) : resolve({ otp: false })
        })
    })
}

export function passChange(pass) {
    return new Promise((resolve, rejecct) => {
        let saltRounds = 11;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(pass.pass, salt, function (err, hash) {
                User.findOneAndUpdate({email:pass.email},{$set:{password:hash}}).then(()=>{
                    resolve({pass:true})
                })
            })
        })

    })
}