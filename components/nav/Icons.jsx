import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Icons = ({ title, setSelectedPage }) => {
    const handleIconClick = (iconName) => {
        setSelectedPage(iconName);
    };

    return (
        <TouchableOpacity onPress={() => handleIconClick(title)}>
            <Icon name={title} style={styles.icons} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icons: {
        fontSize: 30,
        color: 'white',
        margin: 10,
        marginHorizontal: 50,
    },
});

export default Icons;
