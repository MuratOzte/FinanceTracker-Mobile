import cheerio from 'cheerio';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Button,
    ScrollView,
    Text,
    TextInput,
    StyleSheet,
    View
} from 'react-native';

const MyFinance = () => {
    const [enteredText, setEnteredText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);

    const url = `https://www.google.com/finance/quote/${enteredText}:IST?hl=tr`;

    const fetchStockData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);
            const name = $('.zzDege').text();
            const price = $('.YMlKec.fxKbKc').text();
            const small = $('.BRnNhc').text().split(' ')[1].split('Sayfa')[1];
            if (
                !list.some(
                    (item) =>
                        item.name === name &&
                        item.price === price &&
                        item.small === small
                )
            ) {
                setList([...list, { name, price, small }]);
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
                    style={styles.input}
                    onChangeText={handleInputChange}
                />
                <Button title="Getir" onPress={fetchStockData} />
            </View>
            {isLoading && <Text>Loading...</Text>}
            <ScrollView>
                {list.map((item, index) => (
                    <Text key={index}>
                        {item.name + ' ' + item.price + ' ' + item.small}
                    </Text>
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
        marginTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: 200,
    },
});
