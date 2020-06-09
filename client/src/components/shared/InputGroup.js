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
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        className={classnames("form-style")}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
