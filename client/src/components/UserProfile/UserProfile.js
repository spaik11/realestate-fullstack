import React, { useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "../shared/InputGroup";
import ButtonGroup from "../shared/ButtonGroup";
import validator from "validator";
import { updateUser } from "../../lib/Helpers/AuthHelpers";
import { UserContext } from "../Context/UserContext";
import "../Register/Register.css";

export default function UserProfile() {
  const {
    isAuth: { user },
    dispatch,
  } = useContext(UserContext);
  const [formSetting, setFormSetting] = useState({
    name: {
      name: "name",
      placeholder: "Enter Name",
      value: `${user.name}`,
      error: { message: "", noError: null },
    },
    address: {
      name: "address",
      placeholder: "Enter Address",
      value: `${user.profile.address}` ? `${user.profile.address}` : "",
      error: { message: "", noError: null },
    },
    phoneNumber: {
      name: "phoneNumber",
      placeholder: "Enter Phone Number",
      value: `${user.profile.phoneNumber}` ? `${user.profile.phoneNumber}` : "",
      error: { message: "", noError: null },
    },
  });
  const [validate, setValidate] = useState({
    nameError: {
      noError: true,
      message: "",
    },
    addressError: {
      noError: true,
      message: "",
    },
    phoneNumberError: {
      noError: true,
      message: "",
    },
  });
  const [canSubmit, setCanSubmit] = useState(false);

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

      case "address":
        let addressValidator = validator.matches(
          inputValue,
          /^[^`~!@#$%^&*()_+={}\[\]|\\:;“’<,>.?๐฿]*$/
        );

        if (!addressValidator) {
          errorState.addressError.message =
            "Cannot contain special characters and max length of 20 characters";
          errorState.addressError.noError = true;
          return errorState;
        } else {
          errorState.addressError.message = "";
          errorState.addressError.noError = false;
          return errorState;
        }

      case "phoneNumber":
        let validatedNumber = validator.matches(
          formSetting.phoneNumber.value,
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        );

        if (!validatedNumber) {
          errorState.phoneNumberError.noError = true;
          errorState.phoneNumberError.message =
            "Please input a valid phone number";
          return errorState;
        } else {
          errorState.phoneNumberError.noError = false;
          errorState.phoneNumberError.message = "";
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
    inputForm["address"].error = isValidatedCheck.addressError;
    inputForm["phoneNumber"].error = isValidatedCheck.phoneNumberError;

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

    const { name, address, phoneNumber } = formSetting;

    try {
      let success = await updateUser({
        _id: user._id,
        name: name.value,
        profile: {
          address: address.value,
          phoneNumber: phoneNumber.value,
          creditScore: user.profile.creditScore,
        },
      });

      let inputForm = {
        ...formSetting,
      };

      inputForm["name"].value = success.user.name;
      inputForm["address"].value = success.user.profile.address;
      inputForm["phoneNumber"].value = success.user.profile.phoneNumber;

      setFormSetting({
        ...formSetting,
      });

      dispatch({
        type: "SUCCESS_SIGNED_IN",
        payload: success.user,
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
      <form className="form" onSubmit={(e) => handleSubmit(e, dispatch)}>
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
