const mongoose = require('mongoose');
const ProduitSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    decription:{
        type:String,
        required:true

    },
    statue:{
        type:Number,
        required:true
    },
    currency :{
        type:String,
        required:true
    },
    wishlistes:{
        type:String,
        required:true
    }




});

module.exports = mongoose.model("Produit", ProduitSchema);