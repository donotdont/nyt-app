import './Global';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Iframe from 'react-iframe'
//import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loading from './Loading';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    IconButton
} from '@material-ui/core';

import clsx from 'clsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert'

import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

import {
    createMuiTheme,
    MuiThemeProvider,
    createGenerateClassName
} from '@material-ui/core/styles';
import {
    yellow,
    deepOrange,
    red,
    grey
} from '@material-ui/core/colors';

const themeColor = createMuiTheme({
    palette: {
        primary: {
            light: '#a66c1f',
            main: '#ee9b2d',
            dark: '#a66c1f',
            contrastText: '#fff',
        },
        secondary: grey,
    },
    typography: {
        useNextVariants: true,
    },
});

const styles = theme => ({
    root: {
        width: '100%',
    },
    rootContent: {
        padding: 16,
        [theme.breakpoints.up("sm")]: {
            padding: 24,
            maxWidth: 960,
            margin: "auto"
        },
        [theme.breakpoints.up("md")]: {
            maxWidth: 1400
        },
    },
    rootPaper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
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
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(9),
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
        paddingTop: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(10),
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
        margin: theme.spacing(1),
        cursor: 'pointer'
    },
    clearSpacing: {
        width: '100%',
        margin: 0,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }
});

class Detail2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }

    }

    componentDidMount() {
        let { year, month, day, category, type, file } = this.props.match.params;
        fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${global.api}&q=${year + "/" + month + "/" + day + "/" + category + "/" + type + "/" + file}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.response.docs
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { classes } = this.props;
        const { year, month, day, category, type, file } = this.props.match.params;
        const { error, isLoaded, items } = this.state;
        return (
            <MuiThemeProvider theme={themeColor} > {/*sheetsManager={new Map()}*/}
                <Helmet title="New York Times App" lang="en" meta={[{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0'
                }]} />
                <Header />

                {error && (
                    <div>Error: {error.message}</div>
                )}

                {!isLoaded && (
                    <Loading />
                )}

                {isLoaded && (
                    <div className={classes.rootContent}>
                        <Grid container justify={"center"} spacing={2}>

                            {items && items.map(item => {
                                //console.log(item.media[0]["media-metadata"]);
                                //console.log(item.web_url, `https://www.nytimes.com/${year}/${month}/${day}/${category}/${file}`, item.web_url == "https://www.nytimes.com/" + year + "/" + month + "/" + day + "/" + category + "/" + file);
                                if (item.web_url == "https://www.nytimes.com/" + year + "/" + month + "/" + day + "/" + category + "/" + type + "/" + file) {
                                    return (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Typography align={"center"} gutterBottom color={"textSecondary"}>
                                                <Card className={classes.root}>
                                                    <CardActionArea>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Contemplative Reptile"
                                                            height="360"
                                                            image={item.multimedia[0] && typeof (item.multimedia[0]["url"]) != undefined && item.multimedia.length > 0 ? "https://www.nytimes.com/" + item.multimedia[0]["url"] : "https://www.nytimes.com/vi-assets/static-assets/NYT-BestSeller-1200x675-84503d139c9bc060c754589889fa3767.png"}
                                                            title="Contemplative Reptile"
                                                        />
                                                    </CardActionArea>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="h2">{item.headline.print_headline}</Typography>
                                                        <Typography variant="body2" color="textSecondary" component="p">{item.lead_paragraph}</Typography>
                                                        <Iframe src={`https://www.nytimes.com/${year}/${month}/${day}/${category}/${file}`} frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:150%;width:150%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="1600px" width="150%" />
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton aria-label="add to favorites">
                                                            <FavoriteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="share">
                                                            <ShareIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            className={classes.expand}
                                                            aria-label="show more"
                                                        >
                                                            <ExpandMoreIcon />
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </Typography>
                                        </Grid>
                                    );
                                }
                            })}


                        </Grid>
                    </div>
                )}



                <Footer />
            </MuiThemeProvider>
        );
    }
}

Detail2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Detail2);