import React, { useState } from 'react';

import FilterModal from "./filterModal";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';


function SearchForm({change}) {
  const [fields, setFields] = useState({
    city: "",
    open: false,
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setFields({
      ...fields,
      [evt.target.name]: value
    });
    
  }
  // Handle search by city
  const handleSearch= async (evt) => {
    
    let value = fields.city;
    let searchUrl =`${process.env.REACT_APP_BACKEND_URL}/properties/`
    +"filter?" +
    "city=" +value;
    const result = await fetch(searchUrl);
    const data = await result.json();
    change(data);
    setFields({
      ...fields,
      "city": ""
    });
  };
  // callback function to Close and open modal
  function handleModal() {
    setFields({ open: !fields.open });
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
    >
      <InputBase
        onChange={handleChange}
        sx={{ ml: 1, flex: 1 }}
        placeholder="City"
        name='city'
        value={fields.city}

      />

      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleModal}>
        <FilterListIcon />
      </IconButton>
      <div>
        {fields.open && <FilterModal handleModal={handleModal} change={change}/>}
      </div>
    </Paper>
  );
}

export default SearchForm;