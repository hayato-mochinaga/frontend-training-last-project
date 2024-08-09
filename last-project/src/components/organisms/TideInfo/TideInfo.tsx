import React from 'react';

interface TideInfoProps {
    tideInfo: string;
}

const TideInfo: React.FC<TideInfoProps> = ({ tideInfo }) => {
    return (
        <div>
            <h2>Tide Information</h2>
            <p>{tideInfo}</p>
        </div>
    );
};

export default TideInfo;
