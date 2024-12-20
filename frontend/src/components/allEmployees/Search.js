import React from "react";

/* search component get the search query and onSearchChange function which 
will be called when the user types in the search bar*/
const Search = ({ searchQuery, onSearchChange}) => {
    return (
        <div className="container d-flex justify-content-center">
            <input
                type="text"
                placeholder="Search by ID or Designation"
                value={searchQuery}
                onChange={onSearchChange}
                onFocus={(e) => e.target.style.borderColor = 'lightgray'}
                onBlur={(e) => e.target.style.borderColor = 'lightgray'}
                style={{
                    border: "1px solid lightgray",
                    borderRadius: "16px",
                    padding: "10px",
                    marginBottom: "20px",
                    width: "70%",
                }}
            />
        </div>
    );
};

export default Search;
