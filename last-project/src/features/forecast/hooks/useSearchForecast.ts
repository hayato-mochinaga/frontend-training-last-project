import axios from 'axios';

const useSearchForecast = () => {
    const searchForecast = async (query: string) => {
        try {
            const response = await axios.get(
                '/api/geocode/V1/geoCoder', {
                    params: {
                        appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-',
                        query,
                        output: 'json'
                    }
                }
            );

            if (response.data && response.data.Feature && response.data.Feature.length > 0) {
                const feature = response.data.Feature[0];
                return {
                    Name: feature.Name,
                    Coordinates: feature.Geometry.Coordinates,
                    BoundingBox: feature.Geometry.BoundingBox
                };
            } else {
                console.error('No results found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching forecast data', error);
            return null;
        }
    };

    return searchForecast;
};

export default useSearchForecast;
