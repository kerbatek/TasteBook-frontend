import React from "react";

const FormError = ({ errors }) => {
  return (
    <ul className="mb-4 list-disc pl-5 text-red-500">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default FormError;
