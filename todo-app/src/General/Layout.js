import React, { Fragment } from 'react'

import Navbar from '../General/Navbar'

export default function Layout (props) {
  return (
    <Fragment>
      <Navbar />
      {props.children}
    </Fragment>
  )
}
