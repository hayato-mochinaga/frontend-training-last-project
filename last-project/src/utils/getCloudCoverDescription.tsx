import FlareIcon from '@mui/icons-material/Flare';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import { getRainfallDescription } from './getRainfallDescription';

export const getCloudCoverDescription = (cloudCover: number, rain: number) => {
    const rainfallDescription = getRainfallDescription(rain);

    if (rain > 0) {
        return {
            description: rainfallDescription,
            icon: <UmbrellaIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} />
        };
    }
    if (cloudCover <= 10) {
        return {
            description: "快晴",
            icon: <FlareIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} />
        };
    }
    if (cloudCover <= 80) {
        return {
            description: "晴れ",
            icon: <WbSunnyIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} />
        };
    }
    return {
        description: "曇り",
        icon: <CloudIcon style={{ fill: '#ffffff', marginRight: '0.3rem' }} />
    };
};
