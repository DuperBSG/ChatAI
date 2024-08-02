import { View, Text, StyleSheet } from 'react-native'


export default function MessageBox(props) {
    
    return (
        <View style={props.isUser ? styles.userMessageContainer : styles.openAIMessageContainer}>
            <Text style={styles.text}>{props.messageText}</Text>
        </View>
    )
}


const textBaseStyle = {
    marginBottom: 30,
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#393845',
    paddingVertical: 10,
    paddingHorizontal: 20,
    maxWidth: '40%'
}

const styles = StyleSheet.create({
    userMessageContainer: {
        ...textBaseStyle,
        backgroundColor: '#393845',
        left: 150
    },
    openAIMessageContainer: {
        ...textBaseStyle,
        backgroundColor: '#384545',
        left: -150
    },
    text: {
        color: 'white'
    }
})

