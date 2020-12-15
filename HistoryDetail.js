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
import MapViewDirections from 'react-native-maps-directions';
import Splash from "./Splash";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { Marker } from 'react-native-maps';
import QRCode from 'react-native-qrcode';



import MapView  from 'react-native-maps';
var _mapView: MapView;
import Geolocation from 'react-native-geolocation-service';
const GLOBAL = require('./Global');

const GOOGLE_MAPS_APIKEY = 'AIzaSyA6wDJM-prsJa00_NMLcHiLEPsdhPTwB5w';
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
import Dialog, {DialogContent} from "react-native-popup-dialog";
var aprice = 0;
var bprice = 0;
var cprice = 0;
type Props = {};
export default class HistoryDetail extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            data :["1","2","3"],
            pickuplat:'',
            pickuplong:'',
            cancel:[],
            droplat:'',
            droplong:'',
            text:'hello',
            visible:false,
            myvisible:false,


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


    packageDetail = (itemData) => {
        this.setState({myvisible:false})

        const url = 'http://139.59.76.223/cab/webservices/ride_cancel'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                booking_id: GLOBAL.histoty.id,
                cancel_reason_id:itemData.id


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               //  alert(JSON.stringify(responseJson))

                if (responseJson.status == true){
                   alert('Your booking Successfully Cancelled')
                    this.props.navigation.goBack()

                }

            })
            .catch((error) => {
                console.error(error);
            });

    }
    renderRowItem1 = (itemData,index) => {
        return (

            <TouchableOpacity

                onPress={() => this.packageDetail(itemData.item)}>

           <View style = {{height:40}}>

               <Text style = {{marginTop:8,color:'black',fontFamily:GLOBAL.roman}}>
                   {itemData.item.reason_text}


               </Text>

               <View style={{width:'100%',backgroundColor:'#efefe4',height:1,marginTop:4}}>

               </View>



           </View>
            </TouchableOpacity>



        )
    }




    issue= () =>{
        this.props.navigation.navigate('Issue')
    }


    reason= () =>{
        const url = 'http://139.59.76.223/cab/webservices/cancellation_reason'

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
                    this.setState({cancel:responseJson.data})
                  //  alert('Your booking Successfully Cancelled')

                }

            })
            .catch((error) => {
                console.error(error);
            });


    }

    handleClick= () =>{

        this.setState({myvisible:true})

        // const url = 'http://139.59.76.223/cab/webservices/ride_cancel'
        //
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
        //         'Content-Type': 'application/json',
        //
        //     },
        //     body: JSON.stringify({
        //         booking_id: GLOBAL.histoty.id,
        //
        //
        //     }),
        // }).then((response) => response.json())
        //     .then((responseJson) => {
        //        //  alert(JSON.stringify(responseJson))
        //
        //         if (responseJson.status == true){
        //            alert('Your booking Successfully Cancelled')
        //             this.props.navigation.goBack()
        //
        //         }
        //
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });


       // var s =   this.props.navigation.state.params



    }




    _handleStateChange = (state) =>{
        this.setState({location:GLOBAL.toLocation})

    }

    handleClicksss=()=>{
        this.props.navigation.navigate('Rating')

    }
    componentDidMount(){
        this.reason()


        // <QRCode
        // value= 'hi'
        // size={200}
        // bgColor='purple'
        // fgColor='white'/>
        //     </View>

        this.setState({pickuplat:this.props.navigation.state.params.picup_lat})
        this.setState({pickuplong:this.props.navigation.state.params.picup_lon})
        this.setState({droplat:this.props.navigation.state.params.drop_lat})
        this.setState({droplong:this.props.navigation.state.params.drop_lon})



        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    issues = () => {
        this.props.navigation.navigate('Rating')
    }


    handleCheckBox = () => this.setState({ checked: !this.state.checked })
    render() {

        var fp = this.state.finalPrice + parseInt(GLOBAL.package.price)
        var did = fp - parseInt(this.state.discount)
        const origin = {latitude:  GLOBAL.histoty.picup_lat , longitude:  GLOBAL.histoty.picup_lon};
        const destination = {latitude: GLOBAL.histoty.drop_lat, longitude: GLOBAL.histoty.drop_lon};

        var a = 0;
        if (GLOBAL.histoty.booking_for == 4){
            a = 550
        }else{
            a = 350
        }

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
                             Detail

                        </Text>

                    </View>

                </View>




                <MapView style={{width:window.width,height:window.height - 70 }}
                         showsUserLocation={true}
                         showsMyLocationButton={true}
                         showsTraffic={true}
                         ref = {(ref)=>this.mapView=ref}
                         region={{
                             latitude: GLOBAL.histoty.picup_lat,
                             longitude:GLOBAL.histoty.picup_lon,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}>


                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            strokeWidth={3}
                            strokeColor="hotpink"
                            apikey={GOOGLE_MAPS_APIKEY}
                        />


                    <Marker
                        coordinate={{
                            latitude: GLOBAL.histoty.picup_lat,
                            longitude: GLOBAL.histoty.picup_lon,
                            latitudeDelta: 0.0922,

                            longitudeDelta: 0.0421,

                        }}
                    >
                    </Marker>


                    <Marker
                        coordinate={{
                            latitude: GLOBAL.histoty.drop_lat,
                            longitude:  GLOBAL.histoty.drop_lon,
                            latitudeDelta: 0.0922,

                            longitudeDelta: 0.0421,

                        }}
                    >
                    </Marker>



                </MapView>


                <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:20,marginLeft:10, borderRadius:6,marginTop:-height + 100,shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.6,
                    shadowRadius: 2,
                    elevation: 5 }}>

                    <Text style = {{fontFamily:GLOBAL.roman,fontSize:13,color:'#bec2ce',marginLeft:40,marginRight:10,marginTop:10}}>
                        Pickup

                    </Text>
                    <View style={{flexDirection:'row',marginTop:4}}>
                        <Image source={require('./ic_current.png')}
                               style  = {{width:10, height:10,marginLeft:12,marginTop:12,resizeMode:'contain'
                               }}

                        />




                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10}}>
                            {GLOBAL.histoty.picup_address}

                        </Text>


                    </View>

                    {GLOBAL.histoty.booking_for != 4 &&(



                    <View style={{flexDirection:'row'}}>

                        <Image source={require('./Line.png')}
                               style  = {{width:2, height:30,marginLeft:15,marginTop:-4,
                               }}

                        />


                    <View style={{backgroundColor:'#efefef',height:1,width:'80%',marginTop:12,marginLeft:20}}>
                    </View>

                    </View>
                    ) }

                    {GLOBAL.histoty.booking_for != 4 &&(

                    <Text style = {{fontFamily:GLOBAL.roman,fontSize:13,color:'#bec2ce',marginLeft:40,marginRight:10,marginTop:0}}>
                        Drop-Off

                    </Text>
                    ) }
                    {GLOBAL.histoty.booking_for != 4 &&(
                        <View style={{flexDirection:'row',marginTop:1}}>
                            <Image source={require('./Fill.png')}
                                   style  = {{width:20, height:20,marginLeft:8,marginTop:3,resizeMode:'contain'
                                   }}

                            />

                            <Text style = {{fontFamily:GLOBAL.roman,fontSize:16,color:'#242e42',marginLeft:8,marginRight:10,marginTop:4,marginBottom:10}}>
                                {GLOBAL.histoty.drop_address}

                            </Text>
                        </View>

                    ) }


                </View>

                {GLOBAL.histoty.status == 1 && (
<View style = {{marginTop:height - 300}}>

        <Button buttonStyle={{backgroundColor:Colors.blue,width:200,position:'absolute',borderRadius:20,alignSelf:'center',bottom:40}}
                titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                onPress={this.handleClick}
                title="Cancel"
        />



</View>
                )}


                {GLOBAL.histoty.status == 2 && (
                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:30,marginLeft:10, borderRadius:6,marginTop:height - 550,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.6,
                        shadowRadius: 2,
                        elevation: 5 }}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>

                            <View style={{flexDirection:'row',marginTop:20}}>
                                {GLOBAL.histoty.booking_for != 4 &&(
                                <Image
                                    style={{width: 100,height: 70,resizeMode:'contain' }}
                                    source={{uri: GLOBAL.histoty.driver_image}}
                                />
                                )}
                                <View>
                                    {GLOBAL.histoty.booking_for != 4 &&(
                                    <Text style={{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:16}}>

                                        {GLOBAL.histoty.driver_name}
                                    </Text>
                                    )}
                                    {GLOBAL.histoty.booking_for != 4 &&(
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('./star.png')}
                                               style  = {{width:16, height:16,marginLeft:2,marginTop:7,resizeMode:'contain'
                                               }}

                                        />
                                        <Text style={{color:'#bec2ce',fontFamily:GLOBAL.roman,fontSize:16,marginTop:10,marginLeft:5}}>

                                            {GLOBAL.histoty.rating}
                                        </Text>


                                    </View>
                                    )}
                                    {GLOBAL.histoty.booking_for != 4 &&(





                                                                <TouchableOpacity onPress={() => this.setState({visible:true})}>

                                    <Text style = {{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:18,marginTop:10}}>
                                        Show QR Code
                                    </Text>
                                                                </TouchableOpacity>





                                    )}

                                </View>

                            </View>




                            <View>


                            </View>
                            {GLOBAL.histoty.booking_for != 4 &&(



                            <Text style = {{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:18,marginRight:80,marginTop:30}}>
                                OTP :{GLOBAL.histoty.otp}
                            </Text>




                            )}

                        </View>





                        {GLOBAL.histoty.booking_for != 4 &&(
                        <View style={{backgroundColor:'#efefef',height:1,width:'88%',marginTop:12,marginLeft:20}}>
                        </View>
                        )}


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
                        <View style={{flexDirection:'row',marginBottom:30}}>
                            <Button buttonStyle={{backgroundColor:Colors.blue,borderRadius:8,width:150,marginTop:20,marginLeft:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.issues}
                                    title="Report an Issue"
                            />

                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:150,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.issue}
                                    title="Support"
                            />

                        </View>



                    </View>
                )}


                {GLOBAL.histoty.status == 3 && (
                    <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginBottom:10,marginLeft:10, borderRadius:6,marginTop:height - 550,shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.6,
                        shadowRadius: 2,
                        elevation: 5 ,height:250}}>

                        <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',marginTop:20}}>
                                <Image
                                    style={{width: 100,height: 70,resizeMode:'contain' }}
                                    source={{uri: GLOBAL.histoty.driver_image}}
                                />
                                <View>

                                    <Text style={{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:16}}>

                                        {GLOBAL.histoty.driver_name}
                                    </Text>
                                    <View style={{flexDirection:'row'}}>
                                        <Image source={require('./star.png')}
                                               style  = {{width:16, height:16,marginLeft:2,marginTop:7,resizeMode:'contain'
                                               }}

                                        />
                                        <Text style={{color:'#bec2ce',fontFamily:GLOBAL.roman,fontSize:16,marginTop:10,marginLeft:5}}>

                                            {GLOBAL.histoty.rating}
                                        </Text>
                                    </View>

                                </View>

                            </View>




                            <View>


                            </View>
                            <Text style = {{color:'#242e42',fontFamily:GLOBAL.heavy,fontSize:18,marginRight:80,marginTop:30}}>
                                OTP :{GLOBAL.histoty.otp}
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
                        <View style={{flexDirection:'row'}}>
                            <Button buttonStyle={{backgroundColor:Colors.blue,borderRadius:8,width:150,marginTop:20,marginLeft:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClicksss}
                                    title="Rate Us"
                            />

                            <Button buttonStyle={{backgroundColor:Colors.blue,marginLeft:15,width:150,borderRadius:8,marginTop:20}}
                                    titleStyle={{fontFamily:GLOBAL.medium,fontSize:14}}
                                    onPress={this.handleClick}
                                    title="Support"
                            />

                        </View>



                    </View>
                )}



                <Dialog
                    visible={this.state.myvisible}
                    onTouchOutside={() => {
                        this.setState({ myvisible: false });
                    }}
                >
                    <DialogContent>

                        <View style={{width:200,height:200,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>


                            <Text style={{marginTop:4,color:'black',fontFamily:GLOBAL.heavy,fontSize:18,marginTop:7}}>

                                Please Select reason

                            </Text>

                            <FlatList style = {{width:200,marginTop:6}}
                                      data={this.state.cancel}
                                      keyExtractor={this._keyExtractorss}
                                      horizontal={false}
                                      renderItem={this.renderRowItem1}
                                      numColumns={1}
                            />


                        </View>
                    </DialogContent>
                </Dialog>




                <Dialog
                    visible={this.state.visible}
                    onTouchOutside={() => {
                        this.setState({ visible: false });
                    }}
                >
                    <DialogContent>

                        <View style={{width:200,height:200,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>


                             <QRCode
                                 style = {{marginTop:40,alignSelf:'center'}}
                             value= {GLOBAL.histoty.otp}
                             size={200}
                            bgColor= {Colors.blue}
                             fgColor='white'/>


                        </View>
                    </DialogContent>
                </Dialog>

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
