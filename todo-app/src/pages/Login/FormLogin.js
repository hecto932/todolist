import React from 'react'
import { connect } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { setUserLogin } from '../../helpers'
import { userLoged, userError } from '../../actions/usersActions'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password)
  }
`

const UserLogin = ({ classes, userLoged, userError }) => {
  return (
    <Mutation mutation={USER_LOGIN}>
      {(login, { data }) => {
        console.log(`data -> `, data)
        return (
          <form
            className={classes.form}
            noValidate
            onSubmit={async e => {
              e.preventDefault()

              const email = document.getElementById('email').value
              const password = document.getElementById('password').value

              try {
                const {
                  data: {
                    userLogin
                  }
                } = await login({ variables: { email, password } })
                setUserLogin(userLogin)
                userLoged(userLogin)
                console.log(`Response ->`, userLogin)
              } catch (err) {
                console.log(`Error -> ${err.message}`)
                userError(err.message)
              }
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        )
      }}
    </Mutation>
  )
}

function FormLogin({ user, isLoading, error, userLoged, userError }) {
  const classes = useStyles()

  if (!(JSON.stringify(user) === JSON.stringify({}))) {
    return <Redirect to="/" />
  }

  return <UserLogin classes={classes} userLoged={userLoged} userError={userError} />
}

const mapStateToProps = ({ user }) => user
const mapDispatchToProps = {
  userLoged,
  userError
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin)
