import cheerio from 'cheerio';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const FinanceContainer = ({ small }) => {
    const [rate, setRate] = useState(0);
    const [isIncrease, setIsIncrease] = useState(false);
    const [enteredText, setEnteredText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const url = `https://www.google.com/finance/quote/${small}:IST?hl=tr`;

    const fetchStockData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url, { cache: 'no-store' });
            const html = await response.text();
            const $ = cheerio.load(html);
            const name = $('.zzDege').text();
            const price = $('.YMlKec.fxKbKc').text().replace('₺', '');
            const small = $('.BRnNhc').text().split(' ')[1].split('Sayfa')[1];
            const lastPrice = $('.P6K39c').text().split('₺')[1];
            setData([...data, { name, price, small, lastPrice }]);
            setIsLoading(false);
        } catch (error) {
            console.error('Fetch Hat:', error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchStockData();
    }, []);

    useEffect(() => {
        if (data[0] !== undefined) {
            const info = data[0];
            if (info.lastPrice > info.price) {
                const calculatedRate = (
                    ((parseFloat(info.lastPrice.replace(',', '.')) -
                        parseFloat(info.price.replace(',', '.'))) /
                        parseFloat(info.lastPrice.replace(',', '.'))) *
                    100
                ).toFixed(2);
                setRate(calculatedRate);
                setIsIncrease(false);
            } else {
                const calculatedRate = (
                    ((parseFloat(info.price.replace(',', '.')) -
                        parseFloat(info.lastPrice.replace(',', '.'))) /
                        parseFloat(info.lastPrice.replace(',', '.'))) *
                    100
                ).toFixed(2);

                setRate(calculatedRate + '%');
                setIsIncrease(true);
            }
        }
    }, [data]);

    useEffect(() => {
        if (data[0] !== undefined) {
            const info = data[0];
            if (info.lastPrice > info.price) {
                const calculatedRate = (
                    ((parseFloat(info.lastPrice.replace(',', '.')) -
                        parseFloat(info.price.replace(',', '.'))) /
                        parseFloat(info.lastPrice.replace(',', '.'))) *
                    100
                ).toFixed(2);
                setRate(calculatedRate + '%');
                setIsIncrease(false);
            } else {
                const calculatedRate = (
                    ((parseFloat(info.price.replace(',', '.')) -
                        parseFloat(info.lastPrice.replace(',', '.'))) /
                        parseFloat(info.lastPrice.replace(',', '.'))) *
                    100
                ).toFixed(2);

                setRate(calculatedRate + '%');
                setIsIncrease(true);
            }
        }
    }, [data]);

    return (
        data[0] && (
            <View style={styles.container}>
                <Text style={styles.small}>{data[0].small}</Text>
                <Text style={styles.nameText}>
                    {data[0].name.length > 32
                        ? `${data[0].name.slice(0, 32)}...`
                        : data[0].name}
                </Text>
                <Text style={styles.price}>{data[0].price + '₺'}</Text>
                <View style={styles.bottomOfContainer}>
                    <Icon
                        name={isIncrease ? 'arrowup' : 'arrowdown'}
                        size={20}
                        color={isIncrease ? 'green' : 'red'}
                    />
                    <Text style={{ color: isIncrease ? 'green' : 'red' }}>
                        {rate}
                    </Text>
                </View>
            </View>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        flexDirection: 'column',
        width: '100%',
        borderRadius: 30,
        backgroundColor: 'lightgray',
        padding: 10,
    },
    topOfContainer: {
        position: 'absolute',
    },
    bottomOfContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '20%',
        left: '40%',
    },
    small: {
        backgroundColor: 'black',
        padding: 8,
        color: 'white',
        borderRadius: 20,
        position: 'absolute',
        left: '4%',
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        width: '70%',
        position: 'absolute',
        left: '15%',
        top: '20%',
    },
    amount: {
        fontSize: 15,
        marginLeft: 20,
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        position: 'absolute',
        left: '22%',
        bottom: '20%',
    },
});

export default FinanceContainer;
