import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import Loader from '../../General/Loader'
import ErrorMessage from '../../General/ErrorMessage'

import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  }
}))

const ADD_USER = gql`
  mutation createUser($user: UserInput!) {
    addUser(input: $user) {
      _id
      name
      email
      createdAt
    }
  }
`

const RegisterUser = ({ classes, error }) => (
  <Mutation mutation={ADD_USER}>
    {(addUser, { data, loading, error }) => {
      if (loading) {
        return <Loader />
      }
      if (error) {
        return <ErrorMessage message={error} />
      }
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <form
              className={classes.form}
              noValidate
              onSubmit={async e => {
                e.preventDefault()

                try {
                  const variables = {}
                  variables.name = document.getElementById('name').value
                  variables.email = document.getElementById('email').value
                  variables.password = document.getElementById('password').value
                  const { value: confirm_password } = document.getElementById(
                    'confirm_password'
                  )
                  console.log({ variables: { user: variables } })
                  const response = await addUser({
                    variables: { user: variables }
                  })
                  console.log(response)
                } catch (err) {
                  console.log(err.message)
                }
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Confirm password"
                label="Confirm password"
                type="password"
                id="confirm_password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
            {error && <ErrorMessage message={error} />}
          </div>
          <Box mt={5} />
        </Container>
      )
    }}
  </Mutation>
)

function RegisterForm() {
  const classes = useStyles()

  return <RegisterUser classes={classes} error={null} />
}

export default RegisterForm
