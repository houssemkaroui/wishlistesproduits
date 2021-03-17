import axios from 'axios'





const ListeWishlist = () => {
  return axios.get("/wishlist/ListeWishlist");
};

const ListeProduitofWishliste = id => {
  return axios.get('/produit/listeProduitofWishliste/' + id);
};

const ListeProduits = () => {
  return axios.get("/produit/ListeProduit")
}

const AjouteWishliste = (data) => {
  return axios.post("/wishlist/AjouterWishlist", data)
}


const AjouterProduit = (data) => {
  return axios.post("/produit/AjouterProduit", data)
}
const LoginUser = (data) => {
  return axios.post("/user/login", data)
}

const SupprimerProduit = id => {
  return axios.delete("produit/deleteProduit/" + id)
}

const SupprimerWishliste = id => {
  return axios.delete("wishlist/deleteWishliste/" + id)
}

export {
  ListeWishlist,
  ListeProduitofWishliste,
  ListeProduits,
  AjouteWishliste,
  AjouterProduit,
  LoginUser,
  SupprimerWishliste,
  SupprimerProduit

};