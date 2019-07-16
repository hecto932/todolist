import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import { changeStatus, taskFetched } from '../../actions/tasksActions'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import ErrorMessage from '../../General/ErrorMessage'
import Loader from '../../General/Loader'

const GET_TASKS = gql`
  {
    getTasks {
      _id
      name
      done
    }
  }
`

const TasksQuery = ({ tasks, taskFetched }) => {
  return (
    <Query query={GET_TASKS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <Loader />
        }
        if (error) {
          return <ErrorMessage message={error} />
        }
        if (JSON.stringify(tasks) !== JSON.stringify(data.getTasks)) {
          taskFetched(data.getTasks)
        }
        // taskFetched(data.getTasks)
        return data.getTasks.map(task => <Task key={task._id} data={task} />)
      }}
    </Query>
  )
}

function Tasks({ tasks, changeStatus, user, taskFetched }) {
  return (
    <TasksQuery tasks={tasks.data} taskFetched={taskFetched} />
  )
}

const mapStateToProps = reducer => reducer
const mapDispatchToProps = {
  changeStatus,
  taskFetched
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks)
