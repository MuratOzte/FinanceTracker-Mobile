import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import NavContainer from './components/nav/NavContainer';
import MyFinance from './components/main/MyFinance';

export default function App() {
    const [selectedPage, setSelectedPage] = useState('Home');
    console.log(`Icon clicked: ${selectedPage}`);

    return (
        <View style={styles.container}>
            <MyFinance />
            <NavContainer setSelectedPage={setSelectedPage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
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
