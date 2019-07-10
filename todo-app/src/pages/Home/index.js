import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Tasks from './Tasks'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '1em'
  }
}))

const mockTasks = [
  {
    name: 'Send document',
    done: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Go to eat',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Talk to friend',
    done: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

async function fetchTasks(token) {
  try {
    const { data: { data: { getTasks }} } = await axios({
      url: config.apiUrl,
      method: 'POST',
      data: {
        query: `
          {
            getTasks {
              _id
              name
              done
              createdAt
              updatedAt
            }
          }
        `
      }
    })
    return getTasks
  } catch (err) {
    console.log(`Error -> ${err.messages}`)
    return err
  }
}

export default function Home(props) {
  const classes = useStyles()

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () =>  {
      const response = await fetchTasks()
      setTasks(response)
    }
    fetchData()
  }, [])

  return (
    <Container fixed>
      <Grid className={classes.root}>
        <Tasks tasks={tasks} />
      </Grid>
    </Container>
  )
}
