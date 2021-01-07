import React, { useState, useEffect } from "react";
import "../css/App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import Footer from "./Footer";
import { sortData, prettyPrintStat } from "../util/util";
import numeral from "numeral";
import Map from "./Map";
import Bg_symptoms from "../image/Bg_simp.png";
import "leaflet/dist/leaflet.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import {
    MenuItem,
    FormControl,
    Select,
    CardContent, Grid, Container, CssBaseline, Typography
} from "@material-ui/core";

import {
    AppHeader,
    AppHeaderH1,
    AppStats,
    CardInfoBoxTable,
    AppInformation,
    CardInfoBoxBg,
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
                countryCode === "worldwide"
                    ? setMapCenter([34.80746, -40.4796])
                    : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                 setMapZoom(4);
            });
        console.log(countryInfo);
    };

    // noinspection JSUnresolvedVariable
    return (
        <MuiThemeProvider theme={themeLight}>
         <Container maxWidth = 'xl'>
            <Grid container spacing={3}>
                <Grid item xs={12}  sm={9}>
                   <AppHeader>
                     <AppHeaderH1>COVID-19 Tracker</AppHeaderH1>
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
                                           isRed
                                           active={casesType === "cases"}
                                           onClick={() => setCasesType("cases")}
                                           title="Coronavirus Cases"
                                           total={numeral(countryInfo.cases).format("0.0a")}
                                           cases={prettyPrintStat(countryInfo.todayCases)}
                                         />
                                     </Grid>
                                     <Grid item xs={12} sm={4}>
                                        <InfoBox
                                            onClick={() => setCasesType("recovered")}
                                            title="Recovered"
                                            active={casesType === "recovered"}
                                            cases={prettyPrintStat(countryInfo.todayRecovered)}
                                            total={numeral(countryInfo.recovered).format("0.0a")}
                                        />
                                     </Grid>
                                     <Grid item xs={12} sm={4}>
                                        <InfoBox
                                             elevation={0}
                                             onClick={() => setCasesType("deaths")}
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
             <Container maxWidth = 'xl' style={{paddingRight: '0'}}>
               <CssBaseline />
                 <Grid container>
                     <Grid item xs={12}  sm={6}>
                         <CardInfoBoxBg>
                             <img src={Bg_symptoms} className={classes.ImgSymptoms}  alt="symptoms"/>
                         </CardInfoBoxBg>
                     </Grid>
                     <Grid item xs={12}  sm={6}>
                       <CssBaseline/>
                         <CardInfoBoxTable style={{marginTop: '20px'}}>
                             <CardContent style={{padding: '15px 45px'}}>
                                 <AppInformation>
                                     Symptoms
                                 </AppInformation>
                                    <h3>Most Common Cases</h3>
                                        <ul className={classes.ListUl}>
                                            <li>Fever</li>
                                            <li>Dry cough</li>
                                            <li>Tiredness</li>
                                        </ul>
                                    <h3>Less Common Cases</h3>
                                        <ul className={classes.ListUl}>
                                            <li>Aches and pains</li>
                                            <li>Sore throat</li>
                                            <li>Diarrhoea</li>
                                            <li>Conjunctivitis</li>
                                            <li>Headache</li>
                                            <li>Loss of taste or smell</li>
                                            <li>A rash on skin, or discolouration of fingers or toes</li>
                                        </ul>
                                    <h3>Serious Common Cases</h3>
                                         <ul className={classes.ListUl}>
                                            <li>Difficulty breathing or shortness of breath</li>
                                            <li>Chest pain or pressure</li>
                                            <li>Loss of speech or movement</li>
                                        </ul>
                                 </CardContent>
                             </CardInfoBoxTable>
                      </Grid>
                </Grid>
             </Container>
         </Container>
        <Footer/>
        </MuiThemeProvider>
    );
};
export default App;