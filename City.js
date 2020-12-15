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
    FlatList, TextInput, AsyncStorage
} from 'react-native';
const window = Dimensions.get('window');
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
type Props = {};
export default class City extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :[],
            lat:'',
            long:'',
            selectedTab:0,
            offer:[],
            text:'',
            news:[],
            discount:0,
            finalPrice:0,
            price:true,
            extra:true,
            important:true,
            name:'',
            email:'',
            mobile:'',
            value:0,

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

    handleClick = () =>{

        GLOBAL.travellerusername = this.state.name
        GLOBAL.travelleremail = this.state.email
        GLOBAL.travellermobile = this.state.mobile
        GLOBAL.baseAmount = GLOBAL.cab.airport.base_price
        GLOBAL.discount = this.state.discount
        if (this.state.value == 0){
            GLOBAL.travellermobile = "Male"
        }else{
            GLOBAL.travellermobile = "Female"
        }

        var values =  AsyncStorage.getItem('userID');
        values.then((e)=>{
            if (e == '' || e == null ){

                this.props.navigation.navigate('Register')

            }else {
                GLOBAL.user_id = e;
                this.props.navigation.navigate('PaymentMode')
            }

        })



    }

    renderRowItem2 = (itemData) => {
        return (
            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between'}}>
                <Text style={{ marginLeft:12,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 15,marginTop:4 }}>{itemData.item.title}</Text>

                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:4 }}>{itemData.item.price}</Text>

            </View>
        )
    }

    renderRowItem3 = (itemData) => {
        return (
            <View >


                <Text style={{ marginRight:60,color: '#767676', fontFamily:GLOBAL.medium,fontSize: 14,marginTop:4,marginLeft:14 }}>. {itemData.item} </Text>

            </View>
        )
    }

    renderRowItem1 = (itemData) => {
        return (
            <View style={{marginLeft:16,marginTop:6}}>
                <Text style={{ color: 'black', fontFamily:GLOBAL.roman,fontSize: 12,marginTop:3 }}>{itemData.item.title}</Text>

            </View>
        )
    }
    componentDidMount(){

    }
    setSelectedTab = (index) =>{
        this.setState({selectedTab:index})

    }

    changeIndex = (index) => {

        var discount = this.state.offer[index].type
        if (discount == "Fixed"){
            this.setState({discount:this.state.offer[index].amount })
        }else{
            var fp = this.state.finalPrice
            var amount = parseInt(this.state.offer[index].amount)
            var s = fp * amount/100

            alert(s)

            if(s > parseInt(this.state.offer[index].upto_amount)){
                this.setState({discount:this.state.offer[index].upto_amount })
            }else{


                this.setState({discount:s })
            }

        }


//   GLOBAL.language = item.code;
        let { offer } = this.state;
        for(let i = 0; i < offer.length; i++){
            offer[i].is_selected = '';
        }


        let targetPost = offer[index];

        // Flip the 'liked' property of the targetPost
        targetPost.is_selected = "Y";

        offer[index] = targetPost;


        GLOBAL.couponCode =targetPost.promocode,
            GLOBAL.couponid = targetPost.id,

            // Then update targetPost in 'posts'
            // You probably don't need the following line.
            // posts[index] = targetPost;

            // Then reset the 'state.posts' property

            this.setState({ offer: offer})




    }
    renderRowItem10 = (itemData,index) => {
        return (

            <TouchableOpacity onPress={() => this.changeIndex(itemData.index)}>

                <View style={{flexDirection:'row'}}>

                    {itemData.item.is_selected == '' &&(

                        <Image source={require('./radio.png')}
                               style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                               }}

                        />
                    )
                    }

                    {itemData.item.is_selected != '' &&(

                        <Image source={require('./radios.png')}
                               style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                               }}

                        />
                    )
                    }


                    <View>
                        <Text style={{

                            fontFamily:GLOBAL.heavy,marginTop: 8,marginLeft:10,color:Colors.blue,fontSize:16}}>
                            {itemData.item.promocode}

                        </Text>

                        <Text style = {{fontFamily:GLOBAL.roman,fontSize:12,color:'#8a8a8f',marginTop:4,marginLeft:12,width:window.width-20}}>
                            {itemData.item.description}

                        </Text>

                    </View>



                </View>
            </TouchableOpacity>

        )
    }

    SearchFilterFunction(text){
        const url = 'http://139.59.76.223/cab/webservices/findcity'

        fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                key: text,


            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                if (responseJson.status == true){
                    this.setState({news:responseJson.data})

                }else{
                    this.setState({news:[]})
                }

            })
            .catch((error) => {
                console.error(error);
            });
        this.setState({text:text})

    }
    ok =()=> {
        this.setState({text:''})
        this.getNewsUpdate()
    }
    packageDetail = (get) => {
        this.props.navigation.navigate('About',get)

    }

    _handleCategorySelects = (item)=>{
        GLOBAL.searchLocations = item.name
        GLOBAL.cityid = item.id
        this.props.navigation.goBack()
    }

    _renderItemCategs = (item,index)=>{

//      alert(JSON.stringify(item))
        return (
            <TouchableOpacity
                onPress={() => this._handleCategorySelects(item.item)}>


                <View style = {{ backgroundColor:'white',width:window.width,
                    flexDirection:'row',height : 40}}>






                    <Text style = {{fontSize:18,marginTop :10,marginLeft:10}}>
                        {item.item.name}
                    </Text>








                </View>

                <View style={{height:1, backgroundColor:'#efefef', width:window.width,marginTop:4}}>
                </View>


            </TouchableOpacity>


        )
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
        var radio_props = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
        var s = this.state.finalPrice - parseInt(this.state.discount)

        return (
            <View  style = {{backgroundColor:Colors.background,height:height,flexDirection:'column'}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:Colors.blue }} />


                <View style={{width:window.width,height:60,backgroundColor:Colors.blue}}>

                    <View style = {{flexDirection:'row',marginTop:20,width:'100%'}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>

                        <Text style={{color:'white',textAlign:'center',fontFamily:GLOBAL.heavy,fontSize:20,alignSelf:'center',marginTop:8,width:width - 80}}>
                            Search City

                        </Text>





                    </View>

                </View>


                <View style = {{borderRadius:5 ,height:40,width:window.width ,marginLeft:5,marginTop:25,flexDirection:'row'}}>

                    <View style = {{flexDirection:'row', width:'68%',backgroundColor:'#efefef'}}>



                        <TextInput
                            style={{ height: 40, borderColor: 'gray',fontSize:14, borderBottomWidth: 0, marginTop:0 ,marginBottom: 20 ,marginLeft:5,width:window.width -150,color:'black' }}
                            // Adding hint in TextInput using Placeholder option.
                            placeholder="Search City"
                            onChangeText={(text) => this.SearchFilterFunction(text)}
                            value={this.state.text}
                            // Making the Under line Transparent.
                            underlineColorAndroid="transparent"
                        />
                    </View>

                    <Text
                        style={{ fontSize: 18, color: 'black',marginTop:12,marginLeft:8 }}

                    >
                        Cancel
                    </Text>
                </View>

                <FlatList style= {{marginTop:10, marginBottom: 10,backgroundColor:'transparent'}}
                          data={this.state.news}


                          showsHorizontalScrollIndicator={false}
                          keyExtractor = { (item, index) => index.toString() }
                          extraData={this.state}
                          renderItem={this._renderItemCategs}
                />

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
