import React from "react";
import { useState } from "react";
import MostrarError from "../validacionForm/mostrarError";

const Input = ({ type, name,value, handleChange, errors,label }) => {
  const [touched, setTouched] = useState(false);

  const handleFocus = () => {
    setTouched(true);
  };

  return (
    <div>
      <label htmlFor={name} className="block">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        className="my-2 px-2 py-1 rounded-sm w-full"
        onChange={handleChange}
      
        
        value={value}
      />
      <MostrarError touched={touched} errors={errors} campo={name} />
    </div>
  );
};

export default Input;
