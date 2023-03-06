import {GraphData,
    frtchDetails,
    makeLogin,
    takeArtistAdmin,
    artistTakeByRegex,
    blockNow,
    unBlockNow,
    blockItNow,
    DescTake,
    takeProducerAdmin,
    unBlockItNow,
    takeCategories,
    changeState,
    programByRegex,
    AdminDescription,
    takeProgramsForAdmin,
    cateRemove,
    categoryAdd,
    graphBooking} from '../controllers/adminHelpers/adminHealper.mjs'

export function takeGraphUserData(req, res){
    GraphData().then(result=>{
        res.status(200).json(result)
    })
}

export function bookingGraph(req, res){
    graphBooking().then(result=>{
        res.status(200).json(result)
    })
}

export function detailsFetch(req,res){
    
    frtchDetails().then(result=>{
        res.status(200).json(result)
    })
}
export function loginAdmin(req, res){
    makeLogin(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function fetchDetailsOfArtist(req, res){
    takeArtistAdmin().then(result=>{
        res.status(200).json(result)
    })
}
export function takeArtistByRegex(req, res){
    artistTakeByRegex(req.body).then(result=>{
        res.status(200).json(result)
    })
}
export function blockHim(req, res){
    blockNow(req.body).then(result=>{
        res.status(200).json(result)
    })
}

export function unBlockHim(req, res){
    unBlockNow(req.body).then(result=>{
        res.status(200).json(result)
    })
}
export function fetchDetailsOfProducer(req, res){
    takeProducerAdmin().then(result=>{
        res.json(result).status(200)
    })
}

export function fetchDetailsOfProgram(req, res){
    takeProgramsForAdmin().then(result=>{
        res.json(result).status(200)
    })
}

export function takeProgramByRegex(req, res){
    programByRegex(req.body).then(result=>{
        res.json(result).status(200)
    })
}

export function unBlockIt(req, res){
    unBlockItNow(req.body).then(result=>{
        res.status(200).json(result)
    })
}

export function blockIt(req, res){
blockItNow(req.body).then(result=>{
        res.json(result).status(200)
    })
}
export function takeCategory(req, res){
    takeCategories().then(result=>{
        res.status(200).json(result)
    })
}
export function addCategory(req, res){
    categoryAdd(req.body).then(result=>{
        res.json(result).status(200)
    })
}
export function removeCate(req, res){
  cateRemove(req.body).then(result=>{
    res.json(result).status(200)
  })
}
export function uploadDecri(req, res){
    AdminDescription(req.body).then(result=>{
        res.json(result).status(200)
    })
}
export function takeDesc(req, res){
    DescTake().then(result=>{
        res.json(result).status(200)
    })
}

export function change(req, res){
    changeState(req.body).then(result=>{
        res.json(result).status(200)
    })
}