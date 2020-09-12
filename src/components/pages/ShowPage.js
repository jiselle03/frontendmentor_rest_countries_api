import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { baseUrl } from '../../config';
import Flag from '../Flag';
import BorderCountry from '../BorderCountry';

const ShowPage = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState({});

    const getOne = code => axios.get(`${baseUrl}/alpha/${code}`);

    const { 
        borders,
        capital,
        currencies,
        flag, 
        languages,
        name,
        nativeName,
        population,
        region,
        subregion,
        topLevelDomain
    } = country;

    useEffect(() => {
        getOne(props.match.params.country)
            .then(country => setCountry(country.data))
            .then(() => setIsLoading(false));
    }, [props.match.params.country]);

    return isLoading ? <p>Fetching data...</p> :
    (
        <main>
            <Link to="/">
                <button className="back">
                    <i className="fas fa-arrow-left"></i>
                    Back
                </button>
            </Link>
        
            <div className="country details">
                <Flag url={flag} large />

                <div className="info">
                    <h3>{name}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p><strong>Native Name:</strong> {nativeName}</p>
                                    <p><strong>Population:</strong> {population}</p>
                                    <p><strong>Region:</strong> {region}</p>
                                    <p><strong>Sub Region:</strong> {subregion}</p>
                                    <p><strong>Capital:</strong> {capital}</p>
                                </td>
                            
                                <td>
                                    <p><strong>Top Level Domain:</strong> {topLevelDomain}</p>
                                    <p><strong>Currencies:</strong> {currencies && currencies.map((currency, i) => (
                                        <span key={i}>{currency.name}{i !== currencies.length - 1 ? ", " : ""}</span>
                                    ))}</p>
                                    <p><strong>Languages:</strong> {languages && languages.map((language, i) => (
                                        <span key={i}>{language.name}{i !== languages.length - 1 ? ", " : ""}</span>
                                    ))}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    {borders.length > 0 && (
                        <p>
                            <strong>Border Countries: </strong>
                            {borders.map(code => (
                                <Link key={code} to={`/${code}`}>
                                    <BorderCountry 
                                        code={code} 
                                        getOne={getOne}
                                    />
                                </Link>
                            ))}
                        </p>
                    )}
                    
                </div>
            </div>
        </main>
    );
};

export default ShowPage;
