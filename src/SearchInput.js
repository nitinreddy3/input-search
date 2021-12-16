import React from "react";

const SearchInput = ({ setShowSelectDropdown, list }) => {

  return (
    <select
      style={{ width: "100%" }}
      onChange={() => setShowSelectDropdown(true)}
      multiple
    >
      {list}
    </select>
  )
}

export default SearchInput;