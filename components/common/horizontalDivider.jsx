import { View  , StyleSheet} from 'react-native';

const HorizontalDivider = () => {
    return (
        <View
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: 2,
        height: '100%',
        backgroundColor: 'white',
    }
});

export default HorizontalDivider;
