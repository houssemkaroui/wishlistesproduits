
import React, { useContext } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStyles1, useStyles2, BootstrapInput } from "./antTabs"
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from '@material-ui/icons/Edit';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { DeleteProduits } from './supprimerproduits';
import ProduitContext from "./produitContext";
export const Produit = () => {
  const { produits, logocurrency, titleProduit, setTitleproduit, WishlisteNom, listeWishlist
    , setWishlisteSelect, setLogocurency, listeProduits, setProduits } = useContext(ProduitContext)

  const classes = useStyles1();
  const classes1 = useStyles2();
  const [open, setOpen] = React.useState(false)
  const supprimer = (event) => {
    setOpen(true)
  }

  return (
    <div style={{ marginTop: 35 }}>
      <div className={classes.root} >
        <img src={'https://sleepy-beach-59476.herokuapp.com/photos/' + produits.file} className="imageProduit" />
        <div>
          <div style={{ fontSize: 'xx-large' }}>
            {produits.title}
          </div>

          <div >
            <div>
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Typography color="textPrimary">
                  {produits.decription}
                </Typography>
              </Breadcrumbs>
            </div>
            <div style={{ marginTop: 150 }}>
              <h style={{ fontSize: 'xx-large' }}>Price: {produits.price} {logocurrency}</h>

            </div>
          </div>

        </div>
        <div style={{ width: 120, height: 100 }}>
          <div>
            {/* <IconButton aria-label="edit" color="inherit" >
        < Edit/>
      </IconButton>Edit */}
            <IconButton aria-label="delete" color="secondary" >
              <DeleteIcon onClick={supprimer} />
            </IconButton>Delete
      </div>
        </div>
      </div>
      <div style={{ height: 80 }}>
        <FormControl className={classes1.margin} >
          <label style={{ marginLeft: 20 }}>Wishliste</label>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={WishlisteNom}
            input={<BootstrapInput />}
          >
            {
              listeWishlist.map((Wishlist, index) =>
                <MenuItem value={Wishlist.nom} key={index}>{Wishlist.nom}</MenuItem>
              )
            }
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes1.margin}>
          <label style={{ marginLeft: 20, marginTop: 20 }}>Status</label>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={titleProduit}
            input={<BootstrapInput />}>
            <MenuItem value={1}>To Buy</MenuItem>
            <MenuItem value={2}>Bought</MenuItem>

          </Select>
        </FormControl>
      </div>
      <DeleteProduits statue={open} setOpen={setOpen} produits={produits}
        listeProduits={listeProduits} setProduits={setProduits}
        setTitleproduit={setTitleproduit}
        setLogocurency={setLogocurency}
        setWishlisteSelect={setWishlisteSelect}
      />
    </div>


  );
}


