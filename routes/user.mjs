import express, { Route } from "express";
import { userSignup, userLogin, sendOtp } from '../controllers/userControllers.mjs'
// import {authenticateToken} from "../jwtMiddleware/jwtAuth.mjs"
import { isUser } from '../controllers/userControllers.mjs'
import { checkArtist } from '../controllers/userControllers.mjs'
import {
        registerArtist,
        profilePic,
        bringDp,
        submitProgram,
        viewPrograms,
        takeSingleProgram,
        addPost,
        pickPosts,
        bringAllpost,
        fetchOneProgramBook,
        fettchBookedPg,
        takeBookingForHost,
        rejectProgram,
        acceptProgram,
        fetchUsers,
        fetchUserData,
        fetchPostsOfUser,
        takeDescription,
        message,
        getChat,
        takeUsersForChat,
        tekeMessagePeople,
        deletePost,
        hypeHim,
        unHypeHim,
        getDomain,
        bringSearchedPg,
        takeHypeStatus,
        allUsers,
        bookProgram,
        getProgramDomain,
        takePeopleForMessage,
        fetchUsersBySearch,
        forgotPass,
        verifyOtpForgot,
        changePassword
} from '../controllers/userControllers.mjs'

import { verifyToken, verifyTokenHeader } from '../middleware/jsonWTMiddleWare.mjs'

const router = express.Router();







router.route('/signup')
        .post(userSignup)
router.route('/login')
        .post(userLogin)
router.route('/otp')
        .post(sendOtp)
router.route('/forgotPass')
        .post(forgotPass)
router.route('/verifyOtpForgot')
        .post(verifyOtpForgot)
router.route('/changePassword')
        .post(changePassword)
router.route('/loginCheck')
        .post(verifyToken, isUser)
router.route('/checkArtist')
        .post(verifyToken, checkArtist)
router.route('/registerArtist')
        .post(verifyToken, registerArtist)
router.route('/profilePic')
        .post(verifyToken, profilePic)
router.route('/bringDp')
        .post(verifyToken, bringDp)
        .get(verifyTokenHeader, bringDp)
router.route('/submitProgram')
        .post(verifyToken, submitProgram)
router.route('/viewPrograms')
        .post(verifyToken, viewPrograms)
router.route('/takeSingleProgram')
        .post(verifyToken, takeSingleProgram)
router.route('/addPost')
        .post(verifyToken, addPost)
router.route('/pickPosts')
        .post(verifyToken, pickPosts)
router.route('/bringAllpost')
        .post(verifyToken, bringAllpost)
router.route('/fetchOneProgramBook')
        .post(verifyToken, fetchOneProgramBook)
router.route('/bookProgram')
        .post(verifyToken, bookProgram)
router.route('/fetchBookedPg')
        .post(verifyToken, fettchBookedPg)
router.route('/checkBookingHost')
        .post(verifyTokenHeader, takeBookingForHost)
router.route('/rejectProgram')
        .post(verifyTokenHeader, rejectProgram)
router.route('/acceptProgram')
        .post(verifyTokenHeader, acceptProgram)
router.route('/fetchUsers')
        .get(verifyTokenHeader, fetchUsers)
router.route('/fetchUserData')
        .post(verifyTokenHeader, fetchUserData)
router.route('/fetchPostsOfUser')
        .post(verifyTokenHeader, fetchPostsOfUser)
router.route('/message')
        .post(verifyTokenHeader, message)
router.route('/getChat')
        .post(verifyTokenHeader, getChat)
router.route('/tekeMessagePeople')
        .post(verifyTokenHeader, tekeMessagePeople)
router.route('/takeUsersForChat')
        .post(verifyTokenHeader, takeUsersForChat)
router.route('/allUsers')
        .get(verifyTokenHeader, allUsers)
router.route('/takeDescription')
        .get(verifyTokenHeader, takeDescription)
router.route('/deletePost')
        .post(verifyTokenHeader, deletePost)
router.route('/hypeHim')
        .post(verifyTokenHeader, hypeHim)
router.route('/unHypeHim')
        .post(verifyTokenHeader, unHypeHim)
router.route('/getDomain')
        .get(verifyTokenHeader,getDomain)
router.route('/getProgramDomain')
        .get(verifyTokenHeader,getProgramDomain)
router.route('/takeHypeStatus')
        .post(verifyTokenHeader, takeHypeStatus)
router.route('/takePeopleForMessage')
        .get(verifyTokenHeader,takePeopleForMessage)
router.route('/bringSearchedPg')
        .post(verifyToken,bringSearchedPg)
router.route('/fetchUsersBySearch')
        .post(verifyTokenHeader,fetchUsersBySearch)


export default router 