import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  AppBar,
  Theme,
} from '@material-ui/core'
import { MenuIcon } from '@material-ui/data-grid'
import React from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const MJAppBar = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default MJAppBar
