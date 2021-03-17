import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { toast } from "react-toastify";

import Swal from 'sweetalert2'
import _ from "lodash/fp";
import { SupprimerProduit } from "./service/service"
import ProduitContext from "./produitContext";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),

  },

  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const DeleteProduits = ({ setOpen, statue }) => {
  const { produits, setTitleproduit, setWishlisteSelect, setLogocurency, listeProduits, setProduits } = useContext(ProduitContext)
  const supprimer = (event) => {
    setOpen(true)
    console.log(event)
    SupprimerProduit(produits._id).then((res) => {

      if (res.status == 200) {
       // Swal.fire('Succés', 'le produit supprimer avec succés', 'success');
        listeProduits();
        setProduits({
          file: "",
          title: '',
          decription: "",
          price: '',

        })
        setTitleproduit(-1)
        setLogocurency('')
        setWishlisteSelect('')
        setOpen(false);
        toast.success("✔️Suppression fait avec succes", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
      } else {
       // Swal.fire('Erreur', 'On ne peut pas supprimer ce produit ! Essayer plus-tard', 'error');
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


  const handleClose = () => {
    setOpen(false);
  };

  return (

    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={statue}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Supprimer {produits.title}
        </DialogTitle>

        <DialogContent dividers>
          <p>
            voulez vous supprimer le produit : {produits.title}
          </p>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose} >
            Cancel
      </Button>
          <Button variant="contained" color="secondary" onClick={supprimer} >
            Confirme
      </Button>

        </DialogActions>


      </Dialog>

    </div>

  );
}