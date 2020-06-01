import React from 'react';

const Flag = ({ url, large }) => {

    return(
        <div
            className={large ? "flag large" : "flag"}
        >
            <img 
                alt="flag"
                src={url} 
                width="100%"
            />
        </div>
    );
};

export default Flag;
