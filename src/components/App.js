import React, { useState, useEffect } from "react";
import "../css/App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "../util/util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
    MenuItem,
    FormControl,
    Select,
    CardContent, Grid, Container, InputLabel, CssBaseline
} from "@material-ui/core";

import {
    AppHeader,
    AppHeaderH1,
    AppStats,
    CardInfoBoxTable,
    AppInformation,
    useStyles
} from '../StileSide';

const themeLight = createMuiTheme({
    palette: {
        background: {
            default: "#F2F1FC"
        }
    }
});

const App = () => {
    const classes = useStyles();
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [mapCountries, setMapCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    // noinspection JSUnresolvedVariable
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    let sortedData = sortData(data);
                    setCountries(countries);
                    setMapCountries(data);
                    setTableData(sortedData);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;
        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputCountry(countryCode);
                setCountryInfo(data);
                // noinspection JSCheckFunctionSignatures,JSUnresolvedVariable
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    // noinspection JSUnresolvedVariable
    return (
        <MuiThemeProvider theme={themeLight}>
         <Container maxWidth = 'xl'>
            <Grid container spacing={3}>
                <Grid item xs={12}  sm={9}>
                   <AppHeader>
                     <AppHeaderH1>COVID-19 Tracker</AppHeaderH1>
                       {/*<FormControl className={classes.formControl}>
                           <InputLabel id="worldwide">worldwide</InputLabel>
                               <Select
                                  labelId="worldwide"
                                  id="worldwide"
                                  value={country}
                                  onChange={onCountryChange}
                                    >
                                   {countries.map((country) => (
                                        <MenuItem value={country.value} >{country.name}</MenuItem>
                                    ))}
                               </Select>
                       </FormControl>*/}
                       <FormControl className="app__dropdown">
                           <Select
                               variant="outlined"
                               value={country}
                               onChange={onCountryChange}
                           >
                               <MenuItem value="worldwide">Worldwide</MenuItem>
                               {countries.map((country) => (
                                   <MenuItem value={country.value}>{country.name}</MenuItem>
                               ))}
                           </Select>
                       </FormControl>
                   </AppHeader>
                          <AppStats>
                              <CssBaseline />
                                <Grid container spacing={3}>
                                    <Grid item xs={12}  sm={4}>
                                        <InfoBox
                                           className={classes.paperBox}
                                           onClick={(e) => setCasesType("cases")}
                                           title="Coronavirus Cases"
                                           isRed
                                           active={casesType === "cases"}
                                           cases={prettyPrintStat(countryInfo.todayCases)}
                                           total={numeral(countryInfo.cases).format("0.0a")}
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={4}>
                                        <InfoBox
                                            className={classes.paperBox}
                                            onClick={(e) => setCasesType("recovered")}
                                            title="Recovered"
                                            active={casesType === "recovered"}
                                            cases={prettyPrintStat(countryInfo.todayCases)}
                                            total={numeral(countryInfo.cases).format("0.0a")}
                                        />
                                     </Grid>
                                     <Grid item xs={12} sm={4}>
                                        <InfoBox
                                             elevation={0}
                                             className={classes.paperBox}
                                             onClick={(e) => setCasesType("deaths")}
                                             title="Deaths"
                                             isRed
                                             active={casesType === "deaths"}
                                             cases={prettyPrintStat(countryInfo.todayDeaths)}
                                             total={numeral(countryInfo.deaths).format("0.0a")}
                                        />
                                     </Grid>
                                </Grid>
                          </AppStats>
                          <Map
                                countries={mapCountries}
                                casesType={casesType}
                                center={mapCenter}
                                zoom={mapZoom}
                          />
                </Grid>
                <Grid item xs={12}  sm={3}>
                    <CardInfoBoxTable>
                        <CardContent>
                            <AppInformation>
                                Live Cases by Country
                            </AppInformation>
                                <Table countries={tableData} />
                                <h3 style={{padding: '18px 0 20px 5px', borderTop: '1px #ccc solid', }}>Worldwide new {casesType}</h3>
                                <LineGraph casesType={casesType} />
                        </CardContent>
                    </CardInfoBoxTable>
                </Grid>
            </Grid>




         </Container>
        </MuiThemeProvider>
    );
};
export default App;