import React from "react";
import numeral from "numeral";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useStyles } from "../StileSide";

function Table({ countries }) {
    const classes = useStyles();
    return (
        <List height={400} className={classes.ListTable} >
            {countries.map(({ country, cases }) => (
            <ListItem button style={{paddingTop: '4px',paddingBottom: '4px'}} divider key={country}>
               <ListItemText>
                {country}
               </ListItemText>
               <ListItemText>
                 <strong style={{textAlign: 'right',display: 'block'}}>{numeral(cases).format("0,0")}</strong>
               </ListItemText>
            </ListItem>
                 ))}
        </List>
    );
}
export default Table;