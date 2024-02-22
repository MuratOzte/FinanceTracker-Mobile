import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import NavContainer from './components/nav/NavContainer';
import cheerio from 'cheerio';

export default function App() {
    const [enteredText, setEnteredText] = useState('');
    const [text, setText] = useState('');

    const fetchStockData = async () => {
        const url = `https://www.google.com/finance/quote/${enteredText}:IST?hl=tr`;

        try {
            setText('Yükleniyor...')
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);
            const name = $('.zzDege').text();
            const price = $('.YMlKec.fxKbKc').text();
            setText(price + ' ' + name);
        } catch (error) {
            console.error('Fetch Hatası:', error);
        }
    };

    const handleInputChange = (newText) => {
        setEnteredText(newText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={enteredText}
                    style={styles.input}
                    onChangeText={handleInputChange}
                />
                <Button title="Getir" onPress={fetchStockData} />
            </View>
            <Text>{text}</Text>
            <StatusBar style="auto" />
            <NavContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
