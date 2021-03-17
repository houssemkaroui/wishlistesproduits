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

import Swal from 'sweetalert2'
import _ from "lodash/fp";
import { SupprimerWishliste } from "./service/service"
import ProduitContext from "./produitContext";
import { toast } from "react-toastify";

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

export const DeleteWishliste = ({ setSupprimer, supprimer, wishli, listeWishliste, setTitle, setProduitliste, listeProduits }) => {

  const supprimerwishlist = (event) => {
    setSupprimer(true)
    console.log(event)
    SupprimerWishliste(wishli._id).then((res) => {

      if (res.status == 200) {
       // Swal.fire('Succés', 'le wishliste supprimer avec succés', 'success');
       toast.success("✔️Suppression fait avec succes", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      });
        listeWishliste();
        setTitle('')
        setProduitliste([])
        listeProduits()
        setSupprimer(false);
      } else {
      //  Swal.fire('Erreur', 'On ne peut pas supprimer ce wishliste ! Essayer plus-tard', 'error');
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
    setSupprimer(false);
  };

  return (

    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={supprimer}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Supprimer {wishli.nom}
        </DialogTitle>

        <DialogContent dividers>
          <p>
            voulez vous supprimer le wishliste : {wishli.nom}
          </p>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose} >
            Cancel
      </Button>
          <Button variant="contained" color="secondary" onClick={supprimerwishlist} >
            Confirme
      </Button>

        </DialogActions>


      </Dialog>

    </div>

  );
}