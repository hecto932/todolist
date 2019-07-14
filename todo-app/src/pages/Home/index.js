import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Tasks from './Tasks'
import Title from './Title'
import AddTask from './AddTask'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: '1em'
  }
}))


// {data, error, isLoading, dispatch}
function Home() {
  const classes = useStyles()

  return (
    <Container fixed>
      <Grid className={classes.root}>
        <Title titleName="Tasks" />
        <AddTask />
        <Tasks />
      </Grid>
    </Container>
  )
}

export default Home
