import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import { loginUser, isAuthenticated } from "../../lib/Helpers/AuthHelpers";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";
import { Consumer } from "../Context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

export default function Login(props) {
  const [formSetting, setFormSetting] = useState({
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

  useEffect(() => {
    let success = isAuthenticated();
    console.log(success);
    if (success) {
      props.history.push("/map");
    }
  }, [props.history]);

  const checkInputValidation = (errorState, inputName, inputValue) => {
    switch (inputName) {
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

    const { email, password } = formSetting;

    try {
      let success = await loginUser({
        email: email.value,
        password: password.value,
      });

      let inputForm = {
        ...formSetting,
      };

      inputForm["email"].value = "";
      inputForm["password"].value = "";

      dispatch({
        type: "SUCCESS_SIGNED_IN",
        payload: success.user,
      });

      setFormSetting({
        ...formSetting,
      });

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
            <h1>Log In</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e, dispatch)}>
              {renderInput}
              <br />
              <ButtonGroup
                buttonStyle="form-button"
                title="Sign In"
                disabled={!canSubmit}
              />
            </form>
          </div>
        );
      }}
    </Consumer>
  );
}
