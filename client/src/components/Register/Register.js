import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";
import validator from "validator";
import { createUser, loginUser } from "../../lib/Helpers/AuthHelpers";
import { Consumer } from "../Context/UserContext";
import "./Register.css";

export default function Register(props) {
  const [formSetting, setFormSetting] = useState({
    username: {
      name: "username",
      placeholder: "Enter Username",
      value: "",
      error: { message: "", noError: null },
    },
    email: {
      name: "email",
      placeholder: "Enter Email",
      value: "",
      error: { message: "", noError: null },
    },
    password: {
      name: "password",
      placeholder: "Enter Password",
      value: "",
      error: { message: "", noError: null },
    },
  });
  const [validate, setValidate] = useState({
    usernameError: {
      noError: true,
      message: "",
    },
    emailError: {
      noError: true,
      message: "",
    },
    passwordError: {
      noError: true,
      message: "",
    },
  });
  const [canSubmit, setCanSubmit] = useState(false);

  const checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
      case "username":
        let usernameValidator = validator.matches(
          inputValue,
          /^[a-zA-Z0-9]{1,20}$/
        );

        if (!usernameValidator) {
          errorState.usernameError.message =
            "Cannot contain special characters and max length of 20 characters";
          errorState.usernameError.noError = true;
          return errorState;
        } else {
          errorState.usernameError.message = "";
          errorState.usernameError.noError = false;
          return errorState;
        }

      case "email":
        let isEmail = validator.isEmail(inputValue);

        if (!isEmail) {
          errorState.emailError.message = "Please enter a valid email";
          errorState.emailError.noError = true;
          return errorState;
        } else {
          errorState.emailError.message = "";
          errorState.emailError.noError = false;
          return errorState;
        }

      case "password":
        let validatedPassword;
        validatedPassword = validator.matches(
          inputValue,
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        );
        if (!validatedPassword) {
          errorState.passwordError.noError = true;
          errorState.passwordError.message =
            "Minimum eight characters, at least one letter, one number and one special character";
          return errorState;
        } else {
          errorState.passwordError.noError = false;
          errorState.passwordError.message = "";
          return errorState;
        }

      default:
        return errorState;
    }
  };

  const handleChange = (e) => {
    let inputForm = {
      ...formSetting,
    };

    inputForm[e.target.name].value = e.target.value;

    let isValidatedCheck = checkInputValidation(
      validate,
      e.target.name,
      e.target.value
    );

    inputForm["username"].error = isValidatedCheck.usernameError;
    inputForm["email"].error = isValidatedCheck.emailError;
    inputForm["password"].error = isValidatedCheck.passwordError;

    setValidate({ ...validate, isValidatedCheck });
    setFormSetting({ ...formSetting });

    let errorArray = [];

    for (let key in validate) {
      errorArray.push(validate[key].noError);
    }

    if (errorArray.includes(true)) {
      setCanSubmit(false);
    } else {
      setCanSubmit(true);
    }
  };

  const handleSubmit = async (e, dispatch) => {
    e.preventDefault();

    const { username, email, password } = formSetting;

    try {
      await createUser({
        username: username.value,
        email: email.value,
        password: password.value,
      });

      let inputForm = {
        ...formSetting,
      };

      let success = await loginUser({
        email: email.value,
        password: password.value,
      });

      dispatch({
        type: "SUCCESS_SIGNED_IN",
        payload: success.user,
      });

      inputForm["username"].value = "";
      inputForm["email"].value = "";
      inputForm["password"].value = "";

      setFormSetting({
        ...formSetting,
      });

      props.history.push("/user-profile");
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let inputArray = [];

  for (let key in formSetting) {
    inputArray.push({
      formSetting: formSetting[key],
    });
  }

  let renderInput = inputArray.map(
    ({ formSetting: { name, value, error, placeholder } }, idx) => (
      <InputGroup
        key={idx}
        name={name}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        error={error}
      />
    )
  );

  return (
    <Consumer>
      {({ dispatch }) => {
        return (
          <div className="signup-container">
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <h1>Register</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e, dispatch)}>
              {renderInput}
              <br />
              <ButtonGroup
                buttonStyle="form-button"
                title="Sign Up"
                disabled={!canSubmit}
              />
            </form>
          </div>
        );
      }}
    </Consumer>
  );
}
