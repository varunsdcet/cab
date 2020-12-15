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
export default class MyPackage extends Component {
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
        alert(JSON.stringify(s))
        GLOBAL.package = s.package[0]
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



    handleClick= () =>{
        const url = 'http://139.59.76.223/cab/webservices/ride_cancel'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                booking_id: GLOBAL.histoty.id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               //  alert(JSON.stringify(responseJson))

                if (responseJson.status == true){
                    alert('Your booking Successfully Cancelled')

                }

            })
            .catch((error) => {
                console.error(error);
            });


        var s =   this.props.navigation.state.params



    }
    render() {

        return (
            <View  style = {{backgroundColor:Colors.background}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <KeyboardAwareScrollView style={{height:window.height}}>

                    <ImageBackground
                        source={{uri: GLOBAL.package.image}}
                        style={{width: '100%', height: 230}}
                    >

                        <View style = {{position:'absolute',top:0,width:'100%',height:230,backgroundColor:'rgba(0,0,0,0.6)'}}>


                        </View>
                        <View style = {{flexDirection:'row',marginTop:20}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>

                        </View>

                        <View style={{marginTop:80,marginLeft:20}}>

                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8,marginLeft:6,width:window.width-140}}>
                                {GLOBAL.package.title}

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:15,color:'white',marginTop:1,marginLeft:6,width:window.width-140}}>
                                {GLOBAL.package.package_count} places

                            </Text>


                        </View>

                        <View style={{justifyContent:'space-between',flexDirection:'row',height:50,marginLeft:26,marginTop:-14,width:'100%'}}>


                            <StarRatingBar
                                score={parseFloat(GLOBAL.package.rating)}
                                dontShowScore={true} // true: not show the score text view
                                allowsHalfStars={true}
                                accurateHalfStars={true}
                            />


                            <Text style = {{marginRight:50,fontFamily:GLOBAL.heavy,fontSize:22,fontWeight:'bold',color:'white',marginTop:10}}>
                                RS {GLOBAL.histoty.total_amount}

                            </Text>

                        </View>

                    </ImageBackground>


                    <View style={{marginLeft:20}}>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#8a8a8f',marginTop:12,marginLeft:16}}>
                            {GLOBAL.histoty.traval_date} , {GLOBAL.histoty.traval_time}

                        </Text>



                    </View>


                    <View style={{marginLeft:20}}>
                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'#242e42',marginTop:12,marginLeft:16}}>
                           Booking For

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#8a8a8f',marginTop:12,marginLeft:16}}>
                            Adult: {GLOBAL.histoty.adult_quantity}

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#8a8a8f',marginTop:8,marginLeft:16}}>
                            Child: {GLOBAL.histoty.child_quantity}

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#8a8a8f',marginTop:8,marginLeft:16}}>
                            Senior: {GLOBAL.histoty.senior_quantity}

                        </Text>

                    </View>





                    <View style={{width:'100%',backgroundColor:'#efefe4',height:1,marginTop:4}}>

                    </View>

                    <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'black',marginTop:20,marginLeft:20}}>
                        Place List {GLOBAL.package.package_count}

                    </Text>









                    <FlatList style = {{width:window.width}}
                              data={GLOBAL.package.places}
                              keyExtractor={this._keyExtractorss}
                              horizontal={false}
                              renderItem={this.renderRowItem1}
                              numColumns={1}
                    />


                    {GLOBAL.histoty.status == 1 && (
                        <View style={{flexDirection:'row'}}>


                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:width - 40,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Cancel"
                            />

                        </View>
                    )}

                    {GLOBAL.histoty.status == 3 && (
                        <View style={{flexDirection:'row'}}>


                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:width - 40,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Support"
                            />

                        </View>
                    )}


                    {GLOBAL.histoty.status == 2 && (
                        <View style={{flexDirection:'row'}}>
                            <Button buttonStyle={{backgroundColor:Colors.blue,borderRadius:8,width:150,marginTop:20,marginLeft:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Rate Us"
                            />

                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:150,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Support"
                            />

                        </View>
                    )}

                    {GLOBAL.histoty.status == 3 && (
                        <View style={{flexDirection:'row'}}>
                            <Button buttonStyle={{backgroundColor:Colors.blue,borderRadius:8,width:150,marginTop:20,marginLeft:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Rate Us"
                            />

                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:150,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Support"
                            />

                        </View>
                    )}

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
