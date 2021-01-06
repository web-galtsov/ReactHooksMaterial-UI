import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import "../css/InfoBox.css";
import {CardInfoBox, useStyles,InfoBoxCases} from '../StileSide';

function InfoBox({title, cases, total, active, isRed, ...props }) {
    console.log(title, active,isRed);
    const classes = useStyles();
    console.log('Read isRed: ', isRed);
    return (
        <CardInfoBox
            onClick={props.onClick}
            borderTop={active ? "10px #F48221 solid" : "10px #fff solid"}
            color={active ? "#F48221" : "#5146AF"}
           /* className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
            }`}*/
        >
            <CardContent>
                <Typography className={classes.infoBoxTitle}  gutterBottom>
                    {title}
                </Typography>
                {/*<h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </h2>*/}
                <InfoBoxCases
                   /* color={!isRed ? "#F48221" : "#5146AF"}*/
                    color={`${!isRed && "#CE630B"}`}
                   >
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