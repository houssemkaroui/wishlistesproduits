
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Modalewishliste } from "./ajouterwishilist";
import { Wishlist } from "./wishilist";
import { AntTabs, AntTab } from "./antTabs";
import { Produit } from "./produit";
import { Ajouterproduit } from "./ajouterProduit";
import { ListeWishlist, ListeProduits, ListeProduitofWishliste } from "./service/service";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from '@material-ui/core/IconButton';
import Box from "@material-ui/core/Box";
import Edit from '@material-ui/icons/Edit';
import GridOn from '@material-ui/icons/GridOn';
import List from '@material-ui/icons/List';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import { DeleteWishliste } from "./supprimerwishliste"
import { useHistory } from "react-router-dom";
import { ProduitProvider } from './produitContext'
const use = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));

export default function Acceuil() {
  const [value2, setValue2] = React.useState();
  const [table, setTable] = React.useState([])
  const classes = use();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [addproduit, setAddproduit] = React.useState()
  const [listeWishlist, setListeWishlist] = React.useState([])
  useEffect(() => {
    listeWishliste();
    listeProduits();
  }, [])
  // get les liste de wishlistes
  const listeWishliste = () => {
    ListeWishlist().then((res) => {
      setListeWishlist(res.data)
      console.log(res.data)

    }).catch(e => {

    });
  }
  const [listeProduit, setListeproduits] = React.useState([])
  const [produits, setProduits] = React.useState({})
  const [produitsliste, setProduitliste] = React.useState([])
  const [title, setTitle] = React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [titleProduit, setTitleproduit] = React.useState(-1)
  const [WishlisteNom, setWishlisteSelect] = React.useState(-1)
  const [mode, setMode] = React.useState(0)
  const itemListe = ["TND", "USD", "EURO"]
  const [currencyType, setCurrencytype] = React.useState('TND')
  const [tobuy, setTobuy] = React.useState([])
  const [bougth, setBouth] = React.useState([])
  const [color, setColor] = React.useState()
  const [color2, setColor2] = React.useState()
  let history = useHistory();
  const [supprimer, setSupprimer] = React.useState(false)
  const supprimerwishliste = (event) => {
    setSupprimer(true)
  }
  //vusializer en mode gride produits
  const ModeGrid = (event, newValue) => {
    setMode(1)
    setColor("primary")
    setColor2("")
  }
  //vusializer en mode liste produits
  const ModeListe = (event, newValue) => {
    setMode(0)
    setColor("")
    setColor2("primary")
  }
  //Ajouter Produits
  const handleClickOpen = () => {
    if (value == 0) {
      setOpen(true);
      setAddproduit(false)

    } else {
      setOpen(false)
      setAddproduit(true)
    }

  };

  //naviagtion entre my produits et my wishliste
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAddproduit(false)
  };


  //get liste des produits
  const listeProduits = () => {
    ListeProduits().then((res) => {
      setListeproduits(res.data)

    }).catch(e => {
    });
  }

  //pour changer le currency
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //pour ferme le menu currency
  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);

  };
  //get les liste des produits pour un wishliste
  const [wishli, setWishli] = React.useState({})
  const getidwishliste = (wishlist, index) => {
    setTitle(wishlist.nom)
    setWishli(wishlist)
    ListeProduitofWishliste(wishlist._id).then((res) => {
      setProduitliste(res.data)
      //  setProduitliste22(res.data)
      setTobuy(res.data.filter(produit => produit.statue == 1))
      setBouth(res.data.filter(produit => produit.statue == 2))
    })
  }
  const [logocurrency, setLogocurency] = React.useState()
  //get un produit
  const getProduit = (produit, index) => {
    setProduits(produit)
    setTitleproduit(produit.statue)
    setWishlisteSelect(listeWishlist.find((wishlist) => wishlist._id == produit.wishlistes).nom)
    setAddproduit(false)
    if (produit.currency == "TND") {
      setLogocurency("D")
    } else if (produit.currency == "USD") {
      setLogocurency("£")
    } else {
      setLogocurency("$")
    }


  }
  //filtre entre tobuy et bouthg
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
    if (newValue === 0) {
      setProduitliste(tobuy)

    } else {
      setProduitliste(bougth)
    }
  };
  //pour ouvrire le menu lgout
  const handleClickAccount = (event) => {
    setAnchorEl2(event.currentTarget);

  }
  //Lgout founction
  const Lgout = () => {
    localStorage.removeItem("token")
    history.push("/")
  }
  // pour change currency TND USA EURO
  const handelItemCurrency = (item, index) => {
    setCurrencytype(item)
    console.log(produitsliste, "ggggggggggggggggg")
    for (var i = 0; i < tobuy.length; i++) {
      if (item === "TND" && tobuy[i].currency === "USD") {
        tobuy[i].price = tobuy[i].price * 2
      }
      else if (item === "TND" && tobuy[i].currency === "EURO") {
        tobuy[i].price = tobuy[i].price * 3
      }
      else if (item === "TND" && tobuy[i].currency === "EURO") {
        tobuy[i].price = tobuy[i].price
      }
      else if (item === "USD" && tobuy[i].currency === "USD") {
        tobuy[i].price = tobuy[i].price
      }
      else if (item === "USD" && tobuy[i].currency === "TND") {
        tobuy[i].price = tobuy[i].price * 2
      }
      else if (item === "USD" && tobuy[i].currency === "EURO") {
        tobuy[i].price = tobuy[i].price * 1.5
      }
      else if (item === "EURO" && tobuy[i].currency === "EURO") {
        tobuy[i].price = tobuy[i].price
      }
      else if (item === "EURO" && tobuy[i].currency === "TND") {
        tobuy[i].price = tobuy[i].price / 3
      } else {
        tobuy[i].price = tobuy[i].price * 1.5
      }
    }

    for (var i = 0; i < bougth.length; i++) {
      if (item === "TND" && bougth[i].currency === "USD") {
        bougth[i].price = bougth[i].price * 2
        bougth[i].currency = "TND"
      }
      else if (item === "TND" && bougth[i].currency === "EURO") {
        bougth[i].price = bougth[i].price * 3
        bougth[i].currency = "TND"
      }
      else if (item === "TND" && bougth[i].currency === "EURO") {
        bougth[i].price = bougth[i].price
        bougth[i].currency = "TND"
      }
      else if (item === "USD" && bougth[i].currency === "USD") {
        bougth[i].price = bougth[i].price
        bougth[i].currency = "USD"
      }
      else if (item === "USD" && bougth[i].currency === "TND") {
        bougth[i].price = bougth[i].price * 2
        bougth[i].currency = "USD"
      }
      else if (item === "USD" && bougth[i].currency === "EURO") {
        bougth[i].price = bougth[i].price * 1.5
        bougth[i].currency = "USD"
      }
      else if (item === "EURO" && bougth[i].currency === "EURO") {
        bougth[i].price = bougth[i].price
        bougth[i].currency = "EURO"
      }
      else if (item === "EURO" && bougth[i].currency === "TND") {
        bougth[i].price = bougth[i].price / 3
        bougth[i].currency = "EURO"
      } else {
        bougth[i].price = bougth[i].price * 1.5
        bougth[i].currency = "EURO"
      }


    }



    handleClose()

  }


  return (
    <div >
      <div className={classes.demo1}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="My Wishilists" />
          <AntTab label="My Products" />
          <AntTab />
          <div className="iconbar">
            <IconButton aria-label="delete" className={classes.margin} size="small">
              <AccountCircle fontSize="inherit" onClick={handleClickAccount} />
            </IconButton>
            {currencyType}
            <IconButton aria-label="delete" className={classes.margin} size="small">
              <ArrowDownwardIcon fontSize="inherit" onClick={handleClick} />
            </IconButton>
          </div>
        </AntTabs>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}

        >

          {
            itemListe.map((item, index) =>
              <MenuItem key={index} value={index} onClick={() => handelItemCurrency(item, index)}>{item}</MenuItem>
            )
          }


        </Menu>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose}

        >
          <MenuItem onClick={Lgout}>Lgout</MenuItem>
        </Menu>

      </div>
      {
        value ? <div>
          <div className="menu">
            <div className={classes.root}>

              <Button variant="outlined" color="primary" disableElevation onClick={handleClickOpen}>+ Add Products</Button>
            </div>
            <MenuList style={{ height: 600 }}>
              {
                listeProduit.map((produit, index) =>
                  <MenuItem className="MenuItem" key={index} onClick={() => getProduit(produit, index)}>{produit.title}</MenuItem>
                )}
            </MenuList>
          </div>
          {
            addproduit ? <div className="content"><Ajouterproduit listeWishlist={listeWishlist} setAddproduit={setAddproduit} listeProduits={listeProduits} /></div>
              :
              <div className="content">
                <ProduitProvider value={{
                  produits, setProduits, listeProduits, listeWishlist, WishlisteNom
                  , setLogocurency, logocurrency, titleProduit, setTitleproduit, setWishlisteSelect
                }}>
                  <Produit />

                </ProduitProvider>

              </div>
          }
        </div>
          :
          <div>
            <div className="menu">
              <div className={classes.root}>

                <Button variant="outlined" color="primary" disableElevation onClick={handleClickOpen}>+ Add Wishilists</Button>
              </div>
              <MenuList style={{ height: 600 }}>
                {
                  listeWishlist.map((wishlist, index) =>
                    <MenuItem key={index}
                      onClick={() => getidwishliste(wishlist, index)} className="MenuItem">{wishlist.nom}</MenuItem>)}
              </MenuList>
            </div>
            <div >
              <Box display="flex" p={1} bgcolor="background.paper">
                <Box p={1} width="100%" style={{ fontSize: 'xx-large' }}>
                  {title}
                </Box>
                <Box alignItems="center" display="flex" style={{ width: 200 }} >

                  {/* <IconButton aria-label="edit" color="inherit" >
           < Edit/>
         </IconButton>Edit
         */}
                  <IconButton aria-label="delete" color="secondary" >
                    <DeleteIcon onClick={supprimerwishliste} />
                  </IconButton>Delete

        </Box>


              </Box>
            </div>
            <div className="content">
              <div className="tab2">
                <AntTabs value={value2} onChange={handleChange2} aria-label="ant example">

                  <AntTab label="To buy" />
                  <AntTab label="Bougth" />
                  <div className="icon" >
                    <IconButton aria-label="grid" size="small" style={{ top: 10 }} onClick={ModeGrid} color={color} >
                      <GridOn />Grid
         </IconButton>
                    <IconButton aria-label="liste" size="small" style={{ top: 10 }} onClick={ModeListe} color={color2} >
                      <List />Liste
         </IconButton>

                  </div>

                </AntTabs>

              </div>
              <Wishlist table={table} mode={mode} produitsliste={produitsliste} />
            </div>

          </div>
      }
      <Modalewishliste statue={open} setmode={setOpen} listeWishliste={listeWishliste} />
      <DeleteWishliste setSupprimer={setSupprimer} supprimer={supprimer}
        setTitle={setTitle} wishli={wishli} listeWishliste={listeWishliste} setProduitliste={setProduitliste} listeProduits={listeProduits} />
    </div>
  );
}
