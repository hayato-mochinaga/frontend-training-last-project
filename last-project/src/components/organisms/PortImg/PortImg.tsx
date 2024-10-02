import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

interface PortImgProps {
    locationData: {
        Latitude: string;
        Longitude: string;
    } | null;
}

const PortImg: React.FC<PortImgProps> = ({ locationData }) => {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log('PortImgコンポーネントにlocationDataが渡されました');
        if (locationData) {
            axios
                .get('/api/port-images', {
                    params: {
                        latitude: locationData.Latitude,
                        longitude: locationData.Longitude,
                    },
                })
                .then((response) => {
                    setImages(response.data); // MSWからの画像URLをセット
                    setLoading(false);
                })
                .catch(() => {
                    setError('画像の取得に失敗しました');
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [locationData]);

    if (loading) {
        return <Message>データを読み込み中...</Message>;
    }

    if (error) {
        return <Message>{error}</Message>;
    }

    return (
        <>
            <Title>漁港周辺の航空写真</Title>
            {images.length === 0 ? (
                <>
                </>
            ) : (
                <>
                    <CarouselContainer>
                        <Carousel
                            showThumbs={false}
                            infiniteLoop
                            useKeyboardArrows
                            autoPlay
                            dynamicHeight={false}
                            showStatus={false}
                        >
                            {images.map((url, index) => (
                                <div key={index}>
                                    <StyledImage src={url} alt={`画像${index + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                    </CarouselContainer>
                </>
            )}
        </>
    );
};

const Message = styled.p`
    color: white;
`;

const CarouselContainer = styled.div`
    width: 100%;
    max-width: 600px; /* 最大幅を600pxに設定 */
    margin: 0 auto; /* 中央揃え */
    border-radius: 5px;
    overflow: hidden;
`;

const StyledImage = styled.img`
    width: 100%;
    height: auto;
    max-height: 400px; /* 最大高さを400pxに設定 */
    object-fit: cover; /* 画像がコンテナに収まるように調整 */
`;

const Title = styled.h1`
  font-family: 'Shippori Antique', serif;
  font-weight: 300;
  color: white;
`;

export default PortImg;
