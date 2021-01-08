import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import {CardInfoBox, useStyles,InfoBoxCases} from '../StileSide';

function InfoBox({title, cases, total, active, isRed, ...props }) {
    const classes = useStyles();
    return (
        <CardInfoBox
            onClick={props.onClick}
            borderTop={active ? "10px #F48221 solid" : "10px #8378E2 solid"}
            color={active ? "#F48221" : "#5146AF"}
        >
            <CardContent>
                <Typography className={classes.infoBoxTitle}  gutterBottom>
                    {title}
                </Typography>
                <InfoBoxCases   color={`${!isRed && "#CE630B"}`}>
                    {cases}
                </InfoBoxCases>
                <Typography className={classes.infoBoxTotal}>
                    {total} Total
                </Typography>
            </CardContent>
        </CardInfoBox>
    );
}
export default InfoBox;