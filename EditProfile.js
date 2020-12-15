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
import ImagePicker from 'react-native-image-picker';
const window = Dimensions.get('window');
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
const { width, height } = Dimensions.get('window');
const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
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
import { TextField } from 'react-native-material-textfield';
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
export default class EditProfile extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            selectedTab:0,
            name:'',
            email:'',
            avatarSource:'',
            image:'',
            mobile:'',
            address:'',
            city:'',
            state:'',

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


    buttonClickListener = () =>{







            //   this.showLoading()
            const url = 'http://139.59.76.223/cab/webservices/edit_profile'
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('name', this.state.name);
            data.append('email', this.state.email);
        data.append('address', this.state.address);
        data.append('city', this.state.city);
        data.append('state', this.state.state);



            // you can append anyone.
            data.append('profile_pic', {
                uri: GLOBAL.profileImage,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                }

            }).then((response) => response.json())
                .then((responseJson) => {
                    //       this.hideLoading()
//                   //  alert(JSON.stringify(responseJson))
                    const { navigation } = this.props;
                    navigation.goBack();

                    alert('Profile Updated Successfully!')



                });


    }


    _handleStateChange = (state) =>{

    }

    renderRowItem1 = (itemData) => {
        return (

            <View>
                <Text style={{ color: '#8a8a8f', fontFamily:GLOBAL.heavy,fontSize: 12,marginTop:4,marginLeft:20 }}>. {itemData.item}</Text>
            </View>

        )
    }

    changeImage=()=>{
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                GLOBAL.profileImage = response.uri
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });

    }


    componentDidMount(){
        const url = 'http://139.59.76.223/cab/webservices/getprofile'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': '$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                user_id: GLOBAL.user_id,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {
               //  alert(JSON.stringify(responseJson))


                if (responseJson.status == true) {

                    this.setState({name:responseJson.data.name})
                    this.setState({email:responseJson.data.name})
                    this.setState({mobile:responseJson.data.mobile})
                    this.setState({address:responseJson.data.address})
                    this.setState({city:responseJson.data.city})
                    this.setState({state:responseJson.data.state})
                    this.setState({image:responseJson.data.profile_pic})
                    GLOBAL.profileImage = responseJson.data.profile_pic
                }

            })
            .catch((error) => {
                console.error(error);
            });


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

        let { email } = this.state;
        let { address } = this.state;
        let { city } = this.state;
        let { state } = this.state;
        let { name } = this.state;

        return (
            <View  style = {{backgroundColor:Colors.background}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />

                <KeyboardAwareScrollView style={{height:window.height}}>

                    <View

                        style={{width: '100%', height: 230,backgroundColor:Colors.blue}}
                    >





                        <View style = {{flexDirection:'row',marginTop:20,justifyContent:'space-between',width:'100%'}}>

                            <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                                <Image source={require('./back.png')}
                                       style  = {{width:20, height:20,marginTop:7,marginLeft:10,resizeMode:'contain'
                                       }}

                                />
                            </TouchableOpacity>


                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,color:'white',marginTop:8}}>
                               Profile

                            </Text>
                            <TouchableOpacity
                                onPress={() => this.buttonClickListener()}>
                            <Text style = {{fontFamily:GLOBAL.heavy,fontSize:20,marginRight:10,color:'white',marginTop:8}}>
                                Save

                            </Text>
                            </TouchableOpacity>


                        </View>



                        <View style = {{flexDirection:'row',alignSelf:'center',marginTop:30}}>
                            <TouchableOpacity
                                onPress={() => this.changeImage()}>

                                {this.state.avatarSource != '' && (

                                    <Image style = {{width :80 ,height : 80 ,borderRadius:40,alignSelf:'center'}}
                                           source={this.state.avatarSource} />
                                )}
                                {this.state.avatarSource == '' && (

                                    <Image style = {{width :80 ,height : 80 ,borderRadius:40,alignSelf:'center'}}
                                           source={{uri:this.state.image}}/>
                                )}

                            </TouchableOpacity>





                        </View>

                    </View>


                    <View style={{marginLeft:20}}>
                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#8a8a8f',marginTop:12,marginLeft:16}}>
                            {GLOBAL.histoty.traval_date} , {GLOBAL.histoty.traval_time}

                        </Text>



                    </View>

                    <View style={{width:width-20,marginLeft:10}}>


                    <TextField
                        label={'Name'}
                        defaultValue={this.state.name}
                        tintColor = 'grey'
                        onChangeText={ (name) => this.setState({ name }) }
                        baseColor = 'black'



                    />

                        <TextField
                            label={'Email'}
                            defaultValue={this.state.email}
                            tintColor = 'grey'
                            onChangeText={ (email) => this.setState({ email }) }
                            baseColor = 'black'



                        />

                        <TextField
                            label={'Email'}
                            defaultValue={this.state.mobile}
                            tintColor = 'grey'
                            editable={false}

                            baseColor = 'black'



                        />

                        <TextField
                            label={'Email'}
                            defaultValue={this.state.address}
                            tintColor = 'grey'
                            onChangeText={ (address) => this.setState({ address }) }

                            baseColor = 'black'



                        />

                        <View style={{flexDirection:'row'}}>

                            <View style={{width:width/2 -30}}>
                            <TextField
                                label={'City'}
                                defaultValue={this.state.city}
                                tintColor = 'grey'
                                onChangeText={ (city) => this.setState({ city }) }

                                baseColor = 'black'



                            />
                        </View>

                        <View style={{width:width/2 -30,marginLeft:20}}>
                        <TextField
                            label={'State'}
                            defaultValue={this.state.state}
                            tintColor = 'grey'
                            onChangeText={ (state) => this.setState({ state }) }
                            baseColor = 'black'



                        />
                    </View>


</View>
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
