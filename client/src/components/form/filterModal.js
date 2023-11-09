import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import FilterSearch from './filterSearch'
function FilterModal({ change, handleModal }) {
  const [open] = useState(true);
  const handleClose = () => handleModal();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}>
        <FilterSearch change={change} handleModal={handleModal} />
      </Modal>
    </div>
  )
}

export default FilterModal;