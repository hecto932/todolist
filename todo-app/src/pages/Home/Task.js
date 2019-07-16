import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  taskCompleted: {
    textDecoration: 'line-through'
  },
  checkbox: {},
  paper: {
    padding: '0.5em',
    margin: '1em 0',
    color: theme.palette.text.secondary
  }
}))

function Task(props) {
  const classes = useStyles()
  const { data } = props
  return (
    <Paper className={classes.paper}>
      <Typography className={data.done ? classes.taskCompleted : ''} component="p">
        <Checkbox
          className={classes.checkbox}
          defaultChecked={data.done}
          value={data._id}
          inputProps={{
            'aria-label': 'primary checkbox'
          }}
        />
        {data.name}
      </Typography>
    </Paper>
  )
}


export default Task