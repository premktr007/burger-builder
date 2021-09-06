import React, { useState } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { auth } from "../../store/actions/order";
import classes from "./Auth.css";
import { useSelector, useDispatch } from "react-redux";
import withErrorHandler from "../../hoc/errorHandler/errorHandler";
import axiosInstance from "../../Axios";
import Loading from "../../components/UI/Loading/Loading";

const authentication = (props) => {
  // dispatching actions
  const dispatch = useDispatch();
  const onAuth = (email, password, isSignUp) => {
    dispatch(auth(email, password, isSignUp));
  };

  //subscribing to the state
  const onLoading = useSelector(state => state.loading);
  const onError = useSelector(state => state.error);

  const [authState] = useState({
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
  });

  const [isSignUp, setSignUp] = useState(true);

  let formData = {}, isAuth;
  const inputChangedHandler = (event) => {
    formData[event.target.name] = event.target.value;
  };

  const authHandler = (event) => {
    const email = event.target[0].value;
    const password = event.target[1].value;
    onAuth(email, password, isSignUp);
  };

  const switchAuthMode = () => {
    setSignUp(!isSignUp);
  };

  let form = (
    <div>
      {isAuth}
      <h2> {isSignUp ? "SIGNUP" : "LOGIN"} </h2>
      <form className={classes.Auth} onSubmit={authHandler}>
        {authState.authForm.map((field, i) => {
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
        <Button type="submit" btnType="Success">
          Submit
        </Button>
        <Button btnType="Danger" type="button" clicked={switchAuthMode}>
          {" "}
          {isSignUp ? "Switch to Login" : "Switch to SignUp"}{" "}
        </Button>
      </form>
    </div>
  );

  if (onLoading) {
    form = <Loading />;
  }

  let errorMsg;
  if (onError) {
    errorMsg = onError;
  }

  return (
    <div>
      <p className={classes.ErrorMsg}> {errorMsg} </p>
      {form}
    </div>
  );
};

export default withErrorHandler(authentication, axiosInstance);
