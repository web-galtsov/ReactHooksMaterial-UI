import React, { useState, useEffect } from 'react';
import '../css/App.css';
import InfoBox from '../components/InfoBox';
import Map from "./Map";
import Table from './Table';
import {sortData} from '../util/util';
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import {
    AppHeader,
    AppStats,
    AppLeft
} from '../StileSide';

import {
    MenuItem,
    FormControl,
    Select,
    Card, CardContent
} from '@material-ui/core';



// https://disease.sh/v3/covid-19/countries

function App() {
 //  const classes = useStyles();
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);




    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then((data) => {
                setCountryInfo(data);
        });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
           fetch('https://disease.sh/v3/covid-19/countries')
             .then((response) => response.json())
             .then((data) => {
                    // noinspection JSUnresolvedVariable
                    const countries = data.map((country) => ({
                            name: country.country,
                            value: country.countryInfo.iso2,
                       }));
                    let sortedData = sortData(data);
                         setCountries(countries);
                   /*      setMapCountries(data);*/
                         setTableData(sortedData);
                     });
                 };
                getCountriesData();
            }, []);

        const onCountryChange = (event) => {
            const countryCode = event.target.value;
            setCountry(countryCode);

            const url = countryCode === 'worldwide'
                ? 'https://disease.sh/v3/covid-19/all' :
                `https://disease.sh/v3/covid-19/countries/${countryCode}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setCountry(countryCode);
                    setCountryInfo(data);
                })
            };
  // noinspection JSUnresolvedVariable
    console.log("test forl", countryInfo)
    return (
    <div className="ContentApp">
        <AppLeft>
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
                    <InfoBox
                        title='Coronavirus Cases'
                        cases={countryInfo.todayCases}
                        total={countryInfo.cases}
                    />
                    <InfoBox
                        title='Recovered'
                        cases={countryInfo.todayRecovered}
                        total={countryInfo.recovered}
                    />
                    <InfoBox
                        title='Deaths'
                        cases={countryInfo.todayDeaths}
                        total={countryInfo.deaths}
                    />
                </AppStats>
            <Map/>
        </AppLeft>
        <Card className='app_right'>
            <CardContent>
                <h3>Live Cases by Country</h3>
                <Table countries = {tableData} />
                {/* table */}
                <h3>Worldwide new cases</h3>
                <LineGraph />
                {/* Graph */}
            </CardContent>
        </Card>
    </div>
  );
}
export default App;
