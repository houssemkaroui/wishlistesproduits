
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { LoginUser } from "./service/service"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import _ from "lodash/fp";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(4),
    },
  },
}));
export default function Login() {
  const classes = useStyles();
  let history = useHistory();
  const { handleSubmit, register, watch, errors } = useForm({});
  //login function
  function onSubmit(data, e) {
    // Swal.fire('Oops...', 'Something went wrong!', 'error')
    console.log(data, e)
    LoginUser(data).then(res => {
      console.log(res)
      if (res.status == 404) {

        Swal.fire('Oops...', 'Something went wrong!', 'error')
      } else {
        localStorage.setItem("token", res.data.token)
        history.push("/aceuil")
        e.target.reset()
      }


    })
      .catch((e) => {

      })
  }


  return (

    <div className="container">
      <div>
        <img src="https://image.flaticon.com/icons/png/512/295/295128.png" alt="login-icon" width="100px" />
      </div>
      <br></br>


      <Card className="card2" >

        <form onSubmit={handleSubmit(onSubmit)}>


          <div className={classes.root} noValidate autoComplete="off">

            <div className="Cform">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" className="input" style={{ width: 400 }} ref={register({ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}></input>
              {_.get("email.type", errors) === "pattern" && (
                <p style={{ color: 'red' }}>Verifier votre mail</p>
              )}
            </div>

            <div className="Cform">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className="input" style={{ width: 400 }} ref={register({ required: true, minLength: 5 })}></input>
              {_.get("password.type", errors) === "minLength" && (
                <p style={{ color: 'red' }}>password min 5 chracters</p>
              )}
            </div>
            <div>
              <label >text</label>
              <label style={{ marginLeft: 300 }}>text</label>

            </div>


          </div>
          <CardActions className="botton-action2" >
            <Button variant="contained" color="primary" type="submit" style={{ bottom: 20 }}>
              SingIn
    </Button>
          </CardActions>
        </form>
      </Card>


    </div>


  );
}
