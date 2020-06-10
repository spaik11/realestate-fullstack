import React from "react";
import classnames from "classnames";

export default function InputGroup({
  name,
  value,
  type,
  error,
  placeholder,
  onChange,
}) {
  console.log("INPUT GROUP ", error);
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className={classnames("form-style", {
          isvalid: error.noError === false ? true : false,
        })}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error.noError && <div className="invalid-message">{error.message}</div>}
    </div>
  );
}
