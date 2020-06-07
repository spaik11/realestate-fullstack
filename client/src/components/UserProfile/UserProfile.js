import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";
import validator from "validator";
import { updateUser } from "../../lib/Helpers/AuthHelpers";
import { Consumer } from "../Context/UserContext";
import "../Register/Register.css";

export default function UserProfile() {
  const {
    isAuth: { user, auth },
  } = useContext(Consumer);
  const [formSetting, setFormSetting] = useState({
    username: {
      name: "username",
      placeholder: user.username,
      value: "",
      error: { message: "", noError: null },
    },
    password: {
      name: "password",
      placeholder: "Enter Password",
      value: "",
      error: { message: "", noError: null },
    },
    creditScore: {
      name: "creditScore",
      placeholder: "Enter Credit Score",
      value: "",
      error: { message: "", noError: null },
    },
  });
  const [validate, setValidate] = useState({
    usernameError: {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formSetting;

    try {
      await updateUser({
        id: user.id,
        username: username.value,
        password: password.value,
      });

      let inputForm = {
        ...formSetting,
      };

      inputForm["username"].value = "";
      inputForm["password"].value = "";

      setFormSetting({
        ...formSetting,
      });

      toast.success(`User Updated!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <h1>Update Profile</h1>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        {renderInput}
        <br />
        <ButtonGroup
          buttonStyle="form-button"
          title="Submit"
          disabled={!canSubmit}
        />
      </form>
    </div>
  );
}
