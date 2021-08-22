import React, { useState } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { auth } from '../../store/actions/order';
import classes from "./Auth.css";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/errorHandler/errorHandler";
import axiosInstance from "../../Axios";
import Loading from "../../components/UI/Loading/Loading";

const authentication = (props) => {

  const [state, setstate] = useState({
    authForm: [
      {
        elementType: "input",
        config: {
          name: "email",
          type: "email",
          label: "Email",
          placeholder: "Your Email",
          required: true,
        },
      },
      {
        elementType: "input",
        config: {
          name: "password",
          type: "password",
          label: "Password",
          placeholder: "Your Password",
          required: true,
          minLength: "6",
        },
      },
    ],
    isSignUp: true
  });

  let formData = {}, isAuth;
  const inputChangedHandler = (event) => {
    formData[event.target.name] = event.target.value;
  };

  const authHandler = (event) => {
    // event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    props.onAuth(email, password, state.isSignUp );
    
  };

  const switchAuthMode = () => {
    setstate((prevState) => ({
        ...prevState,
        isSignUp: !prevState.isSignUp
    }));
  };

  let form = (
    <div>
      {isAuth}
      <h2> {state.isSignUp ? 'SIGNUP' : 'LOGIN'} </h2>
      <form className={classes.Auth} onSubmit={authHandler}>
        {state.authForm.map((field, i) => {
          return (
            <Input
              type={field.elementType}
              options={field.config}
              label={field.config.label}
              changed={inputChangedHandler}
              key={i}
            />
          );
        })}
      <Button type="submit" btnType="Success">Submit</Button>
      <Button btnType="Danger" type="button"
          clicked={switchAuthMode}> {state.isSignUp ? 'Switch to Login' : 'Switch to SignUp'} </Button>
      </form>
    </div>
  )

  if(props.loading) {
    form = <Loading />
  }

  let errorMsg;
  if(props.error) {
    errorMsg = props.error;
  }

  return (
    <div>
      <p className={classes.ErrorMsg}> {errorMsg} </p>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp ) => {dispatch(auth(email, password, isSignUp ))}
  }
} 

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(authentication, axiosInstance));
