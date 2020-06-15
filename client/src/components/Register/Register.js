import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";
import validator from "validator";
import {
  createUser,
  loginUser,
  isAuthenticated,
} from "../../lib/Helpers/AuthHelpers";
import { Consumer } from "../Context/UserContext";
import {
  makeStyles,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import "./Register.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Register(props) {
  const [formSetting, setFormSetting] = useState({
    name: {
      name: "name",
      placeholder: "Enter Name",
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
    nameError: {
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
  const [checkBox, setCheckBox] = useState(false);

  useEffect(() => {
    let success = isAuthenticated();

    if (success) {
      props.history.push("/map");
    }
  }, [props.history]);

  const checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
      case "name":
        let nameValidator = validator.matches(
          inputValue,
          /^[a-zA-Z0-9]{1,20}$/
        );

        if (!nameValidator) {
          errorState.nameError.message =
            "Cannot contain special characters and max length of 20 characters";
          errorState.nameError.noError = true;
          return errorState;
        } else {
          errorState.nameError.message = "";
          errorState.nameError.noError = false;
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

    inputForm["name"].error = isValidatedCheck.nameError;
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

  const handleCheckChange = (event) => {
    setCheckBox(event.target.checked);
  };

  const handleSubmit = async (e, dispatch) => {
    e.preventDefault();

    const { name, email, password } = formSetting;
    let randomCreditScore = Math.floor(Math.random() * (850 - 300 + 1) + 300);

    try {
      await createUser({
        name: name.value,
        email: email.value,
        password: password.value,
        favorites: [],
        profile: {
          address: "",
          phoneNumber: "",
          creditScore: randomCreditScore,
        },
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

      inputForm["name"].value = "";
      inputForm["email"].value = "";
      inputForm["password"].value = "";

      setFormSetting({
        ...formSetting,
      });

      setCheckBox(false);

      props.history.push("/map");
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
        type={name === "password" ? "password" : "text"}
        placeholder={placeholder}
        onChange={handleChange}
        error={error}
      />
    )
  );

  const classes = useStyles();

  let buttonDisabled = !canSubmit || !checkBox ? true : false;

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
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  TruZilla Customer Agreement
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkBox}
                        onChange={handleCheckChange}
                        name="checkBox"
                      />
                    }
                    label="I agree to the terms of service"
                  />
                </FormGroup>
              </FormControl>
              <br />
              <ButtonGroup
                buttonStyle="form-button"
                title="Sign Up"
                disabled={buttonDisabled}
              />
            </form>
          </div>
        );
      }}
    </Consumer>
  );
}
