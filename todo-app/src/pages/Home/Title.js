import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  componentTitle: {
    fontSize: '2em',
    textAlign: 'center'
  }
}))

function Title (props) {
  const classes = useStyles()

  const { titleName } = props
  return (
    <Typography className={classes.componentTitle} component="h2">
      {titleName}
    </Typography>
  )
}

export default Title