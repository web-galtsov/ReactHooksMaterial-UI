import React, { useState, useEffect } from 'react';
import './css/App.css';
import {
    AppHeader,
    AppStats
} from './StileSide';
import {
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';

// https://disease.sh/v3/covid-19/countries

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch('https://disease.sh/v3/covid-19/countries')
                .then((response) => response.json())
                .then((data) => {
                    // noinspection JSUnresolvedVariable
                    const countries = data.map((country) => (
                       {
                            name: country.country,
                            value: country.countryInfo.iso2,
                       }));
                    setCountries(countries);
                });
              };
                getCountriesData();
            }, []);

        const onCountryChange = (event) => {
            const countryCode = event.target.value;
            setCountry(countryCode);
        };

  // noinspection JSUnresolvedVariable
    return (
    <div className="App">
        <AppHeader>
            <h1>Covid - 19 TRACKER</h1>
                <FormControl className='app_dropdown'>
                    <Select variant='outlined' onChange={onCountryChange} value ={country}>
                        <MenuItem value='worldwide'>Worldwide</MenuItem>
                        { countries.map((country) => (
                             <MenuItem  value={country.value}>{country.name}</MenuItem>

                        ))}
                    </Select>
                </FormControl>
        </AppHeader>
        <AppStats>

        </AppStats>
    </div>
  );
}
export default App;
