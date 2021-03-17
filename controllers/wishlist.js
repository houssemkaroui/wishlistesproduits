const express = require("express");
var Wishlist = require('../Models/wishliste');
const router = express.Router();
const Produit = require('../Models/produit');


//ajouter wishlist
router.post('/AjouterWishlist', (req, res) =>{
    var liste = new Wishlist({
        nom: req.body.nom,
    });
    liste.save((err, data) => {
        if (err) {
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});


//get Liste of Wishliste
router.get ('/ListeWishlist',(req,res) =>{
    Wishlist.find((err, wishlist) => {
        if (err) {
            res.status(500).send(err);
        }
        else{
            res.status(200).send(wishlist)
        }
    });

})



router.delete("/deleteWishliste/:id", async(req,res,next) =>{


   try {
    var wishlist = await Wishlist.deleteOne({ _id: req.params.id })
    var produits = await Produit.deleteMany({wishlistes:req.params.id})
    res.send({message:"wishliste supprimer"})
} catch (err) {
    next(err)
}
   

})




module.exports = router