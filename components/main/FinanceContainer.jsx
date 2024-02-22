import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useState, useEffect } from 'react';

const FinanceContainer = ({ name, price, small, amount, lastPrice }) => {
    const [rate, setRate] = useState(0);
    const [isIncrease, setIsIncrease] = useState(false);

    useEffect(() => {
        if (lastPrice > price) {
            const calculatedRate =
                (parseFloat(lastPrice) - parseFloat(price) * 100) /
                parseFloat(lastPrice);
            console.log('calculatedRate', calculatedRate);
            setRate(calculatedRate);
            setIsIncrease(false);
        } else {
            console.log('lastPrice', lastPrice, 'price', price);
            const calculatedRate = (
                ((parseFloat(price.replace(',', '.')) -
                    parseFloat(lastPrice.replace(',', '.'))) /
                    parseFloat(lastPrice.replace(',', '.')))  *
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
                <View style={styles.topOfContainer}>
                    <Text style={styles.small}>{small}</Text>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View style={styles.bottomOfContainer}>
                    <Text style={styles.amount}>{amount + ' Adet'}</Text>
                    <Text style={styles.amount}>{price}</Text>
                    <Icon
                        name={isIncrease ? 'arrowup' : 'arrowdown'}
                        size={20}
                        color={isIncrease ? 'green' : 'red'}
                    />
                    <Text
                        style={{
                            color: isIncrease ? 'green' : 'red',
                            fontSize: 16,
                        }}
                    >
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
        flexDirection: 'column',
        width: '100%',
        borderRadius: 30,
        backgroundColor: 'lightgray',
        padding: 10,
    },
    topOfContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginLeft: 30,
    },
    bottomOfContainer: {
        flexDirection: 'row',
    },
    small: {
        backgroundColor: 'black',
        padding: 8,
        color: 'white',
        borderRadius: 20,
        transform: [{ translateY: 12 }],
    },
    nameText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 25,
        width: '70%',
    },
    amount: {
        fontSize: 15,
        marginLeft: 20,
    },
});

export default FinanceContainer;
