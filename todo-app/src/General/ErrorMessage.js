import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    color: red,
    textAlign: 'center',
    fontSize: '1em',
    color: 'red',
    fontWeight: 'light'
  }
}))

function ErrorMessage(props) {
  const classes = useStyles()
  const { message } = props
  return (
    message && (
      <Typography className={classes.root} variant="h4" component="h5">
        {message}
      </Typography>
    )
  )
}

export default ErrorMessage
