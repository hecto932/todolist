import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import { changeStatus } from '../../actions/tasksActions'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import ErrorMessage from '../../General/ErrorMessage'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
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

const TasksQuery = ({ classes, handleOnChange }) => {
  return (
    <Query
      query={gql`
        {
          getTasks {
            _id
            name
            done
          }
        }
      `}
    >
    {({ loading, error, data }) => {
      if (loading) {
        return <p>conooo loading...</p>
      }
      if (error) {
        <ErrorMessage message={error} />
      }

      return data.getTasks.map((t, i) => {
        return (
          <Paper key={i} className={classes.paper}>
            <Typography
              className={t.done ? classes.taskName : ''}
              component="p"
            >
              <Checkbox
                onChange={handleOnChange}
                className={classes.checkbox}
                defaultChecked={t.done}
                value={t._id}
                inputProps={{
                  'aria-label': 'primary checkbox'
                }}
              />
              {t.name}
            </Typography>
          </Paper>
        )
      })
    }}
    </Query>
  )
}

function Tasks({ tasks, changeStatus, user }) {
  const classes = useStyles()
  console.log(tasks, user)

  const handleOnChange = (e) => {
    const { checked } = e.target
    const { value } = e.target

    changeStatus({ _id: value, done: checked })
  }

  return <TasksQuery classes={classes} handleOnChange={handleOnChange} />
}

const mapStateToProps = reducer => reducer
const mapDispatchToProps = {
  changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)