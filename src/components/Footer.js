import React from 'react'
import {useStyles} from "../StileSide";
import { Button, Container, Typography } from "@material-ui/core";

function Footer() {
    const classes = useStyles ();
    return (
        <div  className={classes.mainContent}>
            <Container>
                <Typography  variant="caption" gutterBottom style={{color:'rgba(255, 255, 255, 0.6)'}}>
                    © 2020, All Rights Reserved.  Made With ©️ by Israel  |
                    <Button href="https://www.linkedin.com/feed/" color="primary" target="_blank" className={classes.footerButton}>
                        Contact Developer
                    </Button>
                </Typography>
            </Container>
        </div>
    )
}

export default Footer