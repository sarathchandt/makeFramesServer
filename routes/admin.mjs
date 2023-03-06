import express from "express";
import {
    takeGraphUserData,
    detailsFetch,
    bookingGraph,
    unBlockIt,
    takeArtistByRegex,
    loginAdmin,
    fetchDetailsOfArtist,
    blockHim,
    takeDesc,
    blockIt,
    change,
    unBlockHim,
    takeCategory,
    takeProgramByRegex,
    removeCate,
    fetchDetailsOfProducer,
    uploadDecri,
    addCategory,
    fetchDetailsOfProgram
} from '../controllers/adminControllers.mjs'
import {verifyTokenAdmin} from '../middleware/jsonWTMiddleWare.mjs'
const router = express.Router()


router.route('/loginAdmin') 
    .post(loginAdmin)
router.route('/checkAdminToken')
    .get(verifyTokenAdmin)

router.route('/takeGraphUserData')
    .get(takeGraphUserData)
router.route('/bookingGraph')
    .get(bookingGraph)
router.route('/detailsFetch')
    .get(detailsFetch)
router.route('/fetchDetailsOfArtist')
    .get(fetchDetailsOfArtist)
router.route('/takeArtistByRegex')
    .post(takeArtistByRegex)
router.route('/blockHim')
    .post(blockHim)
router.route('/unBlockHim')
    .post(unBlockHim)
router.route('/fetchDetailsOfProducer')
    .get(fetchDetailsOfProducer)
router.route('/fetchDetailsOfProgram')
    .get(fetchDetailsOfProgram)
router.route('/takeProgramByRegex')
    .post(takeProgramByRegex)
router.route('/unBlockIt')
    .post(unBlockIt)
router.route('/blockIt')
    .post(blockIt)
router.route('/takeCategory')
    .get(takeCategory)
router.route('/addCategory')
    .post(addCategory)
router.route('/removeCate')
    .post(removeCate)
router.route('/uploadDecri')
    .post(uploadDecri)
router.route('/takeDesc')
    .get(takeDesc)
router.route('/change')
    .post(change)

export default router