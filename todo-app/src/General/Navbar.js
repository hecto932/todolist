import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import config from '../config';
import { logout } from '../helpers'
import { userLogout } from '../actions/usersActions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  appName: {
    color: 'white',
    textDecoration: 'none'
  }
}))

function Navbar({ user, userLogout }) {
  const classes = useStyles()

  const handleLogout = e => {
    e.preventDefault()
    console.log(e)
    logout()
    userLogout()
    window.location.href = '/'
  }


  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <NavLink className={classes.appName} to="/">
              TodoApp
            </NavLink>
          </Typography>
          {localStorage.getItem(`${config.appName}-userToken`) ? (
            <Button className={classes.appName} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button className={classes.appName}>
              <NavLink className={classes.appName} to="/login">
                Login
              </NavLink>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  )
}

const mapStateToProps = ({ user }) => user
const mapDispatchToProps = {
  userLogout
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
