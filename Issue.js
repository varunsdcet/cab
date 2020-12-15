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
import moment from 'moment';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Airport from "./Airport";
import Splash from "./Splash";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const GLOBAL = require('./Global');
import MaterialTabs from 'react-native-material-tabs';
const { width, height } = Dimensions.get('window');
const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />
);

const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import {Button} from "react-native-elements";
import CalendarStrip from "react-native-calendar-strip";
import TimePicker from "react-native-simple-time-picker";
var aprice = 0;
var bprice = 0;
var cprice = 0;
type Props = {};
export default class Issue extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            data :[],
            selectedTab:0,
            text: 'http://facebook.github.io/react-native/',


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

    detail = (itemData) => {
        GLOBAL.histoty = itemData
        this.props.navigation.navigate('HistoryDetail',itemData)

    }

    renderRowItem1 = (itemData,index) => {
        return (
            <TouchableOpacity

                onPress={() => this.detail(GLOBAL.histoty)}>
                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:10,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#8a8a8f',marginTop:12,marginLeft:16}}>
                            {GLOBAL.histoty.traval_date} , {GLOBAL.histoty.traval_time}

                        </Text>
                        {GLOBAL.histoty.status == "1" && (
                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'#ff8800',marginTop:12,marginLeft:16,marginRight:10}}>
                                Pending

                            </Text>

                        )}

                        {GLOBAL.histoty.status == "2" && (
                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'#ff8800',marginTop:12,marginLeft:16,marginRight:10}}>
                                on Trip

                            </Text>

                        )}

                        {GLOBAL.histoty.status == "3" && (
                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'#ff8800',marginTop:12,marginLeft:16,marginRight:10}}>
                                Completed

                            </Text>

                        )}
                        {GLOBAL.histoty.status == "4" && (
                            <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'#ff8800',marginTop:12,marginLeft:16,marginRight:10}}>
                                Cancelled

                            </Text>

                        )}



                    </View>


                    <View style={{backgroundColor:'#8a8a8f',height:1,width:'100%',marginTop:6}}>
                    </View>


                    <View style = {{marginTop:6}}>
                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'black',marginTop:2,marginLeft:16,marginRight:10}}>
                            Booking Id # {GLOBAL.histoty.transaction_id}

                        </Text>

                    </View>


                    <View style={{flexDirection:'row',marginTop:4}}>
                        <Image source={require('./ic_current.png')}
                               style  = {{width:10, height:10,marginLeft:12,marginTop:3,resizeMode:'contain'
                               }}

                        />

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'black',marginLeft:8,marginRight:10}}>
                            {GLOBAL.histoty.picup_address}

                        </Text>
                    </View>
                    {this.state.selectedTab != 2 && (
                        <Image source={require('./Line.png')}
                               style  = {{width:2, height:18,marginLeft:15,marginTop:-4,resizeMode:'contain'
                               }}

                        />

                    ) }

                    {this.state.selectedTab != 2 && (
                        <View style={{flexDirection:'row',marginTop:1}}>
                            <Image source={require('./Fill.png')}
                                   style  = {{width:20, height:20,marginLeft:8,marginTop:3,resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'black',marginLeft:8,marginRight:10,marginTop:4}}>
                                {GLOBAL.histoty.drop_address}

                            </Text>
                        </View>
                    )}

                    <View style={{backgroundColor:'#8a8a8f',height:1,width:'100%',marginTop:6}}>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row'}}>

                            <Image    source={{uri: GLOBAL.histoty.car_image}}
                                      style  = {{width:60, height:60,marginLeft:8,marginTop:0,resizeMode:'contain'
                                      }}

                            />

                            <View>
                                <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'black',marginLeft:8,marginRight:10,marginTop:14}}>
                                    {GLOBAL.histoty.car_type}

                                </Text>

                                <Text style = {{fontFamily:GLOBAL.roman,fontSize:10,color:'#8a8a8f',marginTop:1,marginLeft:16}}>
                                    {GLOBAL.histoty.feature}

                                </Text>


                            </View>
                        </View>



                        <View>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'black',marginLeft:8,marginRight:10,marginTop:14}}>
                                Total Price

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:10,color:'#8a8a8f',marginTop:1,marginLeft:16}}>
                                Rs {GLOBAL.histoty.total_amount}

                            </Text>


                        </View>


                    </View>

                </View>
            </TouchableOpacity>

        )
    }









    detaisl= (index) =>{
        GLOBAL.report = index
        this.props.navigation.navigate('Report')
    }

    _handleStateChange = (state) =>{
        this.apicall(1)

    }

    setSelectedTab = (index) =>{
        alert(index)
        this.setState({selectedTab:index})
        if (index == 2){
            this.apicall(index + 2)
        }else {
            this.apicall(index + 1)
        }

    }


    apicall= (index) => {


        const url = 'http://139.59.76.223/cab/webservices/booking_history'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                user_id: '29',
                booking_for: index


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true) {
                    this.setState({data: responseJson.data})

                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount(){






        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }



    handleCheckBox = () => this.setState({ checked: !this.state.checked })
    render() {
        var fp = this.state.finalPrice + parseInt(GLOBAL.package.price)
        var did = fp - parseInt(this.state.discount)


        return (
            <View style={{backgroundColor:Colors.background}}>

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <View style={{width:window.width,height:70,backgroundColor:Colors.blue}}>

                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                        <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8,marginLeft:6,width:window.width-70}}>
                            Choose an Issue

                        </Text>

                    </View>

                </View>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:10,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#bec2ce',marginTop:12,marginLeft:16}}>
                            {GLOBAL.histoty.traval_date} , {GLOBAL.histoty.traval_time}

                        </Text>



                    </View>


                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>


                    <View style = {{marginTop:6}}>
                        <Text style = {{fontFamily:GLOBAL.medium,fontSize:16,color:'#242e42',marginTop:2,marginLeft:16,marginRight:10}}>
                            Booking Id # {GLOBAL.histoty.transaction_id}

                        </Text>

                    </View>


                    <View style={{flexDirection:'row',marginTop:4}}>
                        <Image source={require('./ic_current.png')}
                               style  = {{width:10, height:10,marginLeft:12,marginTop:3,resizeMode:'contain'
                               }}

                        />

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10}}>
                            {GLOBAL.histoty.picup_address}

                        </Text>
                    </View>
                    {this.state.selectedTab != 2 && (
                        <Image source={require('./Line.png')}
                               style  = {{width:2, height:18,marginLeft:15,marginTop:-4,resizeMode:'contain'
                               }}

                        />

                    ) }

                    {this.state.selectedTab != 2 && (
                        <View style={{flexDirection:'row',marginTop:1}}>
                            <Image source={require('./Fill.png')}
                                   style  = {{width:20, height:20,marginLeft:8,marginTop:3,resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:4}}>
                                {GLOBAL.histoty.drop_address}

                            </Text>
                        </View>
                    )}

                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>

                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style = {{flexDirection:'row'}}>

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



                        <View>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:14}}>
                                Total Price

                            </Text>

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:10,color:'#bec2ce',marginTop:1,marginLeft:16}}>
                                Rs {GLOBAL.histoty.total_amount}

                            </Text>


                        </View>


                    </View>

                </View>

                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:10,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5,height:300 }}>

                    <TouchableOpacity

                        onPress={() => this.detaisl('1')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',height:45,width:'100%'}}>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:20,color:'#353535',marginTop:22,marginLeft:12}}>
                        Billing Payment Related
                        </Text>

                        <Image source={require('./arrow.png')}
                               style  = {{width:20, height:20,marginRight:12,marginTop:20,resizeMode:'contain'
                               }}

                        />
                    </View>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>

                    <TouchableOpacity

                        onPress={() => this.detaisl('2')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',height:45,width:'100%'}}>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:20,color:'#353535',marginTop:22,marginLeft:12}}>
                            Driver Related
                        </Text>

                        <Image source={require('./arrow.png')}
                               style  = {{width:20, height:20,marginRight:12,marginTop:20,resizeMode:'contain'
                               }}

                        />
                    </View>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>

                    <TouchableOpacity

                        onPress={() => this.detaisl('3')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',height:45,width:'100%'}}>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:20,color:'#353535',marginTop:22,marginLeft:12}}>
                            Cab Related
                        </Text>

                        <Image source={require('./arrow.png')}
                               style  = {{width:20, height:20,marginRight:12,marginTop:20,resizeMode:'contain'
                               }}

                        />
                    </View>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>

                    <TouchableOpacity

                        onPress={() => this.detaisl('4')}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',height:45,width:'100%'}}>
                        <Text style={{fontFamily:GLOBAL.roman,fontSize:20,color:'#353535',marginTop:22,marginLeft:12}}>
                           Safety Related
                        </Text>

                        <Image source={require('./arrow.png')}
                               style  = {{width:20, height:20,marginRight:12,marginTop:20,resizeMode:'contain'
                               }}

                        />
                    </View>
                    </TouchableOpacity>

                    <View style={{backgroundColor:'#efefef',height:1,width:'100%',marginTop:6}}>
                    </View>


                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Colors.background,
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
