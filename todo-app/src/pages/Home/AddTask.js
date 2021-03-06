import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { createdTask } from '../../actions/tasksActions'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
})

const ADD_TODO = gql`
  mutation addTask($task: TaskInput!) {
    createTask(input: $task) {
      _id
      name
      done
      createdAt
    }
  }
`

const AddTodo = ({ classes, createdTask }) => {
  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <Paper className={classes.root}>
          <InputBase
            onKeyPress={async e => {
              const { value } = e.target
              const { which } = e

              if (value && which === 13) {
                console.log(value)
                const { data: { createTask } } = await addTodo({ variables: { task: { name: value } } })
                console.log(createTask)
                createdTask(createTask)
              }
            }}
            className={classes.input}
            placeholder="Add a new task..."
            inputProps={{ 'aria-label': 'Search Google Maps' }}
          />
          <Divider className={classes.divider} />
          <IconButton className={classes.iconButton} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Paper>
      )}
    </Mutation>
  )
}

function AddTask({ createdTask }) {
  const classes = useStyles()

  return <AddTodo classes={classes} createdTask={createdTask} />
}

const mapStateToProps = ({ tasks }) => tasks
const mapDispatchToProps = {
  createdTask
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask)
