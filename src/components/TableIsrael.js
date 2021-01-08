import React, { useState ,useEffect } from "react";
//import numeral from "numeral";
//import { List } from "@material-ui/core";
//import { useStyles } from "../StileSide";


const url = "https://disease.sh/v3/covid-19/countries";

export const TableIsr = () => {
    const [countries, setCountries] = useState ( [] );
    const getCountries = async () => {
        const response = await fetch ( url );
        const countries = await response.json ();




//        setCountries ( countries );
        setCountries(countries);
        console.log('countriesNew:', countries)
    };
    useEffect ( () => {
        getCountries ();
    }, [] );
     return (
         <>
         <h3>test</h3>
             <ul>
                   <li >{countries.cases} </li>

             </ul>
         </>
     );
};



/*

function TableIsr() {
//    const classes = useStyles ();
    const [countries, setCountries] = useState ( [] );
    const getCountries = async () => {
        const response = await fetch ( url );
        const countries = await response.json ();
        setCountries ( countries );
    };
    useEffect ( () => {
        getCountries ();
    }, [] );

        return (
            /!* <List height={400}  itemSize={46} itemCount={200} className={classes.ListTable} >
                 {countries.map(({ country, cases }) => (
                     <ListItem button style={{paddingTop: '4px',paddingBottom: '4px'}} divider>
                         <ListItemText>
                             {country}
                         </ListItemText>
                         <ListItemText>
                             <strong style={{textAlign: 'right',display: 'block'}}>{numeral(cases).format("0,0")}</strong>
                         </ListItemText>
                     </ListItem>
                 ))}
             </List>*!/
            <ul>
              {countries.map((country) => {
                const { _id, cases } = country
                 return (
                     <>
                     <li key={_id}>{country}</li>
                     <li key={_id}>{cases}</li>
                     </>
                 )
               })}
            </ul>
        );
    }
export default TableIsr;*/
