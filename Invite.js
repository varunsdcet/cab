import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ImageBackground,
    StatusBar,
    Share,
    SafeAreaView,
    TextInput,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
const { width, height } = Dimensions.get('window');
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Airport from "./Airport";
import Splash from "./Splash";
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');
import MapView  from 'react-native-maps';
import MaterialTabs from 'react-native-material-tabs';

var _mapView: MapView;
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {Button} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
type Props = {};
export default class Invite extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            Code:GLOBAL.code,
            lat:'',
            long:'',
            selectedTab:0,

        }



    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null,
            animations: {
                setRoot: {
                    waitForRender: false
                }
            }
        }
    }

    handleClick= ( ) => {

    }

    _renderScene = ({ route }) => {

        switch (route.key) {

            case 'first':
                return <Airport/>
            case 'second':
                return <View/>
            case 'third':
                return <View/>
            default:
                return null;
        }
    };

    handleClick=()=>{

        var a = this.state.code

        Share.share({
                message:a ,url:''
            },{
                tintColor:'green',
                dialogTitle:'Share this Referalcode via....'
            }
        )
    }

    getlog =  (position) =>{
        var s  = position.coords.latitude
        var e  = position.coords.longitude

        GLOBAL.lat = s.toString()
        GLOBAL.long = e.toString()

        const url =  GLOBAL.BASE_URL  + 'lat_long_address'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify({
                "latitude": GLOBAL.lat,
                "longitude":GLOBAL.long,





            }),
        }).then((response) => response.json())
            .then((responseJson) => {

               //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({location:responseJson.address})


                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);

            });

    }

    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.searchLocation})
    }

    renderRowItem1 = (itemData) => {
        return (

            <View>
                <Text style={{ color: '#8a8a8f', fontFamily:GLOBAL.heavy,fontSize: 12,marginTop:4,marginLeft:20 }}>. Basically Bom Jesus</Text>
            </View>

        )
    }
    componentDidMount(){
        this.setState({lat:GLOBAL.lat})
        this.setState({long:GLOBAL.long})

        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    setSelectedTab = (index) =>{
        this.setState({selectedTab:index})

    }

    renderTabBar(props) {

        return (<TabBar
                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'white', borderBottomWidth: 2.5, height:50}}
                labelStyle={{color: 'grey', fontSize: 10, fontFamily: GLOBAL.roman}}

                {...props}
                indicatorStyle={{backgroundColor: Colors.blue, height: 2.5}}
            />
        );
    }

    render() {

        return (
            <View  style = {{backgroundColor:Colors.background}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <KeyboardAwareScrollView style={{height:window.height}}>

                    <ImageBackground
                        source={require('./topheader.png')}
                        style={{width: '100%', height: 500}}
                    >
                        <View style = {{flexDirection:'row',marginTop:20}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>


                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:20,color:'white',marginLeft:width/2 - 90,marginTop:8,textAlign:'center'}}>
                               Invite Friends

                            </Text>

                        </View>


                        <Image source={require('./giftlogo.png')}
                               style={{alignSelf:'center', height:'65%',width:'65%',resizeMode:'contain'}}/>

                        <Text style={{fontSize:30,fontFamily:GLOBAL.medium,color:'white',alignSelf:'center',marginTop:'-3%'}}>Invite Friends</Text>
                        <Text style={{fontSize:30,fontFamily:GLOBAL.medium,color:'white',alignSelf:'center',marginTop:2}}>Get 3 Coupons each!</Text>
                        <Text style={{fontSize:17,fontFamily:GLOBAL.roman,color:'white',alignSelf:'center',marginTop:10}}>When your friend Sign up with your</Text>
                        <Text style={{fontSize:17,fontFamily:GLOBAL.roman,color:'white',alignSelf:'center'}}>refferal code. you'll both get 3 coupons</Text>

                    </ImageBackground>


                    <View style={{height:300,flexDirection:'column',backgroundColor:'#e3e3e3'}}>

                        <Text style={{fontSize:20,fontFamily:GLOBAL.medium,color:'#000000',marginTop:'10%',marginLeft:'6%'}}>Share your refferal code</Text>

                        <TextInput
                            style={{fontSize:28,fontFamily:GLOBAL.medium,marginLeft:'6%',color:'#000000',width:'80%',height:54,borderBottomWidth:1,marginTop:'5%',borderBottomColor:'#0000004D'}}
                            placeholder= "Code"
                            placeholderTextColor="#000000"
                            editable={false}
                            onChangeText={(Code) => this.setState({Code})}
                            value={this.state.Code}
                        />


                        <Button buttonStyle={{backgroundColor:Colors.blue,width:200,borderRadius:20,alignSelf:'center',marginTop:40}}
                                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                                onPress={this.handleClick}
                                title="Invite Friends"
                        />

                    </View>


                </KeyboardAwareScrollView>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: "#000000",
        margin: 5,
        padding: 5,
        width: "70%",
        backgroundColor: "#DDDDDD",
        borderRadius: 5,
    },
    textField: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        margin: 5,
        padding: 5,
        width: "70%"
    },
    spacer: {
        height: 10,
    },
    scene: {
        flex: 1,
    },

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
