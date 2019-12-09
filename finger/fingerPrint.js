import React from 'react'
import {View,Text, StyleSheet, DeviceEventEmitter, NativeModules, Image} from 'react-native';
export default class fingerPrint extends React.Component{
    constructor(props){
        super(props)

        this.state={
            status:<Image style={{width:100,height:100}}
            source={require('../images/fing.png')}/>,
            error:'Unlock Malaria test using your Touch ID'
        }
    }

    componentDidMount(){
     DeviceEventEmitter.addListener('FINGERPRINT_SCANNER_AUTHENTICATION',(mgs)=>{
        this.setState({error:mgs});
     });
     this.scan().then(success => success ? this.setState({ status: 'athentication success'}):console.log(success))
    }
    async scan(){
       return await NativeModules.ReactNativeFingerprintScanner.authenticate();
    }
    render(){
        return(
           <View style={styles.container}>
           <View>{this.state.status}</View>
           </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    }
})
