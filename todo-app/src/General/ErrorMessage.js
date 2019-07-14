import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    color: red,
    textAlign: 'center',
    font
  }
}))

function ErrorMessage (props) {
  const classes = useStyles()
  const { message } = props
  return (
    message && (
      <h2 className={classes.root}>{message}</h2>
    )
  )
}

export default ErrorMessage