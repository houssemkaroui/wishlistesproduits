import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { AjouteWishliste } from "./service/service";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import _ from "lodash/fp";
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

export const Modalewishliste = ({ setmode, statue, listeWishliste }) => {
  const { handleSubmit, register, errors } = useForm({});
  // useEffect(() => {
  //   ListeWishlist()
  // })
  function onSubmit(data, e) {
    console.log(data)
    AjouteWishliste(data).then((res) => {
      if (res.status == 200) {
        // Swal.fire('Succés', 'Un nouveau wishliste a été ajouté avec succés', 'success')
        toast.success("✔️Ajouter fait avec succès", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true
        });
        e.target.reset()
        listeWishliste();
        setmode(false)
      } else {
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


  const handleClose = () => {
    setmode(false);
  };

  return (

    <div>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={statue}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add wishilist
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="dialog_w"  >
        
          <DialogContent dividers>
            <div className="Cform">
              <label htmlFor="nom" style={{ display: 'block' }}>Name</label>
              <input type="text" id="nom" name="nom" className="input" style={{ width: 300 }} ref={register({ required: true, minLength: 4 })}></input>
              {_.get("nom.type", errors) === "minLength" && (
                <p style={{ color: 'red' }}>nom min 4 chracters</p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose} >
              Cancel
      </Button>
            <Button variant="contained" color="primary" type="submit" >
              Done
      </Button>

          </DialogActions>
        </form>
        
      </Dialog>
     
    </div>

  );
}