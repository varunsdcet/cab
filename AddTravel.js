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
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
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
import {TextField} from "react-native-material-textfield";
type Props = {};
export default class AddTravel extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :[],
            date:'',
            lat:'',
            long:'',
            selectedTab:0,
            offer:[],
            discount:0,
            finalPrice:0,
            price:true,
            extra:true,
            important:true,
            name:'',
            email:'',
            mobile:'',
            value:0,
            title:'',
            firstname:'',
            lastname:'',
            address:'',

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
var gender = ""
      if (this.state.value == 0){
        gender = "1"
      }
      if (this.state.value == 1){
          gender = "2"
      }

      const url = 'http://139.59.76.223/cab/webservices/add_member'
var ke = JSON.stringify({
    user_id: GLOBAL.user_id,
    title:this.state.title,
    firstname:this.state.firstname,
    lastname:this.state.lastname,
    paxtype:this.props.navigation.state.params,
    dateofbirth:this.state.date,
    gender:gender,
    passportNo:'',
    passportExpiry:'',
    addressLine:this.state.address,
    city:'',
    countryCode:'INR',
    cellCountryCode:"+91",
    contactNo:this.state.mobile,
    nationality:"India",
    email:this.state.email,
    isLeadPax:''


})
console.log(ke)
      fetch(url, {
          method: 'POST',
          headers: {
              'x-api-key':'$2y$12$MOOt6dmiClUmITafZDyR2edjeJzx.UiXzG/ArWY8fl.zhNSi6FUfy',
              'Content-Type': 'application/json',

          },
          body: JSON.stringify({
              user_id: GLOBAL.user_id,
              title:this.state.title,
              firstname:this.state.firstname,
              lastname:this.state.lastname,
              paxtype:this.props.navigation.state.params,
              dateofbirth:this.state.date,
              gender:gender,
              passportNo:'',
              passportExpiry:'',
              addressLine:this.state.address,
              city:'',
              countryCode:'INR',
              cellCountryCode:"+91",
              contactNo:this.state.mobile,
              nationality:"India",
              email:this.state.email,
              isLeadPax:''


          }),
      }).then((response) => response.json())
          .then((responseJson) => {


              if (responseJson.status == true){

this.props.navigation.goBack()
              }else{

              }

          })
          .catch((error) => {
              console.error(error);
          });



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

                            fontFamily:GLOBAL.heavy,marginTop: 8,marginLeft:10,color:'#FBD303',fontSize:16}}>
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

    getIndex = (index,value) =>{
this.setState({title:value})
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

        var a = ""

        if (GLOBAL.type == "Airport") {

            if (GLOBAL.myi == "0") {
                a = GLOBAL.airportLocation + '-' + GLOBAL.toLocation
            } else if (GLOBAL.myi == "1") {
                a = GLOBAL.toLocation + '-' + GLOBAL.airportLocation
            } else if (GLOBAL.myi == "2") {
                a = GLOBAL.toLocation + '-' + GLOBAL.searchLocations
            }
        }
        else if (GLOBAL.type == "Outstation"){
            a = GLOBAL.toLocation + '-' + GLOBAL.searchLocations
        }
        else if (GLOBAL.type == "CarRental"){
            a = GLOBAL.toLocation
        }

        let data = [{
            value: 'Mr',
        }, {
            value: 'Mrs',
        }];

        var radio_props = [
            {label: 'Male', value: 0 },
            {label: 'Female', value: 1 }
        ];
var s = this.state.finalPrice - parseInt(this.state.discount)

        return (
            <View  style = {{backgroundColor:Colors.background,flexDirection:'column'}} >

                <StatusBar barStyle="light-content" />
                <SafeAreaView style={{ flex:0, backgroundColor:'#FBD303'}} />


                <View style={{width:window.width,height:80,backgroundColor:'#FBD303'}}>

                    <View style = {{flexDirection:'row',marginTop:20}}>

                        <TouchableOpacity onPress={() =>this.props.navigation.goBack()}>
                            <Image source={require('./back.png')}
                                   style  = {{width:20, height:20,marginLeft:20,marginTop:7,resizeMode:'contain'
                                   }}

                            />
                        </TouchableOpacity>







                    </View>

                </View>


               < KeyboardAwareScrollView>








                   <View style={{backgroundColor:'white',color :'white',flexDirection:'column'  ,borderColor:'#f7f7f7',width : width- 20,marginLeft:10, borderRadius:6,marginTop:20,shadowColor: '#000',
                       shadowOffset: { width: 0, height: 1 },
                       shadowOpacity: 0.6,
                       shadowRadius: 2,
                       elevation: 5 }}>



                       <Text style = {{fontFamily:GLOBAL.roman,fontSize:17,color:'#8a8a8f',marginTop:12,marginLeft:16,width:window.width-140}}>
                          Traveller Information

                       </Text>


                       <View style={{marginLeft:10,width:width - 40}}>
                       <Dropdown
                           rippleOpacity = {0.54}
                           dropdownPosition = {.2}
                           onChangeText ={ (value,index) => this.getIndex(index,value) }
                           itemTextStyle = {{fontFamily:GLOBAL.heavy,fontSize:16,color:'grey'}}
                           label='Select title'
                           data={data}
                       />

                       <TextField
                           label={'First Name'}
                           onChangeText={text => this.setState({firstname:text})}
                           tintColor = 'grey'


                       />
                       <TextField
                           label={'Last Name'}
                           onChangeText={text => this.setState({lastname:text})}
                           tintColor = 'grey'


                       />

                       <TextField
                       label={'Email'}
                       onChangeText={text => this.setState({email:text})}
                       tintColor = 'grey'


                   />


                       <TextField
                           label={'Mobile'}
                           onChangeText={text => this.setState({mobile:text})}
                           tintColor = 'grey'


                       />
                       <TextField
                           label={'Address'}
                           onChangeText={text => this.setState({address:text})}
                           tintColor = 'grey'


                       />


</View>
<DatePicker
       style={{width: 200}}
       date={this.state.date}
       mode="date"
       placeholder="Select date of Birth"
       format="YYYY-MM-DD"
      showIcon = {false}
       confirmBtnText="Confirm"
       cancelBtnText="Cancel"
       customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         dateInput: {
           marginLeft: 5,
           width:'100%'
         }
         // ... You can check the source to find the other keys.
       }}
       onDateChange={(date) => {this.setState({date: date})}}
     />

                       <View style = {{margin:20,marginTop:20}}>
                           <Text style={{color:'#8f8f8f',fontFamily:GLOBAL.roman,fontSize:16}}>
                               Gender

                           </Text>
                           <RadioForm
                               radio_props={radio_props}
                               initial={0}
                               buttonSize = {10}
                               formHorizontal={true}
                               labelHorizontal={true}
                               buttonOuterColor = {'black'}
                               buttonInnerColor = {'#09304B'}
                               animation={true}
                               labelStyle={{fontSize: 18,paddingRight:18, color: 'black',fontFamily:GLOBAL.medium}}
                               onPress={(value) => {this.setState({value:value})}}
                           />


                       </View>


                   </View>
                   <Button buttonStyle={{backgroundColor:'#09304B',width:width-40,borderRadius:10,alignSelf:'center',marginTop:40,marginLeft:20}}
                           titleStyle={{fontFamily:GLOBAL.heavy,fontSize:20}}
                           onPress={this.handleClick}
                           title="Submit"
                   />

                   <View style = {{height:180}}>

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
