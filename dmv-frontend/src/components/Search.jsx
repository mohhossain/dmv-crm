// import e from "express";
import React, { useState } from "react";

function Search({ onSearch }) {
  //   const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="🔍 Search"
        onChange={(event) => {
          //   setSearchTerm(event.target.value);
          onSearch(event.target.value);
        }}
      />
    </div>
  );
}

export default Search;
