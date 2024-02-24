import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import cheerio from 'cheerio';
import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, TextInput } from 'react-native';

const FinanceContainer = ({ name, price, small, amount, lastPrice }) => {
    const [rate, setRate] = useState(0);
    const [isIncrease, setIsIncrease] = useState(false);
    const [enteredText, setEnteredText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    const url = `https://www.google.com/finance/quote/${enteredText}:IST?hl=tr`;

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
            if (
                !list.some(
                    (item) =>
                        item.name === name &&
                        item.price === price &&
                        item.small === small &&
                        item.lastPrice === lastPrice
                )
            ) {
                setList([...list, { name, price, small, lastPrice }]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Fetch Hatası:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (lastPrice > price) {
            const calculatedRate = (
                ((parseFloat(lastPrice.replace(',', '.')) -
                    parseFloat(price.replace(',', '.'))) /
                    parseFloat(lastPrice.replace(',', '.'))) *
                100
            ).toFixed(2);
            console.log('calculatedRate', calculatedRate);
            setRate(calculatedRate);
            setIsIncrease(false);
        } else {
            console.log('lastPrice', lastPrice, 'price', price);
            const calculatedRate = (
                ((parseFloat(price.replace(',', '.')) -
                    parseFloat(lastPrice.replace(',', '.'))) /
                    parseFloat(lastPrice.replace(',', '.'))) *
                100
            ).toFixed(2);

            console.log('calculatedRate', calculatedRate);
            setRate(calculatedRate + '%');
            setIsIncrease(true);
        }
    }, [lastPrice, price]);

    console.log(rate);

    return (
        name && (
            <View style={styles.container}>
                <Text style={styles.small}>{small}</Text>
                <Text style={styles.nameText}>
                    {name.length > 32 ? `${name.slice(0, 32)}...` : name}
                </Text>
                <Text style={styles.price}>{price + '₺'}</Text>
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
