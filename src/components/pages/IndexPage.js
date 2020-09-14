import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { baseUrl } from '../../config';
import Flag from '../Flag';

const IndexPage = () => {
    const [countries, setCountries] = useState([]);
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

    const getCountries = region => {
        if (!region) {
            return axios.get(`${baseUrl}/all`)
        } else {
            return axios.get(`${baseUrl}/region/${region}`)
        };
    };

    const search = event => {
        // const value = document.querySelector("input").value;
        // keyword => axios.get(`${baseUrl}/name/${keyword}`)
    };

    const filterByRegion = (event, region) => {
        getCountries(region.toLowerCase()).then(countries => setCountries(countries.data));
    };

    useEffect(() => {
        getCountries().then(countries => setCountries(countries.data));
    }, [countries]);

    return(
        <>
            <div className="subheader">
                <div className="search">
                    <i className="fa fa-search"></i>
                    <input 
                        type="text" 
                        placeholder="Search for a country..." 
                        onInput={() => search}
                    />
                </div>

                <div className="filter">
                    <button className="dropbtn">Filter By Region</button>
                    <div className="dropdown-content">
                        {regions.map(region => (
                            <p             
                                key={region} 
                                className="region"
                                onClick={event => filterByRegion(event, region)}
                            >{region}</p>
                        ))}
                    </div>
                </div>
            </div>
            <main className="countries home">
                {countries.map(country => (
                    <Link 
                        key={country.name} 
                        to={`/${country.alpha3Code}`} 
                    >
                        <div className="country card">
                            <Flag url={country.flag} />

                            <div className="summary">
                                <h6>{country.name}</h6>
                                <p><strong>Population:</strong> {country.population}</p>
                                {country.region && (
                                    <p><strong>Region:</strong> {country.region}</p>
                                )}
                                {country.capital && (
                                    <p><strong>Capital:</strong> {country.capital}</p>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </main>
        </>
    );
};

export default IndexPage;
