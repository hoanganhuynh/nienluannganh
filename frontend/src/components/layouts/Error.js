import React from 'react'
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

import { toast, ToastContainer } from 'react-toastify'
// import '../toast.css'

// Message.propTypes = {}

function Error({ variant, children }) {
  toast.error(
    <div>
      <span className='pr-1' fontSize='large' /> {children}
    </div>,
    {
      position: 'top-right',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }
  )

  return <ToastContainer></ToastContainer>
}

Error.defaultProps = {
  variant: 'info',
}

export default Error