import React from "react";
import Select from "react-select";

const MultipleSelect = ({
  data,
  fontSize,
  height,
  isSearchable,
  placeholder,
  handleSelected,
  selectedOptions,
  isMulti,
  disabled,
}) => {
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      // height: height ? height : "45px",
      textTransform: "capitalize",
      backgroundColor: "#FFFF",
      borderRadius: "4px",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: "left",
      color: "#8a8a8a",
      fontWeight: 500,
      backgroundColor: "transparent",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      color: "#000",
      fontWeight: 500,
      textTransform: "capitalize",
      backgroundColor: "#ffff",
      zIndex: 100,
    }),
    multiValue: (provided) => ({
      ...provided,
      textAlign: "left",
      backgroundColor: "#DDD",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "left",
      textTransform: "capitalize",
      color: "#FFF",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 100, // Increase the z-index to a high value
      backgroundColor: "transparent",
      border: "1px solid #fff",
    }),
  };
  return (
    <div className="dropdown-grid w-100">
      <Select
        options={data}
        isMulti={isMulti ? true : false}
        styles={selectStyles}
        closeMenuOnSelect={false}
        placeholder={placeholder ? placeholder : "Select"}
        hideSelectedOptions={false}
        onChange={handleSelected}
        value={selectedOptions ? selectedOptions : []}
        isSearchable={isSearchable}
        isDisabled={disabled ? disabled : false}
      />
    </div>
  );
};

export default MultipleSelect;
