import cheerio from 'cheerio';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    Button,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FinanceContainer from './FinanceContainer';

const MyFinance = () => {
    const [enteredText, setEnteredText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('financeList', JSON.stringify(list));
        } catch (error) {
            console.error('Store Data Hatası:', error);
        }
    };

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
            storeData();
        } catch (error) {
            console.error('Fetch Hatası:', error);
            setIsLoading(false);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('financeList');
            return jsonValue != null
                ? console.log(JSON.parse(jsonValue))
                : null;
        } catch (e) {
            // error reading value
        }
    };

    const handleInputChange = (newText) => {
        setEnteredText(newText);
    };

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    value={enteredText}
                    style={styles.inputName}
                    onChangeText={handleInputChange}
                />
                <Button title="Getir" onPress={fetchStockData} />
                <Button title="çek" onPress={getData} />
            </View>
            {isLoading && <Text>Loading...</Text>}
            <ScrollView style={{ width: '100%' }}>
                {list.map((item, index) => (
                    <FinanceContainer
                        key={index + 'financeContainer'}
                        name={item.name}
                        small={item.small}
                        price={item.price}
                        lastPrice={item.lastPrice}
                        amount={20}
                    />
                ))}
            </ScrollView>
            <StatusBar style="auto" />
        </>
    );
};

export default MyFinance;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        height: '80%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputName: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: 200,
    },
});
