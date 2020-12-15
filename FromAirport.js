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
import SearchBar from 'react-native-search-bar';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar'
const { width, height } = Dimensions.get('window');
var arrayholder = [];
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
export default class FromAirport extends Component {
    constructor(props) {

        super(props)
        this.state = {
            index: 0,
            location:'',
            eventLists :["1","2"],
            lat:'',
            long:'',
            selectedTab:0,
            data:[],
            value:'',

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

    }

    _handleCategorySelects = (items) =>{
      GLOBAL.inflight = items
      this.props.navigation.goBack()
    }

    renderRowItem1 = (itemData) => {
        return (
          <TouchableOpacity
                         onPress={() => this._handleCategorySelects(itemData.item)}>
           <View style = {{margin:8,borderBottomWidth:1,borderBottomColor:'grey',marginBottom:3,flexDirection:'row'}}>
           <View>
               <Text style={{ color: 'black', fontFamily:GLOBAL.medium,fontSize: 16,marginTop:1,marginLeft:3,width:window.width - 60 }}>{itemData.item.name}</Text>
                  <Text style={{ color: 'grey', fontFamily:GLOBAL.medium,fontSize: 16,marginTop:1,marginLeft:3,width:window.width - 60 }}>{itemData.item.map_address}</Text>
</View>
                <Text style={{ color: 'grey', fontFamily:GLOBAL.medium,fontSize: 16,marginTop:1,marginLeft:3}}>{itemData.item.code}</Text>
           </View>
           </TouchableOpacity>

        )
    }
    componentDidMount(){
      const url =  GLOBAL.BASE_URL  + 'fetch_airports'

      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },


      }).then((response) => response.json())
          .then((responseJson) => {




              if (responseJson.status == true) {
                  this.setState({data:responseJson.data})
this.arrayholder =  responseJson.data

              }else{
                  this.setState({results:[]})
              }
          })
          .catch((error) => {
              console.error(error);

          });


        this.props.navigation.addListener('willFocus', this._handleStateChange);
    }
    searchFilterFunction = (text) =>{
      const newData = this.arrayholder.filter(function(item){
              const itemData = item.name.toUpperCase()
              const textData = text.toUpperCase()
              return itemData.indexOf(textData) > -1
          })
          this.setState({
              data: newData,
              value: text,
              nodata:'No found'
          })
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
                <SafeAreaView style={{ flex:0, backgroundColor:'#09304B' }} />

<KeyboardAwareScrollView style={{height:window.height}}>

<SearchBar
  ref="searchBar"

  placeholder="Enter Airport Name"
   value={this.state.value}
         onChangeText={text => this.searchFilterFunction(text)}

/>

                <FlatList style = {{width:window.width}}
                          data={this.state.data}
                          keyExtractor={this._keyExtractorss}
                          horizontal={false}
                          renderItem={this.renderRowItem1}
                          numColumns={1}
                />


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
