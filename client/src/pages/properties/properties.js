import React, { useState, useEffect } from 'react';
import SearchForm from "../../components/form/searchform"
import PropertyList from "../../components/list/PropertyList";

/*This is the property page  of the site.
This would display all of the properties that are listed
by brokers on the site
*/
function Properties() {

  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/properties`
      );
      const data = await result.json();
      setProperties(data);
    };
    fetchData();
  }, []);


  // Change the state when search is trigered
  const handleSearchState = (myproperties) => {
    setProperties(myproperties)
  }

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center text-center " style={{ marginTop: "20px" }}>
        <SearchForm change={handleSearchState} />
      </div>

      <br></br>
      {properties && properties.length > 0 ? (
        <div>
          <PropertyList properties={properties} />
        </div>

      ) : (
        <div className="mx-auto" style={{ maxWidth: "1300px" }}>
          <p>No properties yet</p>
        </div>
      )}
    </div>

  )
}
export default Properties;
