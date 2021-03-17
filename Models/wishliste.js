const mongoose = require('mongoose');
const WishlisteSchema = mongoose.Schema({

    nom:{
        type:String,
        required:true
    },

    //produits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }]


});

module.exports = mongoose.model("Wishlist", WishlisteSchema);