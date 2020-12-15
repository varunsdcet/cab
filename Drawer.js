import React, {Component} from 'react';
import {NavigationActions,StackActions, } from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,    StyleSheet,
    Image,TouchableOpacity,Alert,TouchableNativeFeedback} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const GLOBAL = require('./Global');

class Drawer extends React.Component {

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            my: 'sdf',
            expandList:true,
            name:'',
            email:'',
            image:'',
        }
    }

    _handleStateChange =(state)=> {

        if (GLOBAL.user_id != "") {

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
                        GLOBAL.code = responseJson.data.referral_code

                        this.setState({name: responseJson.data.name})
                        this.setState({email: responseJson.data.name})
                        this.setState({image: responseJson.data.profile_pic})
                    }

                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willFocus', this._handleStateChange);



    }

    _YesLogout=()=>{

        GLOBAL.user_id='';
        AsyncStorage.removeItem('userID');



        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }


    expandList=(visible)=>{
        this.setState({expandList: !this.state.expandList})
    }




    navigateToScreen1 = () =>  {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }


    navigateToScreen = (route) => () => {

        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }





    render () {

        return (
            <View style={{flex:1, backgroundColor:'#09304B'}}>
                <ScrollView>
                    <View style={{backgroundColor:'#09304B'}}>

                        <View  style={styles.headertop}>

                            <View style={{marginTop:30, marginLeft:20, flexDirection: 'column'}}>

                                <TouchableOpacity style = {{width:'100%'}}

                                                  onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <View style={{flexDirection:'column', marginTop:5,}}>
                                    <Image style={{width:70, height:70, borderRadius:35, marginLeft:60}}
                                           source={{uri: this.state.image}}/>
                                    <Text style = {{marginTop:10,color : 'white',marginLeft : 80,fontFamily:GLOBAL.medium,fontSize: 17, height:'auto'}} >
                                        {this.state.name}
                                    </Text>
                                    <Text style = {{marginTop:10,color : 'white',marginLeft : 80,fontFamily:GLOBAL.medium,fontSize: 17, height:'auto'}} >
                                        {this.state.email}
                                    </Text>
                                </View>
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./home.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.toggleDrawer()}>
                                Home
                            </Text>
                        </View>





                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./wallet.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Wallet')}>
                                Wallet
                            </Text>
                        </View>


                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./offer.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Offer')}>
                                Offers
                            </Text>
                        </View>

                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./history.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('History')}>
                                History
                            </Text>
                        </View>

                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./notification.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Notification')}>
                                Notifications
                            </Text>
                        </View>

                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./invite.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Invite')}>
                               Invite Friends
                            </Text>
                        </View>

                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./settings.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.navigate('Setting')}>
                             Settings
                            </Text>
                        </View>

                        <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./logout.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>   this.navigateToScreen1()}>
                                Logout
                            </Text>
                        </View>


                    </View>
                </ScrollView>
            </View>
        );
    }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};


const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'#f1f1f1',

    },
    drawerText :{
        marginTop : 2,
        color : 'white',
        marginLeft : 40,
        fontSize:15,

        fontFamily:GLOBAL.medium

    } ,
    headertop :{

        width : 300,
        height : 180,
        backgroundColor : '#09304B',
        flexDirection:'column'
    } ,

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        marginLeft : 40,


    },
    drawericon: {

        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,
        resizeMode:'contain'


    },

    drawericons: {

        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,

    },


    drawerTexts: {

        width: 180,
        height: 22,
        marginLeft : 45 ,
        marginTop : -18,
        color: 'white',
        fontSize:17,
        fontFamily:GLOBAL.heavy,


    },


    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    slide1: {

        marginLeft : 50,

        width: window.width - 50,
        height:300,
        resizeMode:'contain',
        marginTop : window.height/2 - 200


    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 20,
        textAlign : 'center',
        fontSize: 17,
        justifyContent:'center',
        color : '#262628',



    } ,
    createaccount :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 17,
        textAlign : 'center',
        marginTop : 30,
        color : '#0592CC',
        textDecorationLine: 'underline',



    } ,
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})

export default Drawer;
