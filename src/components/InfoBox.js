import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "../css/InfoBox.css";
import {CardInfoBox} from '../StileSide';

function InfoBox({ title, cases, total, active, isRed, ...props }) {
    console.log(title, active);

    return (
        <CardInfoBox
            onClick={props.onClick}
            className={`infoBox ${active && "infoBox--selected"} ${
                isRed && "infoBox--red"
            }`}
        >
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
                    {cases}
                </h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </CardInfoBox>
    );
}

export default InfoBox;