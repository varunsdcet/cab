import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions, ImageBackground, StatusBar, AsyncStorage} from 'react-native';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
type Props = {};
export default class Splash extends Component {
    constructor(props) {

        super(props)
        this.state = {

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




    componentDidMount(){

        var values =  AsyncStorage.getItem('userID');
        values.then((e)=>{
            if (e == '' || e == null ){
                GLOBAL.user_id = '';
                this.props.navigation.navigate('DrawerNavigator')

            }else {
                GLOBAL.user_id = e;

                this.props.navigation.navigate('DrawerNavigator')
            }

        })

       }




    render() {

        return (



            <View style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <ImageBackground
                    source={require('./splash.png')}
                    style={{width: '100%', height: '100%'}}
                >

                </ImageBackground>

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

    title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    }
});
