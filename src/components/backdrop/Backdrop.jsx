import React from 'react'

const Backdrop = ({open}) => {
    return (
      <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            // onClick={handleCloseBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
      </div>
    )
  }
  
  export default Backdrop
