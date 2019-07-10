import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'

import AddTask from './AddTask'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  componentTitle: {
    fontSize: '2em',
    textAlign: 'center'
  },
  taskName: {
    textDecoration: 'line-through'
  },
  checkbox: {
  },
  paper: {
    padding: '0.5em',
    margin: '1em 0',
    color: theme.palette.text.secondary
  }
}))

export default function Tasks(props) {
  const classes = useStyles()

  const { tasks } = props

  return (
    <div className={classes.root}>
      <Typography className={classes.componentTitle} component="h2">
        Tasks
      </Typography>
      <AddTask />
      {tasks.map((t, i) => {
        return (
          <Paper key={i} className={classes.paper}>
            <Typography
              className={t.done ? classes.taskName : ''}
              component="p"
            >
              <Checkbox
                className={classes.checkbox}
                defaultChecked={t.done}
                value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox'
                }}
              />
              {t.name}
            </Typography>
          </Paper>
        )
      })}
    </div>
  )
}
