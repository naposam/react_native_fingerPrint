

import React from 'react';
import {View,Text, StyleSheet, DeviceEventEmitter, NativeModules, Image} from 'react-native';
export default class fingerPrint extends React.Component{
    constructor(props){
        super(props)

        this.state={
            status:<Image style={{width:100,height:100}}
            source={require('./images/fing.png')}/>,
            error:'Unlock Malaria test using your Touch ID'
        }
    }

    componentDidMount(){
     DeviceEventEmitter.addListener('FINGERPRINT_SCANNER_AUTHENTICATION',(mgs)=>{
        this.setState({error: mgs});
     });
     this.scan().then(success => success ? this.setState({ status: <Image style={{width:100,height:100}}
      source={require('./images/fingerSuccess.png')}/>}):console.log(success))
    }
    async scan(){
       return await NativeModules.ReactNativeFingerprintScanner.authenticate();
    }
    render(){
        return(
            <View>
            <View>
      <Text style={styles.txtUp}>Unlock Malaria Test App</Text>
      <Text style={styles.txtDown}>{this.state.error }</Text>
      </View>
           <View style={styles.container}>
           <View>{this.state.status}</View>
           </View>
           
      </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        marginTop:230
    },
    txtUp:{
      
        textAlign:'center',
        fontWeight:'bold',
        fontSize: 25,
        marginTop:10
    
      },
      txtDown:{
        textAlign:'center',
        fontSize: 15,
        marginTop:5
    
      },
      error:{
        color:'red',
        fontWeight: 'bold',
      }


})
