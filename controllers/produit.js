
const Produit = require('../Models/produit');
const express =require( 'express')
const multer =require ("multer")
const path =require ("path")
const crypto =require ("crypto")
const fs =require ("fs");
var router = express.Router()
const port = process.env.PORT || 5000;
let host = `http://localhost:${port}/`;
// photos
var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        if (file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/jpeg") {
            const folderName = path.join(__dirname.substring(0,34)+'/'+'photos')
            // folderName.substring(0,34)
           
            if(!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);  
                        }     
            cb(null, 'photos')


        } else if (file.mimetype == "audio/mpeg" || file.mimetype == "audio/webm" || file.mimetype == "audio/x-wav" || file.mimetype == "audio/ogg" || file.mimetype == "audio/mp3" || file.mimetype == "audio/mp4") {
            const folderName = path.join(__dirname.substring(0,34)+'/'+'audios')
            // folderName.substring(0,34)
           
            if(!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);  
                             }     
            cb(null, 'audios')
        } else if (file.mimetype == "video/mp3" || file.mimetype == "video/mp4") {
            const folderName = path.join(__dirname.substring(0,34)+'/'+'videos')
            // folderName.substring(0,34)
           
            if(!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);  
                             }   
            cb(null, 'videos')
        } else if (file.mimetype == "application/pdf" || file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const folderName = path.join(__dirname.substring(0,34)+'/'+'documents')
            // folderName.substring(0,34)
           
            if(!fs.existsSync(folderName)) {
              fs.mkdirSync(folderName);  
                             }   
            cb(null, 'documents')
        } else {
            cb(null, 'autres')
        }
    },
    filename: function (req, file, cb) {
        let hash = crypto.createHash('md5').update(file.originalname).digest('hex');
        cb(null, hash + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })




// Ajouter Un produits
router.post('/AjouterProduit', upload.single("file"), (req, res,next) =>{

    var file = req.file
    var liste = new Produit({
        title: req.body.title,
        wishlistes:req.body.wishlistes,
        statue:req.body.statue,
        decription:req.body.decription,
        price:req.body.price,
        file:file.filename,
        currency:req.body.currency
        
    });
    liste.save((err, data) => {
        if (err) {
            res.status(404).send(err)
        }else{
            res.status(200).send(data)
           
        }

    });
});

// get le liste des produits
router.get ('/ListeProduit',(req,res) =>{
    Produit.find((err, produit) => {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(produit)
        }
    });

})


//get les produits dun x wishliste
router.get("/listeProduitofWishliste/:wishlistes",async(req,res,next) =>{
    try {
        let listeproduits = await Produit.find({wishlistes:req.params.wishlistes})
        res.send(listeproduits)
    } catch (err) {
        next(err)
    }
})

router.delete("/deleteProduit/:id",(req,res) =>{
    Produit.deleteOne({ _id: req.params.id }).then((result,err) => {
        
        if(err) {
            res.status(404).send(err)
        }else{
            res.status(200).json({ message: "Produit supprimer" });

        }
       
      });

})

module.exports = router