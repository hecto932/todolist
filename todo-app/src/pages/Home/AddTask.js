import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';

import { createTask } from '../../actions/tasksActions'

const useStyles = makeStyles({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

function AddTask({ createTask, changeStatus }) {
  const classes = useStyles();

  const handleKeyPress = (e) => {
    const { value } = e.target
    const { which } = e

    if (value && which === 13) {
      console.log(value)
      createTask({ name: value })
    }
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        onKeyPress={handleKeyPress}
        className={classes.input}
        placeholder="Add a new task..."
        inputProps={{ 'aria-label': 'Search Google Maps' }}
      />
      <Divider className={classes.divider} />
      <IconButton className={classes.iconButton} aria-label="Menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  );
}

const mapStateToProps = ({ tasks }) => tasks
const mapDispatchToProps = {
  createTask
}
export default connect(mapStateToProps, mapDispatchToProps)(AddTask)