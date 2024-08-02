import { Pressable, StyleSheet, Text } from "react-native";


export default function Button(props) {

    return (
        <Pressable 
            style={{...styles.sendButton, backgroundColor: props.isActive ? '#393845' : '#29282e'}}
            onPress={props.onPress}>
            <Text style={{...styles.sendButtonPlaceholder, color: props.isActive ? 'grey' : '#1a1a1a'}}>
                send
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    sendButton: {
        // borderWidth: 1,
        borderColor: 'black',
        padding: 4,
        borderRadius: 15,
        paddingHorizontal: 10,
        backgroundColor: '#393845',
        marginLeft: 15
    },
    sendButtonPlaceholder: {
        color: 'grey',
    }
})
