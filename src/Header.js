import React, { Component, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import style from './header.css'
import logo from './logo.svg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Badge,
    MenuItem,
    Menu,
    TextField,
    CircularProgress
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'block',
        paddingTop: 8,
        paddingBottom: 8,
        /*display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },*/
    },
    logo: {
        marginTop: 10,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971' },
    { code: 'AF', label: 'Afghanistan', phone: '93' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
    { code: 'AI', label: 'Anguilla', phone: '1-264' },
    { code: 'AL', label: 'Albania', phone: '355' },
    { code: 'AM', label: 'Armenia', phone: '374' },
];

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            /*loadingSearch: false,
            dataSearch: [],
            open: false,*/
            anchorEl: null,
            mobileMoreAnchorEl: null,
            isMenuOpen: false,
            isMobileMenuOpen: false,

            /*single: '',
            popper: '',
            suggestions: [],
            anchorEl_lang: null,
            open_lang: true,

            width: props.width,*/
            articles: [],
            isLoaded: false,
            open: false
        };

        //this.handleScroll = this.handleScroll.bind(this);
    }

    handleProfileMenuOpen = event => {
        console.log('handleProfileMenuOpen', event.currentTarget)
        //setAnchorEl(event.currentTarget);
        this.setState({
            anchorEl: event.currentTarget,
            isMenuOpen: true
        });
    };

    handleMobileMenuClose = () => {
        //setMobileMoreAnchorEl(null);
        this.setState({
            mobileMoreAnchorEl: null,
            isMobileMenuOpen: false
        });
    };

    handleMenuClose = () => {
        //setAnchorEl(null);
        this.setState({
            anchorEl: null,
            isMenuOpen: false
        });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        //setMobileMoreAnchorEl(event.currentTarget);
        this.setState({
            mobileMoreAnchorEl: event.currentTarget,
            isMobileMenuOpen: true
        });
    };

    sleep(delay = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }

    articleSearch = async (event) => {
        let active = true;

        this.setState({
            isLoaded: false,
        });
        /*fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + global.api + "&q=" + event.target.value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        articles: result.response.docs
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                    });
                }
            )*/

        const response = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + global.api + "&q=" + event.target.value);
        await this.sleep(1e3); // For demo purposes.
        const result = await response.json();

        if (active) {
            this.setState({
                isLoaded: true,
                articles: result.response.docs
            });
        }
    }

    render() {
        const { classes } = this.props;
        const {
            anchorEl,
            isMenuOpen,
            mobileMoreAnchorEl,
            isMobileMenuOpen,
            articles,
            open,
        } = this.state;
        const loading = open && articles.length === 0;
        //const [anchorEl, setAnchorEl] = useState(null);
        //const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

        //const isMenuOpen = Boolean(anchorEl);
        //const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            <Link to={`/`}>
                                <img src={logo} className={classes.logo} alt="logo" alt="The New York Times" width="195" />
                            </Link>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <Autocomplete
                                freeSolo
                                id="country-select-demo"
                                style={{ width: 300 }}
                                open={open}
                                onOpen={() => {
                                    this.setState({
                                        open: true,
                                    });
                                }}
                                onClose={() => {
                                    this.setState({
                                        open: false,
                                    });
                                }}
                                options={articles}
                                loading={loading}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                getOptionLabel={option => option.abstract}
                                renderOption={option => (
                                    <React.Fragment>
                                            <span>{option.multimedia && option.multimedia.length > 0 && option.multimedia.find((value, index) => value.subtype == "smallSquare168") && (<img src={"https://www.nytimes.com/" + option.multimedia.find((value, index) => value.subtype == "smallSquare168").url} width="50" />)}</span>
                                            <Link to={`/detail/${option.web_url.replace("https://www.nytimes.com/", "")}`}>{option.abstract}</Link>
                                    </React.Fragment>
                                )}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{
                                            ...params.inputProps,
                                            //autoComplete: 'disabled', // disable autocomplete and autofill
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                        onChange={this.articleSearch}
                                    />
                                )}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={17} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);