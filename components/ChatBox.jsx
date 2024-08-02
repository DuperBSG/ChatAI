import { 
    StyleSheet, 
    View, 
    TextInput, 
} from 'react-native'
import SendButton from './SendButton'
import { useWindowDimensions } from 'react-native';



export default function ChatBox(props) {

    const styles = useStyles();

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.textInput} 
                placeholder={props.placeHolder}
                placeholderTextColor={"grey"}
                onChangeText={props.onChangeText}
            />
            <SendButton 
                isActive={props.isActive}
                onPress={props.onPress} 
            />
        </View>
    )
}

function useStyles() {
    const { screenWidth, screenHeight } = useWindowDimensions();
    return StyleSheet.create({
        container: {
            marginBottom: 30,
            flexDirection: "row",
            padding: 5,
            borderWidth: 1,
            borderColor: 'black',
            width: screenWidth,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#282833'
        },
        
        textInput: {
            // borderWidth: 1,
            borderColor: 'black',
            padding: 4,
            borderRadius: 15,
            paddingHorizontal: 15,
            color: 'white',
            placeholderTextColor: '#b1adcc',
            backgroundColor: '#393845',
            width: '80%',
        },
    }) 
}
