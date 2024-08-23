import React from 'react';
import useFetchTideInfo from '../hooks/useFetchTideInfo';
import TideInfo from '../../../components/organisms/TideInfo/TideInfo';

const TideInfoContainer = ({ query }: { query: string }) => {
    const { tideInfo, relevantPorts, loading, error, handleCopy, toastMessage } = useFetchTideInfo(query);

    return (
        <TideInfo
            tideInfo={tideInfo}
            relevantPorts={relevantPorts}
            loading={loading}
            error={error}
            handleCopy={handleCopy}
            toastMessage={toastMessage}
            query={query}
        />
    );
};

export default TideInfoContainer;
