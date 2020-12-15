import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ImageBackground,
    StatusBar,
    Text,
    SafeAreaView,
    FlatList
} from 'react-native';
const window = Dimensions.get('window');
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Airport from "./Airport";
import Splash from "./Splash";
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import Package from "./Package";
import CarRental from "./CarRental";
import Outstation from "./Outstation";
import Flight from "./Flight";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
type Props = {};
export default class Home extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            weather:'',
            weathers:'',
            text: '',
            temp:'',
            data:[],
            isShown:false,
            direction:[],
            stateArr:[],
            state:'',
            routes: [
                { key: 'first', title: 'Airport & Local' },
                { key: 'second', title: 'Packages' },
                { key: 'third', title: 'Outstation' },
                { key: 'four', title: 'Car Rental' },
                { key: 'five', title: 'Flight' },
            ],

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
                return    <Airport navigation={this.props.navigation}/>
            case 'second':
                return <Package navigation={this.props.navigation}/>
            case 'third':
                return <Outstation navigation={this.props.navigation}/>
            case 'four':
                return <CarRental navigation={this.props.navigation}/>
                case 'five':
                    return <Flight navigation={this.props.navigation}/>
            default:
                return null;
        }
    };

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




                if (responseJson.status == true) {



                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);

            });

    }

    _handleStateChange = (state) =>{


        const url = 'http://139.59.76.223/cab/webservices/gethomepage'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                phone: this.state.username,
                password: this.state.password,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {




                if (responseJson.status == true){
                    var states = responseJson.states
                    var stateArray = [];
                    for (var i = 0;i < states.length;i++){
                        stateArray.push(states[i].state_name)
                    }
                    this.setState({location:stateArray[0]})

                    GLOBAL.local = stateArray[0]

                    GLOBAL.stateid = states[0].state_id
                    this.setState({weather:responseJson.weather.goa})
                    this.setState({weathers:responseJson.weather})
                    this.setState({data:stateArray})

                    this.setState({stateArr:states})
                    this.setState({direction:responseJson.direction_type})
                }

            })
            .catch((error) => {
                console.error(error);
            });


        Geolocation.getCurrentPosition(
            (position) => {
               // this.getlog(position)

                // alert(JSON.stringify(position))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    componentDidMount(){

        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    drop = (itemData) => {
        if  (itemData.state_name == "Goa" ){
            this.setState({weather:this.state.weathers.goa})
            GLOBAL.local = 'Goa'
        }else{
            this.setState({weather:this.state.weathers.jaisalmer})
            GLOBAL.local = 'Jaislmer'
        }
        this.setState({location:itemData.state_name})
        this.setState({isShown:false})
    }
    renderRowItem1 = (itemData) => {
        return (

            <TouchableOpacity

                onPress={() => this.drop(itemData.item)}>

               <View>

                   <Text style={{width:200,marginLeft:10,fontFamily:GLOBAL.roman,color:'black',height:40,marginTop:20}}>
                       {itemData.item.state_name}

                   </Text>


                   <View style = {{width:200,height:1,backgroundColor:'#efefe4'}}>

                   </View>




                </View>
            </TouchableOpacity>

        )
    }
    _renderLabel = ({ position, navigationState }) => ({ route, index }) => {
        const inputRange = navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(
            inputIndex => (inputIndex === index ? '#000' : '#c9ced6')
        );
        const color = position.interpolate({
            inputRange,
            outputRange,
        });
        return (
            <Animated.Text style={[styles.label, { color }]}>
                {route.title}
            </Animated.Text>
        );
    };
    renderTabBar(props) {

        return (<TabBar

                style={{backgroundColor: '#FFFFFF', elevation: 0, borderColor: 'white', borderBottomWidth: 2.5, height:50,activeColor:Colors.blue}}
                labelStyle={{ fontSize: 10, fontFamily: GLOBAL.roman,}}
                activeColor={Colors.blue}
                inactiveColor={'grey'}
                inactiveOpacity={0.5}
                activeOpacity={1.0}
                activeLabelStyle = {{color:Colors.blue,fontWeight:'bold'}}
                inactiveLabelStyle = {{color:'grey'}}
                {...props}
                indicatorStyle={{backgroundColor: Colors.blue, height: 2.5}}
            />
        );
    }

    render() {

        return (
            <>

                <StatusBar barStyle="light-content" />

                <ImageBackground
                    source={require('./topheader.png')}
                    style={{width: '100%', height: 75}}
                >

                    <View style = {{flexDirection:'row',width:'100%',marginTop: 18,marginBottom: 10, }}>

                        <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
                            <Image source={require('./menu.png')}
                                   style  = {{width:24, height:24,marginLeft:20,marginTop:18,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>
                        <Image
                            source={require('./home_logo.png')}
                            style={{width: 30, height: 30,resizeMode:'contain',marginTop:14,marginLeft:13}}
                        />

                        <TouchableOpacity style ={{width:130}}

                                          onPress={() => this.setState({isShown:!this.state.isShown})}>
                        <View style={{marginLeft:20,flexDirection:'row',width:200}}>


                                <Text style={{fontFamily:GLOBAL.heavy,fontSize:17,color:'#09304B',marginTop:22}}>
                                    {this.state.location}
                                </Text>
                                <Image source={require('./downarrow.png')}
                                       style  = {{width:12, marginTop:22,height:12,marginLeft:20,resizeMode:'contain'
                                       }}

                                />


                        </View>
                        </TouchableOpacity>


                        <View style = {{flexDirection:'row',width:100,marginLeft:10,marginTop:14}}>
                            <Image
                                source={require('./sun.png')}
                                style={{width: 25, height: 25,resizeMode:'contain'}}
                            />
                            <Text style={{color:'#09304B',fontFamily:GLOBAL.heavy,fontSize:20,marginTop:4,marginLeft:10}}>
                                {this.state.weather}°C
                            </Text>

                        </View>




                    </View>




                </ImageBackground>




                <TabView
                navigationState={this.state}
                indicatorStyle={{ backgroundColor:'white'}}
                style={{ backgroundColor: 'white' }}

                renderTabBar={this.renderTabBar}
                renderScene={this._renderScene}

                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />


                {this.state.isShown == true && (

                    <View style={{marginLeft:30,height:100,width:200,position:'absolute',top:60,backgroundColor:'white',borderRadius:4}}>
                        <FlatList
                                  data={this.state.stateArr}
                                  keyExtractor={this._keyExtractorss}
                                  horizontal={false}
                                  renderItem={this.renderRowItem1}

                        />

                    </View>




                )}
            </>
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
