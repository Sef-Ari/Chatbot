import { View, Text, StyleSheet,FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; // Fix the import
import axios from 'axios';
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
  });
const Chatbot = () => {
    const [data, setData] = useState([]); // Fix the state declaration
    const apiKey = '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'; // Fix apiKey variable
    const apiUrl = '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';
    // const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const [textInput, setTextInput] = useState('');

    
    const handleSend = async () => {
        const prompt = textInput;
        // You should replace 'S{apiKey}' with `apiKey` in the Authorization header
        const response = await axios.post(apiUrl, {
            prompt: prompt,
            max_tokens: 1024,
            temperature: 0.5,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            }
        }).then(()=>{
            console.log("response",response)
        }).catch((err)=>{
            console.log("err",err)
        });
       
        // const text = response?.data.choices[0].text;
        // setData([...data, { type: 'user', text: textInput }, { type: 'bot', text: text }]);
        // setTextInput('');
    }
    const handleSend2 = async () => {
        const chatCompletion = await openai.completions.create({
            prompt:textInput,
            model: 'gpt-3.5-turbo-instruct',
          });

          const text=chatCompletion.choices[0].message
          console.log(text,chatCompletion)
          
    }
    return (
        <View style={styles.containter}>
            <Text style={styles.title}> Saif-Ari Chatbot</Text>
            {/* Configure FlatList */}
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({ item }) => (
                    <View style={{flexDirection:'row', padding:10}}>
                        <Text style={{fontWeight:'bold', color:item.type === 'user' ? 'green' : 'red'}}>{item.type === 'user' ? 'Ari' : 'Bot' }</Text>
                        <Text style={styles.bot}>{item.text}</Text>
                    </View>
                )}
            />
            <TextInput
                  style={styles.input}
                  value={textInput}
                  onChangeText = {text => setTextInput(text) }
                  placeholder='Ask me anything'
             />    
             <TouchableOpacity 
                style={styles.button}
                onPress={handleSend2}
             >
                <Text style={styles.buttonText}>Search</Text>
             </TouchableOpacity>
        </View>
    )
}
export default Chatbot;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffcc9',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        color: '#fffff0',
        fontWeight: 'bold', // Fix the typo in 'fontWeight'
        marginBottom: 20, // Fix the typo in 'marginBottom'
        marginTop: 70, // Fix the typo in 'marginTop'
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
    },
    body: {
        backgroundColor: '#fffcc9',
        width: '102%',
        margin:10

    },
    bot:{
        fontSize:16
    },
    input:{
        borderWidth:1,
        borderColor:'#f0f8ff',
        width:'90%',
        height:60,
        marginTop:500,
        marginBottom:10,
        borderRadius:10,
        marginLeft:20,
        

    },
    button:{
        backgroundColor:'#dc143c',
        width:'90%',
        height:60,
        borderRadius:10,
        justifyContent: 'center',
        alignItems:'center',
        marginBottom:10,
        marginLeft:20,
    },
    buttonText:{
        fontSize:25,
        fontWeight: 'bold',
        color: '#fffff0'
    }
});
