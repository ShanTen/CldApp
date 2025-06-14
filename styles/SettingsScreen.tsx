import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const getStyles = (colorScheme: 'light' | 'dark') => StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        color: colorScheme ? Colors[colorScheme].color : Colors.dark.color,
        textAlign: 'center',
        margin: 5,
    },
    separator: {
        marginVertical: 15,
        height: 1,
        width: '80%',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },
    input: {
        width: 320,
        height: 40,
        borderColor: colorScheme ? Colors[colorScheme].borderColor : Colors.dark.borderColor,
        color: colorScheme ? Colors[colorScheme].color : Colors.dark.color,
        borderWidth: 1,
        margin: 5,
        padding: 5,
        fontSize: 16,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        margin: 10,
    },
    buttonBackground: {
        backgroundColor: 'green',
    }
});

export default getStyles;