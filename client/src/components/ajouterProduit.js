import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useStyles2,BootstrapInput} from "./antTabs"
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useForm } from "react-hook-form";
import { AjouterProduit } from "./service/service";
import Swal from 'sweetalert2'
import _ from "lodash/fp";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    
    },
  },
}));

export  const Ajouterproduit = ({listeWishlist,listeProduits,setAddproduit}) =>{
  const classes = useStyles();
  const classes1 = useStyles2();
  const { handleSubmit, register,errors } = useForm({});
  const [file,setFile] = React.useState()
  const [currency,setCurrency] = React.useState()
  const [statue,setState] = React.useState(null)
  const [wshliste,setWishliste] = React.useState()
 
//Uplode limage
 const UplodeFile   = (event) =>{
   setFile(event.target.files[0])
 }
 //select currency
 const SelectCurrency = (event) =>{
  
   setCurrency(event.target.value)

 }
 //selection de wishliste ou va aprtien un produits
 const SelectWishliste = (event) =>{
   setWishliste(event.target.value)
 }
 //selection de statue
const SelectStatue = (event) =>{
  if (event.target.value == "To Buy") {
    setState(1)
  }else{
    setState(2)
  }
  
}
//Ajouter Produits
const onSubmit =  (val,e) =>{

  
  console.log(file)
  
 if(typeof file !== "undefined" !="" && statue != null && typeof currency!= "undefined"){
  let formData = new FormData()
  formData.append('file',file, file.name)
  formData.append('price', val.price)
  formData.append('decription', val.decription)
  formData.append('title', val.title)
  formData.append('currency', currency)
  formData.append('statue', statue)
  formData.append('wishlistes', wshliste)
  AjouterProduit (formData).then((res) =>{
    if(res.status == 200) {
     // Swal.fire('Succés', 'Un nouveau produit a été ajouté avec succés', 'success')
      toast.success("✔️Ajouter fait avec succès", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
      listeProduits()
      e.target.reset()
    }else{
      //Swal.fire('Erreur', 'On ne peut pas ajouter ce produit ! Essayer plus-tard', 'error')
      toast.error('❗ un error se produit', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        
        });
    }

 })
 }

}
// cancel Ajouter Produits
const ResetAjout = () =>{
  setAddproduit(false)
  
}
  return (

<div className="card2">
<Card style={{width:800,margin:'auto', height:600}} >
<form onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data">
  
        <div className={classes.root} noValidate autoComplete="off">
          <div style={{marginLeft:300}}>
          <Button variant="contained" component="label"> Upload Image <input type="file" hidden accept="image/*"  onChange={UplodeFile} ref={register({required: true})}/></Button>
          </div>
          <div>
          <div  className="Aform" style={{marginLeft:50}}>
            <div className="Cform" >
            <label htmlFor="title">Name</label>
            <input type="text" name="title"  ref={register({required: true,minLength:4})} className="input"></input>
            {_.get("title.type", errors) === "minLength" && (
        <p style={{color:'red'}}>title min 4 chracters</p>
      )}
            </div>
            <div className="Cform" style={{marginLeft:60}}>
            <label htmlFor="price">Price</label>
            <input type="number" name="price" ref={register({required: true})}className="input" ></input>
            </div>
            <div>
              <div className="currency">
                <label>
                Cuurency
                </label>
              
        <Select className="input select-input"
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          onChange ={SelectCurrency}
          input={<BootstrapInput />}>
          <MenuItem value="TND">TND</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EURO">EURO</MenuItem>
          
        </Select>
        </div>
        
        </div>

          </div>
          <div className="Cform" style={{marginLeft:50}}>
          <label  htmlFor="decription">Discription</label>
            <input type="text" name="decription" ref={register({required: true,minLength:10})} style={{    width: 618,height: 40}} className="input"></input>
            {_.get("decription.type", errors) === "minLength" && (
        <p style={{color:'red'}}>decription min 10 chracters</p>
      )}
          </div>
   
    <div className="Aform" style={{marginLeft:50}}>
        <div className="flex-column" >
        Wishliste
        <Select  className={classes1.margin}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          
         name="wishlistes"
         onChange={SelectWishliste}
          input={<BootstrapInput />}
        >
          
           {
            listeWishlist.map((Wishlist,index) =>
              <MenuItem value={Wishlist._id}>{Wishlist.nom}</MenuItem>
              
            )
          }
          
        </Select>
      
       </div>
       <div className="flex-column">
       Statue
        
        <Select  className={classes1.margin}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
         onChange={SelectStatue}
          input={<BootstrapInput />}
        >
          
          <MenuItem value="To Buy">To Buy</MenuItem>
          <MenuItem value="Bougth">Bougth</MenuItem>
          
        </Select>
        </div>
     
    </div>
    </div>
  </div>

      <CardActions className="botton-action" >
      <Button variant="outlined" color="primary"  onClick={ResetAjout}>
        Cancel
      </Button>
          <Button variant="contained" color="primary" type="submit" className="botton-action" >
        Done
      </Button>
      </CardActions>
      </form>
    </Card>
     


</div>
   


   

  );
}