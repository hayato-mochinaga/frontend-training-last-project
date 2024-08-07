import { useState, useEffect } from 'react';
import axios from 'axios';

const usePortList = () => {
    const [portList, setPortList] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPortNames = async () => {
            try {
                const response = await axios.get(
                    'https://api.msil.go.jp/fishing-port-point/v2/MapServer/1/query',
                    {
                        headers: {
                            'Ocp-Apim-Subscription-Key': '0e83ad5d93214e04abf37c970c32b641',
                        },
                        params: {
                            f: 'json',
                            where: "所在地 LIKE '千葉県%'",
                            returnGeometry: true,
                        },
                    }
                );
                const ports = response.data.features.map((feature: any) => feature.attributes.漁港名);
                setPortList(ports);
            } catch (error) {
                console.error('Error fetching port data', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response data:', error.response?.data);
                }
                setError('漁港名の取得に失敗しました');
            }
        };

        fetchPortNames();
    }, []);

    return { portList, error };
};

export default usePortList;
