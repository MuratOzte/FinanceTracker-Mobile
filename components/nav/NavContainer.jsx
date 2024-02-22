import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icons from './Icons';
import HorizontalDivider from '../common/horizontalDivider';

const NavContainer = () => {
    return (
        <View style={styles.container}>
            <Icons title="finance" />
            <HorizontalDivider />
            <Icons title="home" />
            <HorizontalDivider />
            <Icons title="account" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        backgroundColor: 'lightblue',
    },
});

export default NavContainer;
