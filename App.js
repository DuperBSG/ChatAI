import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, } from 'react';
import ChatBox from './components/ChatBox';
import processMessage, { setAPIKey } from './OpenAICall'
import MessageBox from './components/MessageBox';


export default function App() {
  const [apiState, setApiState] = useState({
    isKeyEntered : false,
    apiKey : '',
    varifyButtonActive : true
  })
  const [message, setMessage] = useState("")
  const [chatState, setChatState] = useState({
    sendButtonActive: true,
    messageList: [
    {
      role: "system",
      content: "Explain all concepts like I am a professional."
    },
    {
      role: "assistant",
      content: "You are a helpful assistant designed to output JSON.",
    },
  ]})


  const sendButtonHandler = () => {

    const userUpdatedChat = {
      sendButtonActive: false,
      messageList: [
      ...chatState.messageList,
      {
        role: 'user',
        content: message
      },
    ]}

    setChatState(userUpdatedChat)

    processMessage(
      userUpdatedChat.messageList, 
    ).then((returnedResponse) => {

      const assistantUpdatedChat = {
        sendButtonActive: true,
        messageList: [
        ...chatState.messageList,
        {
          role: 'user',
          content: message
        },
        {
          role: 'assistant',
          content: returnedResponse
        },
      ]}

      setChatState(assistantUpdatedChat)
    })
  }

  const varifyButtonHandler = () => {
    setAPIKey(apiState.apiKey)

    setApiState(prev => {
      return {
        ...prev,
        varifyButtonActive : false
      }
    })

    processMessage([{
      role: 'user',
      content: 'hello'
    }]).then((response => {
        setApiState(prev => {
          return {
            ...prev,
            varifyButtonActive: true,
            isKeyEntered: response !== '' ? true : false
          }
        })
      
    }))
  }


  const renderMessages = chatState.messageList.map((item, index) => {
    return <MessageBox messageText={item.content} key={index} isUser={item.role === 'user'}/>
  })

   
  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
          {apiState.isKeyEntered ?
          <>
            <ScrollView style={styles.scrollViewContainer}>
              <View style={styles.scrollViewContentWrapper}>
                {renderMessages}
              </View>
            </ScrollView>

            <ChatBox 
              onPress={chatState.sendButtonActive && message !== "" ? sendButtonHandler : () => {}}
              isActive={chatState.sendButtonActive && message !== ""}
              onChangeText={(text) => setMessage(text)}
              placeHolder='Enter Your Message Here =>'
            />
            <StatusBar style="auto" /> 
          </>
          :
          <ChatBox 
            onPress={apiState.varifyButtonActive && apiState.apiKey !== "" ? 
              varifyButtonHandler : () => {}}
            isActive={apiState.varifyButtonActive && apiState.apiKey !== ""}
            onChangeText={text => setApiState(prev => {
              return {
              ...prev,
              apiKey: text
            }})}
            placeHolder='Please type in your OpenAI API key'
          />}
      </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#212029',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    width: '100%',
    height: '100%',
  },
  scrollViewContentWrapper: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});

