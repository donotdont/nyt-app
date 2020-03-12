import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';

const themeColor = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: grey,
  },
   typography: {
    useNextVariants: true,
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Loading(props) {
  const { classes } = props;
  return (
    <MuiThemeProvider theme={themeColor} sheetsManager={new Map()}>
        <div className={classes.root} style={{position: 'fixed',top: 0,left: 0,right: 0,bottom: 0,backgroundColor: '#fff',zIndex: 600000,marginLeft:'-20px',marginTop:'-20px'}}>
          <CircularProgress className={classes.progress} style={{position: 'absolute',left: '50%', top: '50%'}} />
        </div>
    </MuiThemeProvider>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
