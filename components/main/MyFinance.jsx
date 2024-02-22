import cheerio from 'cheerio';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    View,
} from 'react-native';
import FinanceContainer from './FinanceContainer';

const MyFinance = () => {
    const [enteredText, setEnteredText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    const url = `https://www.google.com/finance/quote/${enteredText}:IST?hl=tr`;

    const fetchStockData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url,{cache: "no-store"});
            const html = await response.text();
            const $ = cheerio.load(html);
            const title = $('title').text();
            const name = $('.zzDege').text();
            const price = $('.YMlKec.fxKbKc').text();
            const small = $('.BRnNhc').text().split(' ')[1].split('Sayfa')[1];
            const rate = $('span[jsname="Fe7oBc"]').attr('aria-label');
            console.log(rate);
            if (
                !list.some(
                    (item) =>
                        item.name === name &&
                        item.price === price &&
                        item.small === small &&
                        item.rate === rate
                )
            ) {
                setList([...list, { name, price, small, rate }]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Fetch Hatası:', error);
            setIsLoading(false);
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
            </View>
            {isLoading && <Text>Loading...</Text>}
            <ScrollView style={{ width: '100%' }}>
                {list.map((item, index) => (
                    <FinanceContainer
                        key={index + 'financeContainer'}
                        name={item.name}
                        small={item.small}
                        price={item.price}
                        rate={item.rate}
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
        height:'80%',
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
