import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';

import { DrawerActions } from 'react-navigation';
const GLOBAL = require('./Global');
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
type props={};
const homePlace = { description: 'Goa', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'HI', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
export default class Location extends Component<Props>{
    state = {
        location: '',

    };
    onPressFemale(){
        //   this.props.navigation.navigate('Duration')
    }

    render(){
        return(

            <View style={{ flex: 1 }}>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    locationsdL = {GLOBAL.local}
                    returnKeyType={"search"}
                    listViewDisplayed="false"
                    fetchDetails={true}
                    renderDescription={row =>
                        row.description || row.formatted_address || row.name

                    }
                    onPress={(data, details = null) => {
                        GLOBAL.searchLatiude =  details.geometry.location.lat
                        GLOBAL.searchLongitude =  details.geometry.location.lng
                        GLOBAL.searchLocation =  data.description
                        this.props.navigation.goBack()

                    }}
                    getDefaultValue={() => {
                        return ""; // text input default value
                    }}
                    query={{
                        key: "AIzaSyBWX-QNm_gVzt6U2K6xeU4cmF5dkX8XUQ0",
                        language: "en", // language of the results
                        types: "(cities)" // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb"
                        }
                    }}
                    enablePoweredByContainer={true}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    predefinedPlaces={[homePlace, workPlace]}
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: ""
                    }}
                    filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                    ]}
                    debounce={200}
                />
            </View>
        );
    }
}