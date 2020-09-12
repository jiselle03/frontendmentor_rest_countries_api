import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { baseUrl } from '../../config';
import Flag from '../Flag';

const IndexPage = () => {
    const [countries, setCountries] = useState([]);
    const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

    const getAll = () => axios.get(`${baseUrl}/all`);
    const getRegion = region => axios.get(`${baseUrl}/region/${region}`);
    const search = keyword => axios.get(`${baseUrl}/name/${keyword}`);

    const filterByRegion = region => {
        getRegion(region).then(countries => setCountries(countries.data));
    };

    useEffect(() => {
        getAll().then(countries => setCountries(countries.data));
    }, [countries]);

    return(
        <>
            <div className="subheader">
                <div className="search">
                    <i class="fa fa-search"></i>
                    <input type="text" placeholder="Search for a country..." />
                </div>

                <div className="filter">
                    <button className="dropbtn">Filter By Region</button>
                    <div className="dropdown-content">
                        {regions.map(region => (
                            <p 
                                key={region}
                                // onClick={filterByRegion(region.toLowerCase())}
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
                                <p><strong>Region:</strong> {country.region}</p>
                                <p><strong>Capital:</strong> {country.capital}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>
        </>
    );
};

export default IndexPage;
