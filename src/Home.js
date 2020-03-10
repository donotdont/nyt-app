import './Global';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
//import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Button } from '@material-ui/core';

import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import { createMuiTheme, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { yellow, deepOrange, red } from '@material-ui/core/colors';

const themeColor = createMuiTheme({
    palette: {
        primary: {
          light: '#757ce8',
          main: '#3f50b5',
          dark: '#002884',
          contrastText: '#fff',
        },
        secondary: {
          light: '#ff7961',
          main: '#f44336',
          dark: '#ba000d',
          contrastText: '#000',
        },
      },
     typography: {
      useNextVariants: true,
    },
  });
  
  const styles = theme => ({
    root: {
      width: '100%',
    },
    rootPaper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
      
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      objectFit: 'cover',
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    chip: {
      color: '#888',
      margin: theme.spacing.unit,
      cursor: 'pointer'
    },
    clearSpacing: {
        width: '100%',
        margin: 0,
    },
  });

class Home extends Component{
    constructor(props){
        super(props);

        this.state = {

        }

    }

    render() {
        return (
            <MuiThemeProvider theme={themeColor} sheetsManager={new Map()}>
                <Helmet title="Blog" lang="en" meta={[{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0'
                }]} />
                <Header />
                <Button variant="contained" color="primary">Hello World</Button>
                <Footer />
            </MuiThemeProvider>
        );
    }
}


//export default Home;

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Home);