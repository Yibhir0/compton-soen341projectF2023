
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';

import { AMENITIES, RENT_PRICE } from '../../globals/names';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 540,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function FilterSearch({ change, handleModal }) {

  const [searchFields, setSearchFields] = useState({
    address: "",
    amenities: [],
    city: "",
    postalCode: "",
    minPrice: "",
    maxPrice: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    propertyType: "",
  });

  /**
   * Fetch with search conditions
   * Update the parent state
   */
  const handleState = async () => {
    let searchUrl = buildUrl();
    const result = await fetch(searchUrl);
    const data = await result.json();
    clearFields();
    change(data);
    handleModal();
  }

  /**
   * Build url with search params
   * @returns url as string
   */
  function buildUrl() {
    const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/properties/filter?`);
    if (searchFields.address.length > 0) url.searchParams.append('address', searchFields.address);
    if (searchFields.city.length > 0) url.searchParams.append('city', searchFields.city);
    if (searchFields.postalCode.length > 0) url.searchParams.append('postalCode', searchFields.postalCode);
    if (searchFields.numberOfBedrooms.length > 0 && searchFields.numberOfBedrooms !== "Any")
      url.searchParams.append('numberOfBedrooms', searchFields.numberOfBedrooms);
    if (searchFields.numberOfBathrooms.length > 0 && searchFields.numberOfBathrooms !== "Any")
      url.searchParams.append('numberOfBathrooms', searchFields.numberOfBathrooms);
    if (searchFields.minPrice.length > 0 && searchFields.minPrice !== "Any") url.searchParams.append('minPrice', searchFields.minPrice);
    if (searchFields.maxPrice.length > 0 && searchFields.maxPrice !== "Any") url.searchParams.append('maxPrice', searchFields.maxPrice);
    if (searchFields.propertyType.length > 0) url.searchParams.append('propertyType', searchFields.propertyType);
    let search = new URLSearchParams(searchFields.amenities?.map(a => ['amenities', a]))
    let urlSearch = url.toString() + "&" + search.toString();

    return urlSearch;
  }

  /**
   * Clear input fields
   */
  function clearFields() {
    setSearchFields({
      address: "",
      amenities: [],
      city: "",
      postalCode: "",
      minPrice: "",
      maxPrice: "",
      numberOfBedrooms: "",
      numberOfBathrooms: "",
      propertyType: "",
    })
  }

  const handleChange = (evt) => {
    const value = evt.target.value;
    setSearchFields({
      ...searchFields,
      [evt.target.name]: value,
    });
  };
  return (
    <Box sx={style}>

      <div>
        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Address</InputLabel>
          <FilledInput name="address" onChange={handleChange} value={searchFields.address}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">City</InputLabel>
          <FilledInput name="city" onChange={handleChange} value={searchFields.city}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel >Type</InputLabel>
          <Select name="propertyType" value={searchFields.propertyType} onChange={handleChange}>
            <MenuItem value="Sale">Sale</MenuItem>
            <MenuItem value="Rent">Rent</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount"  >Postal Code</InputLabel>
          <FilledInput name="postalCode" value={searchFields.postalCode} onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Minimum Price</InputLabel>
          <Select
            value={searchFields.minPrice}
            onChange={handleChange}
            name="minPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          >

            {RENT_PRICE.map((price) => (
              <MenuItem
                key={price}
                value={price}
              >
                {price}
              </MenuItem>
            ))};
          </Select>

        </FormControl>

        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Maximum price</InputLabel>
          <Select
            value={searchFields.maxPrice}
            onChange={handleChange}
            name="maxPrice"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          >
            {RENT_PRICE.map((price) => (
              <MenuItem
                key={price}
                value={price}
              >
                {price}
              </MenuItem>
            ))};
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Number Of Bedrooms</InputLabel>
          <Select name="numberOfBedrooms" value={searchFields.numberOfBedrooms}
            onChange={handleChange}>
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">+3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '25ch' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Number Of Bathrooms</InputLabel>
          <Select name="numberOfBathrooms" value={searchFields.numberOfBathrooms}
            onChange={handleChange}>
            <MenuItem value="Any">Any</MenuItem>
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">+3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1, width: '52ch' }} variant="filled">
          <InputLabel id="demo-simple-select-label">Amenities</InputLabel>
          <Select
            multiple
            value={searchFields.amenities}
            onChange={handleChange}
            name="amenities"
          >

            {AMENITIES.map((amenity) => (
              <MenuItem
                key={amenity}
                value={amenity}
              >
                {amenity}
              </MenuItem>
            ))};
          </Select>
        </FormControl>


        <Box sx={{ m: 0.5, display: 'flex', justifyContent: 'space-between' }}>
          <Button style={{ backgroundColor: "#011a3eea" }} size="large" variant="contained" onClick={handleState}  >Search</Button>
          <Button style={{ backgroundColor: "#011a3eea" }} size="large" variant="contained" onClick={clearFields}  >Reset</Button>
        </Box>


      </div>

    </Box>
  );
}

export default FilterSearch;