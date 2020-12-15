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
    SafeAreaView,
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
export default class CompletedRide extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
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
    handleClick =() =>{

        this.props.navigation.navigate('BookingOption',GLOBAL.package)
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
        // if (GLOBAL.searchLocation != "") {
        //     this.setState({lat: GLOBAL.searchLatiude})
        //     this.setState({long: GLOBAL.searchLongitude})
        //
        //     this.mapView.animateToRegion({
        //         latitude: GLOBAL.searchLatiude,
        //         longitude: GLOBAL.searchLongitude
        //     }, 1000)
        // }
    }

    renderRowItem1 = (itemData) => {
        return (

            <View>
                <Text style={{ color: '#8a8a8f', fontFamily:GLOBAL.heavy,fontSize: 12,marginTop:4,marginLeft:20 }}>. {itemData.item}</Text>
            </View>

        )
    }
    componentDidMount(){
        var s =   this.props.navigation.state.params
        GLOBAL.package = s
        alert(JSON.stringify(s))
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

        var s = parseInt(GLOBAL.histoty.total_amount)
        var w =  parseInt(GLOBAL.histoty.wallet_amount)
        var t =  parseInt(GLOBAL.histoty.tax_amount)

        return (
            <View  style = {{backgroundColor:Colors.background}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <KeyboardAwareScrollView style={{height:window.height}}>

                    <View

                        style={{width: '100%', height: 230,backgroundColor:Colors.blue}}
                    >


                        <View style = {{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() =>this.props.navigation.navigate('Issue')}>
                                <Image source={require('./suppo.png')}
                                       style  = {{width:20, height:20,marginRight:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>

                        </View>

                        <View style={{marginTop:-2,alignSelf:'center',width:'100%'}}>
                            <Image source={require('./thumbsup.png')}
                                   style  = {{width:140, height:100,alignSelf:'center',resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:22,color:'white',marginTop:4,marginLeft:6,alignSelf:'center'}}>
                               Hope you had a nice journey

                            </Text>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:14,color:'white',marginTop:4,marginLeft:6,alignSelf:'center'}}>
                               Booking ID # {GLOBAL.histoty.transaction_id}

                            </Text>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:14,color:'white',marginTop:4,marginLeft:6,alignSelf:'center'}}>
                                {GLOBAL.histoty.traval_date}  {GLOBAL.histoty.traval_time}

                            </Text>


                        </View>



                    </View>





                    <View style={{flexDirection:'row',marginTop:16}}>
                        <Image source={require('./ic_current.png')}
                               style  = {{width:10, height:10,marginLeft:12,marginTop:3,resizeMode:'contain'
                               }}

                        />

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10}}>
                            {GLOBAL.histoty.picup_address}

                        </Text>
                    </View>

                        <Image source={require('./Line.png')}
                               style  = {{width:2, height:18,marginLeft:15,marginTop:-4,resizeMode:'contain'
                               }}

                        />




                        <View style={{flexDirection:'row',marginTop:1}}>
                            <Image source={require('./Fill.png')}
                                   style  = {{width:20, height:20,marginLeft:8,marginTop:3,resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:4}}>
                                {GLOBAL.histoty.drop_address}

                            </Text>
                        </View>



                    <View style={{backgroundColor:'#efefef',height:1,width:'88%',marginTop:12,marginLeft:20}}>
                    </View>


                    <View style={{flexDirection:'row',marginTop:20}}>
                        <Image
                            style={{width: 100,height: 70,resizeMode:'contain' }}
                            source={{uri: GLOBAL.histoty.driver_image}}
                        />


                            <Text style={{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:16}}>

                                {GLOBAL.histoty.driver_name}
                            </Text>


                    </View>

                    <View style={{backgroundColor:'#efefef',height:1,width:'88%',marginTop:12,marginLeft:20}}>
                    </View>



                    <View style={{flexDirection:'row'}}>

                        <Image    source={{uri: GLOBAL.histoty.car_image}}
                                  style  = {{width:60, height:60,marginLeft:8,marginTop:0,resizeMode:'contain'
                                  }}

                        />

                        <View>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                                {GLOBAL.histoty.car_type}

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:10,color:'#bec2ce',marginTop:1,marginLeft:16}}>
                                {GLOBAL.histoty.feature}

                            </Text>




                        </View>
                    </View>
                    <View style={{backgroundColor:'#efefef',height:1,width:'88%',marginTop:12,marginLeft:20}}>
                    </View>


                    <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                       Payment Summary

                    </Text>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                           Base Fare

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>


                        </Text>
                    </View>


                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                            Wallet

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                            {GLOBAL.histoty.wallet_amount}

                        </Text>
                    </View>


                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                            GST/Taxes

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                            {GLOBAL.histoty.tax_amount}

                        </Text>
                    </View>

                    <View style={{backgroundColor:'#efefef',height:1,width:'88%',marginTop:12,marginLeft:20}}>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                            Total

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:Colors.blue,marginLeft:8,marginRight:10,marginTop:14}}>
                            {GLOBAL.histoty.total_amount}

                        </Text>
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
