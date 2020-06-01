import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { baseUrl } from '../../config';
import Flag from '../Flag';

const IndexPage = props => {
    const [countries, setCountries] = useState([]);

    const getAll = () => {
        return axios.get(`${baseUrl}/all`);
    };

    const search = keyword => {
        return axios.get(`${baseUrl}/name/${keyword}`);
    };

    useEffect(() => {
        getAll().then(countries => setCountries(countries.data));
    }, [countries]);

    return(
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
    );
};

export default IndexPage;
