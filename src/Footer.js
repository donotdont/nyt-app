import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import {
    Grid,
    Typography,
    Divider
} from "@material-ui/core";

const styles = theme => ({
    footer: {
        maxWidth: 700, 
        margin: "24px auto", 
        textAlign: "center"
    },
    divider: {
        margin:  "24px auto",
        width: 60
    }
});

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    currentYear = () => {
        var date = new Date();
        var thisYear = date.getFullYear();
        return thisYear;
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footer}>
                <Typography variant="caption" align={"center"}>
                    © Copyright {this.currentYear()} The New York Times
                </Typography>
                <Divider className={classes.divider} />
                <Grid container justify={"center"} spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"textSecondary"}>
                            About
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"textSecondary"}>
                            Blog
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"textSecondary"}>
                            Terms & Conditions
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography align={"center"} gutterBottom color={"textSecondary"}>
                            Contact us
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);