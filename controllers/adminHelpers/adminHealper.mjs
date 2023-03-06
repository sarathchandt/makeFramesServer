import User from '../../model/signupModel.mjs'
import Programs from '../../model/programModel.mjs'
import Posts from '../../model/postModel.mjs'
import Description from '../../model/descriptionModel.mjs'
import Booking from '../../model/bookingModel.mjs'
import Chat from '../../model/chatSchema.mjs'
import Categories from '../../model/categoryModel.mjs'
import { createJwt } from '../../middleware/jwtAuth.mjs'



export function GraphData() {
    return new Promise((resolve, reject) => {
        let graph = []
        let year = new Date().getFullYear()

        User.count({ createdAt: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-02-01`) } }).then(res => {
            graph.push({ month: 'jan', count: res })

            User.count({ createdAt: { $gte: new Date(`${year}-02-01`), $lte: new Date(`${year}-03-01`) } }).then(res => {
                graph.push({ month: 'feb', count: res })

                User.count({ createdAt: { $gte: new Date(`${year}-03-01`), $lte: new Date(`${year}-04-01`) } }).then(res => {
                    graph.push({ month: 'mar', count: res })

                    User.count({ createdAt: { $gte: new Date(`${year}-04-01`), $lte: new Date(`${year}-05-01`) } }).then(res => {
                        graph.push({ month: 'apr', count: res })

                        User.count({ createdAt: { $gte: new Date(`${year}-05-01`), $lte: new Date(`${year}-06-01`) } }).then(res => {
                            graph.push({ month: 'may', count: res })

                            User.count({ createdAt: { $gte: new Date(`${year}-06-01`), $lte: new Date(`${year}-07-01`) } }).then(res => {
                                graph.push({ month: 'jun', count: res })

                                User.count({ createdAt: { $gte: new Date(`${year}-07-01`), $lte: new Date(`${year}-08-01`) } }).then(res => {
                                    graph.push({ month: 'jul', count: res })

                                    User.count({ createdAt: { $gte: new Date(`${year}-08-01`), $lte: new Date(`${year}-09-01`) } }).then(res => {
                                        graph.push({ month: 'aug', count: res })

                                        User.count({ createdAt: { $gte: new Date(`${year}-09-01`), $lte: new Date(`${year}-10-01`) } }).then(res => {
                                            graph.push({ month: 'sep', count: res })

                                            User.count({ createdAt: { $gte: new Date(`${year}-10-01`), $lte: new Date(`${year}-11-01`) } }).then(res => {
                                                graph.push({ month: 'oct', count: res })

                                                User.count({ createdAt: { $gte: new Date(`${year}-11-01`), $lte: new Date(`${year}-12-01`) } }).then(res => {
                                                    graph.push({ month: 'nov', count: res })

                                                    User.count({ createdAt: { $gte: new Date(`${year}-12-01`), $lte: new Date(`${year}-12-31`) } }).then(res => {
                                                        graph.push({ month: 'dec', count: res })

                                                        resolve(graph)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

export function graphBooking() {
    return new Promise((resolve, reject) => {
        let graph = []
        let year = new Date().getFullYear()

        Booking.count({ createdAt: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-02-01`) } }).then(res => {
            graph.push({ month: 'jan', count: res })

            Booking.count({ createdAt: { $gte: new Date(`${year}-02-01`), $lte: new Date(`${year}-03-01`) } }).then(res => {
                graph.push({ month: 'feb', count: res })

                Booking.count({ createdAt: { $gte: new Date(`${year}-03-01`), $lte: new Date(`${year}-04-01`) } }).then(res => {
                    graph.push({ month: 'mar', count: res })

                    Booking.count({ createdAt: { $gte: new Date(`${year}-04-01`), $lte: new Date(`${year}-05-01`) } }).then(res => {
                        graph.push({ month: 'apr', count: res })

                        Booking.count({ createdAt: { $gte: new Date(`${year}-05-01`), $lte: new Date(`${year}-06-01`) } }).then(res => {
                            graph.push({ month: 'may', count: res })

                            Booking.count({ createdAt: { $gte: new Date(`${year}-06-01`), $lte: new Date(`${year}-07-01`) } }).then(res => {
                                graph.push({ month: 'jun', count: res })

                                Booking.count({ createdAt: { $gte: new Date(`${year}-07-01`), $lte: new Date(`${year}-08-01`) } }).then(res => {
                                    graph.push({ month: 'jul', count: res })

                                    Booking.count({ createdAt: { $gte: new Date(`${year}-08-01`), $lte: new Date(`${year}-09-01`) } }).then(res => {
                                        graph.push({ month: 'aug', count: res })

                                        Booking.count({ createdAt: { $gte: new Date(`${year}-09-01`), $lte: new Date(`${year}-10-01`) } }).then(res => {
                                            graph.push({ month: 'sep', count: res })

                                            Booking.count({ createdAt: { $gte: new Date(`${year}-10-01`), $lte: new Date(`${year}-11-01`) } }).then(res => {
                                                graph.push({ month: 'oct', count: res })

                                                Booking.count({ createdAt: { $gte: new Date(`${year}-11-01`), $lte: new Date(`${year}-12-01`) } }).then(res => {
                                                    graph.push({ month: 'nov', count: res })

                                                    Booking.count({ createdAt: { $gte: new Date(`${year}-12-01`), $lte: new Date(`${year}-12-31`) } }).then(res => {
                                                        graph.push({ month: 'dec', count: res })

                                                        resolve(graph)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    })

}
export function frtchDetails() {
    return new Promise((resolve, reject) => {
        let details = []
        Booking.count().then(res => {
            details.push({ totalBooking: res })
            User.count().then(res => {
                details.push({ totalUser: res })
                User.count({ isArtist: true }).then(res => {
                    details.push({ isArtist: res })
                    User.count({ isProducer: true }).then(res => {
                        details.push({ isProducer: res })
                        resolve(details)
                    })
                })

            })
        })
    })
}

export function makeLogin(id) {
    return new Promise(async(resolve, reject) => {
        if (id.password === process.env.AdminPass && id.adminId === process.env.AdminId) {
          let token = await  createJwt({id:id.adminId}) 
            resolve({ admin: true, pass: true, Id: true , token:token})

        } else if (id.password !== process.env.AdminPass && id.adminId === process.env.AdminId) {
            resolve({ admin: false, pass: false, Id: true })
        } else if (id.password === process.env.AdminPass && id.adminId !== process.env.AdminId) {
            resolve({ admin: false, pass: true, Id: false })
        } else {
            resolve({ admin: false, pass: false, Id: false })
        }
    })
}

export function takeArtistAdmin(){
    return new Promise((resolve, reject)=>{
        User.find({isArtist:true}).sort({firstName:1}).then(res=>{
            resolve(res) 
        })
    })
}

export function artistTakeByRegex(body){
    return new Promise((resolve, reject)=>{
        try{
            const regex = new RegExp(body.name, 'i');
            if(body.from == 'artist'){
                User.find({ firstName: regex ,isArtist:true}).sort({firstName:1}).then(res=>{ 
                    resolve(res)
                })
            }else if(body.from == 'producer'){
                User.find({ firstName: regex ,isProducer:true}).sort({firstName:1}).then(res=>{ 
                    resolve(res)
                }) 
            }
        }catch(err){
            User.find({isArtist:true}).sort({firstName:1}).then(res=>{
                resolve(res) 
            })
        }
    })
}

export function blockNow(id){
    return new Promise((resolve, reject)=>{
        User.updateOne({_id:id.userId},{$set:{isBlocked:true}}).then(res=>{
            resolve({blocked:true})
        })
    })
}

export function unBlockNow (id) {
    return new Promise((resolve, reject)=>{
        User.updateOne({_id:id.userId},{$set:{isBlocked:false}}).then(res=>{
            resolve({unBlocked:true})
        })
    })
}
export function takeProducerAdmin(){
    return new Promise((resolve, reject)=>{
        User.find({isProducer:true}).sort({firstName:1}).then(res=>{
            resolve(res) 
        })
    })
} 

export function takeProgramsForAdmin(){
    return new Promise((resolve, reject)=>{
        Programs.find().sort({bookingCount:-1}).populate('user').then(res=>{
            resolve(res);
        })
    })
}

export function programByRegex(body){
    return new Promise((resolve, reject)=>{
        try{
            const regex = new RegExp(body.name, 'i');
                Programs.find({ name: regex }).sort({name:1}).then(res=>{ 
                    resolve(res)
                })
        }catch(err){
            Programs.find().sort({bookingCount:-1}).populate('user').then(res=>{
                resolve(res);
            })
        }
    })
}

export function unBlockItNow(body){
    return new Promise((resolve, reject)=>{
        Programs.updateOne({_id:body.userId},{$set:{isBlocked:false}}).then(res=>{
            resolve({unBlocked:true})
        })
    })
}
export function blockItNow(body){
    return new Promise ((resolve, reject)=>{
        Programs.updateOne({_id:body.userId},{$set:{isBlocked:true}}).then(res=>{
            resolve({blocked:true})
        })
    })
}

export function takeCategories(){
        return new Promise ((resolve, reject)=>{
            Categories.find().then(res=>{

                resolve(res)
            })
        })
}
export function categoryAdd({cate,user}){
    
    return new Promise((resolve, reject)=>{
        if(user==true){

            cate.length==0 ? resolve({length:false}):
            
            Categories.findOne({name:cate.toUpperCase(),user:true}).then(res=>{
                if(!res){
                    new Categories({name:cate.toUpperCase(),user:user}).save().then(()=>{
                        resolve({cate:true})
                    })
                }else{
                    resolve({cate:false})
                }
            })
        }else{
            
            cate.length==0 ? resolve({length:false}):
            
            Categories.findOne({name:cate.toUpperCase(),user:false}).then(res=>{
                if(!res){
                    new Categories({name:cate.toUpperCase(),user:user}).save().then(()=>{
                        resolve({cate:true})
                    })
                }else{
                    resolve({cate:false})
                }
            })
        }
      
        
    })
}

export function cateRemove({id,indecator}){
    return new Promise((resolve,reject)=>{
        if(indecator==true){
            Categories.findOneAndRemove({_id:id,user:true}).then(()=>{
                resolve()
            })
        }else{
            Categories.findOneAndRemove({_id:id,user:false}).then(()=>{
                resolve()
            })
        }
           
    })
}

export function AdminDescription({desc}){
    return new Promise((resolve, reject)=>{
        Description.deleteMany().then(()=>{

            Description({
                desc:desc
            }).save().then(()=>{
                resolve()
            })
        })
    })
}

export function DescTake(){
    return new Promise((resolve,reject)=>{
        Description.find().sort({createdAt:-1}).then(res=>{
            resolve(res)
        })
    })
}

export function changeState({id}){
    return new Promise((resolve, reject)=>{
        Description.deleteMany().then(()=>{
            Description.findOneAndUpdate({_id:id},{$set:{current:true}}).then(res=>{
                resolve()
            })
        })
    })
}