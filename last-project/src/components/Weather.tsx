import React, { useEffect, useState } from 'react'; // Reactとそのフック（useEffect, useState）をインポートします。
import axios from 'axios'; // HTTPリクエストを送るためのaxiosライブラリをインポートします。

const Weather: React.FC = () => { // Weatherという名前のReact関数コンポーネントを定義します。
    const [weather, setWeather] = useState<any>(null); // weatherという状態変数とその更新関数setWeatherを宣言し、初期値をnullに設定します。
    const [error, setError] = useState<string | null>(null); // errorという状態変数とその更新関数setErrorを宣言し、初期値をnullに設定します。

    useEffect(() => { // コンポーネントが初めてレンダリングされたときに実行される副作用フックを定義します。
        const fetchWeather = async () => { // 非同期関数fetchWeatherを定義します。
            try { // tryブロックを開始し、エラーハンドリングを行います。
                const response = await axios.get( // axiosを使ってYahooの天気APIにHTTP GETリクエストを送ります。
                    '/api/weather/V1/place', { // リクエストのエンドポイントを指定します。
                    params: { // リクエストに渡すパラメータを指定します。
                        appid: 'dj00aiZpPWNibUhRUmI4QU5mcSZzPWNvbnN1bWVyc2VjcmV0Jng9YWE-', // ここにあなたのYahoo APIアプリケーションIDを入力
                        coordinates: '139.732293,35.663613', // 緯度経度の座標を指定します。
                        output: 'json', // レスポンスをJSON形式で要求します。
                        },
                }
                );
                console.log(response.data); // APIからのレスポンスデータをコンソールに出力します。
                setWeather(response.data); // 取得した天気データをweather状態に保存します。
            } catch (error) { // エラーが発生した場合の処理を定義します。
                console.error('Error fetching weather data', error); // エラーメッセージをコンソールに出力します。
                if (axios.isAxiosError(error)) { // エラーがaxiosのエラーである場合の追加の処理を行います。
                    console.error('Response data:', error.response?.data); // エラーレスポンスデータをコンソールに出力します。
                }
                setError('天気データの取得に失敗しました'); // エラーメッセージをerror状態に保存します。
            }
        };

        fetchWeather(); // fetchWeather関数を実行して天気データを取得します。
    }, []); // useEffectの依存配列が空のため、この副作用はコンポーネントの初回レンダリング時にのみ実行されます。

    return ( // コンポーネントのJSXを返します。
        <div> {/* コンポーネントのルート要素を定義します。 */}
            <h1>六本木の天気</h1> {/* 見出しを表示します。 */}
            {error ? ( // エラーが発生した場合の処理を定義します。
                <p>{error}</p> // エラーメッセージを表示します。
            ) : weather ? ( // 天気データが取得された場合の処理を定義します。
                <div> {/* 天気データを表示するためのコンテナを定義します。 */}
                    <p>場所: {weather.Feature[0].Name}</p> {/* 天気情報の場所を表示します。 */}
                    <h2>天気リスト</h2> {/* サブ見出しを表示します。 */}
                    <ul>
                        {weather.Feature[0].Property.WeatherList.Weather.map((item: any, index: number) => (
                            <li key={index}>
                                <p>日時: {new Date(item.Date.slice(0, 4) + '-' + item.Date.slice(4, 6) + '-' + item.Date.slice(6, 8) + 'T' + item.Date.slice(8, 10) + ':' + item.Date.slice(10, 12)).toLocaleString('ja-JP')}</p> {/* 天気情報の日付を表示します。 */}
                                <p>天気の種類: {item.Type === 'observation' ? '観測' : '予報'}</p> {/* 天気の種類を表示します。 */}
                                <p>降雨量: {item.Rainfall} mm</p> {/* 降雨量を表示します。 */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : ( // データがロード中の場合の処理を定義します。
                <p>読み込み中...</p> // ローディングメッセージを表示します。
            )}
        </div>
    );
};

export default Weather; // Weatherコンポーネントをエクスポートします。
