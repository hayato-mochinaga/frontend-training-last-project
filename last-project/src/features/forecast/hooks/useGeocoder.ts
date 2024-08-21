import axios from 'axios';

const useGeocoder = () => {
    const geocode = async (query: string | null) => {
        if (query === null) {
            console.error('Query string is null or undefined');
            return null;
        }

        if (query.trim() === '') {
            console.error('Query string is empty');
            return null;
        }

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
                const [longitude, latitude] = feature.Geometry.Coordinates.split(',');

                // 座標の解析に失敗した場合、nullを返す
                if (!longitude || !latitude) {
                    console.error('Invalid coordinates format');
                    return null;
                }

                return {
                    Name: feature.Name,
                    Latitude: latitude,
                    Longitude: longitude,
                    BoundingBox: feature.Geometry.BoundingBox
                };
            } else {
                console.error('No results found');
                return null;
            }
        } catch (error) {
            console.error('Error fetching geocode data', error);
            return null;
        }
    };

    return geocode;
};

export default useGeocoder;
