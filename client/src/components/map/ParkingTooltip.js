// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";

/**
 * Tooltip class - contains the whole render of tooltip
 */
class ParkingTooltip extends Component {

  render() {
    return (
      //Display the tooltip with the props given - Shows locations, available hours and places
      <div>
        {/* <h2>{this.props.property.LOCATION}</h2>
        <p>Hours: {this.props.property.HOURS}</p>
        <p>Number Of Places: {this.props.property.NBR_PLA_I}</p> */}
        <a href="https://www.w3schools.com">View</a>
      </div>
    )
  }
}

export default ParkingTooltip;