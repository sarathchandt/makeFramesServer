import jwt from 'jsonwebtoken'
import {sendOtpMessage} from '../nodeMailer/nodeMailer.mjs'
import User from '../model/signupModel.mjs'


import {
    checkArtistNow,
    userSignupHlpr,
    userLoginHlpr,
    artistRegister,
    savePropic,
    takedp,
    submitPgToDB,
    viewPr,
    descTake,
    tekeSingle,
    addPosts,
    pickPostsDb,
    bringPsts,
    takeOnePg,
    bookPg,
    usersAll,
    takeBookedPg,
    takeHostBooking,
    programReject,
    programAccept,
    usersFetch,
    userDataFetch,
    postsForUser,
    chat,
    unHypeNow,
    takeUsersChat,
    takeChat,
    takePeopleMessage,
    postDelete,
    hypeNow,
    hypeStatus,
    takeCategory,
    searchPg,
    takeProgramDomain,
    messagingPeople,
    takeUsersBySearch,
    sentOtpForForgetPass,
    otpVerify,
    passChange
} from "./userHelpers/userHelper.mjs";


export function userSignup(req, res) {
        userSignupHlpr(req.body).then((response) => {
            res
            .status(201)
            .json(response)  
        })
}

export function isUser(req, res) { 
    
    const token = req.body.token
    if (token == null) { 
        res.json({ user: false })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                res.json({ user: false })
            } else { 
                await User.findOne({email:user.email}).then((result)=>{
                    
                    res.json({ user: true, firstName:result?.firstName, lastName:result?.lastName, id:result?._id, blocked:result?.isBlocked }) 
                })
 
            }
        })
    }
}

export function userLogin(req, res) {
        userLoginHlpr(req.body).then((result) => {
            res
            .status(200)
            .json(result)  
        })
}


export  function sendOtp(req,res){
    sendOtpMessage(req.body.email).then((result)=>{
        res
        .status(200)
        .json(result)
    })
}

export function checkArtist(req,res){
    checkArtistNow(res.locals.userId).then((result)=>{
        res
        .status(200)
        .json(result)
    })
}

export function registerArtist(req,res){
    artistRegister(req.body, res.locals.userId).then((result)=>{
        res
        .status(200)
        .json(result)
    }) 
}
export function profilePic (req, res){
    savePropic(req.body,res.locals.userId).then(result=>{
        res .json(result)
            .status(200)
    })
}

export function bringDp(req, res){
    takedp(res.locals.userId).then(result=>{
        res.json(result).status(200)
    });
    
}

export function submitProgram(req, res){
    submitPgToDB(req.body,res.locals.userId).then((result)=>{
            res
            .status(200)
            .json(result)
    })
} 

export function viewPrograms(req, res){
    viewPr(res.locals.userId).then(result=>{
        res
        .status(200) 
        .json(result)
    })
}

export function takeSingleProgram(req,res){
    tekeSingle(req.body).then(result=>{
        res.status(200).json(result)
    })
}
export function addPost(req,res){
    addPosts(req.body,res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function pickPosts(req,res){
    pickPostsDb(res.locals.userId, req.page).then(result=>{
        res.status(200).json(result)
    })
}

export function bringAllpost(req, res){
    bringPsts(res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function fetchOneProgramBook(req,res){
    takeOnePg(req.body).then(result=>{
        res.
            json(result)
            .status(200)
    })
}

export function bookProgram(req, res){
    bookPg(req.body, res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function fettchBookedPg(req, res){
    takeBookedPg(res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function takeBookingForHost(req, res){
    takeHostBooking(req.body)
    .then(result=>{
        res.json(result).status(200)
    })
}
export function rejectProgram(req, res){
    programReject(req.body).then(result=>{
        res.status(200).json(result)
    })
}

export function acceptProgram(req, res){
    programAccept(req.body).then(result=>{
        res.status(200).json(result)
    }) 
}

export function fetchUsers(req, res){
    usersFetch(res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function fetchUserData(req, res){
    userDataFetch(req.body).then(result=>{
        res.status(200).json(result)
    })
}

export function fetchPostsOfUser(req, res){
    postsForUser(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function message(req, res){
    chat(req.body).then(result=>{
        res.json(result).status(200)
    }).catch(err=>{
        res.json('internal server error').status(500)
        console.log(err)});
}

export function getChat(req, res){
    takeChat(req.body).then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json('internal server error')
    })
}

export function tekeMessagePeople(req, res){
    takePeopleMessage(req.body, res.locals.userId).then(result=>{
        res.json(result).status(200)
    }).catch(err=>{
        res.status(500).json('internal server error')
    })
}

export function takeUsersForChat(req, res){
    takeUsersChat(req.body).then(result=>{
        res.json(result).status(200)
    }).catch(err=>{res.json('internal server error').status(500)})
}

export function allUsers(req, res){
    usersAll(res.locals.userId).then(result=>{
        res.status(200).json(result)
    })
}

export function takeDescription (req, res){
    descTake().then(result=>{
        res.json(result).status(200)
    })
}

export function deletePost(req, res){
    postDelete(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function hypeHim(req, res){
    hypeNow(res.locals.userId, req.body).then(result=>{
        res.json(result).status(200)
    })
}
export function unHypeHim(req, res){
    unHypeNow(res.locals.userId, req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function takeHypeStatus(req,res){
    hypeStatus(res.locals.userId,req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function getDomain(req, res){
    takeCategory().then(result=>{
        res.status(200).json(result)
    })
}
export function takePeopleForMessage(req, res){
    messagingPeople(res.locals.userId).then(result=>{
        console.log(result);
        res.json(result).status(200)
    })
}

export function getProgramDomain(req, res){
        takeProgramDomain().then(result=>{
            res.json(result).status(200)
        })
}
export function bringSearchedPg(req, res){
    searchPg(res.locals.userId,req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function fetchUsersBySearch(req, res){
    takeUsersBySearch(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function forgotPass(req, res){
    sentOtpForForgetPass(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function verifyOtpForgot(req, res){
    otpVerify(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function changePassword(req, res){
    passChange(req.body).then(result=>{
        res.json(result).status(200)
    })
}