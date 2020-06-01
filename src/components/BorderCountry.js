import React, { useState, useEffect } from 'react';

const BorderCountry = props => {
    const [country, setCountry] = useState({});
    const { getOne, code } = props;

    useEffect(() => {
        getOne(code).then(country => setCountry(country.data));
    }, [code]);

    return (
        <button>{country.name}</button>
    );
};

export default BorderCountry;
