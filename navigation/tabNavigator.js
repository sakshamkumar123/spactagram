import React,{Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feed from '../screens/Feed';
import firebase from 'firebase'
import { StyleSheet } from 'react-native';
import CreateStory from '../screens/CreateStory';
import { RFValue } from 'react-native-responsive-fontsize';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator()

export default class  BottomTabNavigator extends Component {
  constructor(props){
    super(props)
    this.state={
      lightTheme:true,
      isUpdated:false,

    }
  }
  changeUpdated=()=>{
    this.setState({
      isUpdated:true
    })
  }
  removeUpdated=()=>{
    this.setState({
      isUpdated:false
    })
  }
  renderFeed=props=>{
    return <Feed setUpdateToFalse={this.removeUpdated} {...props}/>
  }
  renderStory=props=>{
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props}/>
  }
  componentDidMount(){
    let theme 
    firebase
    .database()
    .ref("/users/"+firebase.auth().currentUser.uid)
    .on("value",function(snapshot){
      theme= snapshot.val().current_theme
    })
    this.setState({
      lightTheme:theme==="light"? true : false
    })}
    render(){ 
  
  return(

    <Tab.Navigator
    labeled = {false}
    barStyle= {this.state.lightTheme ? styles.bottomTabStyleLight : styles.bottomTabStyle}
    screenOptions={({route})=>({
      tabBarIcon:({focused,color,size})=>{
        let iconName;
        if(route.name==='Feed'){
          iconName= focused
          ?'book'
          :'book-outline'
        }
        else if(route.name==='CreateStory'){
          iconName= focused
          ?'create'
          :'create-outline'
        }
        return(
           <Ionicons 
          name  = {iconName}
          size={RFValue(25)} 
          color={color} 
          style={styles.icons}/>
        )
      }
    })}
   
      activeColor={'tomato'}
      inactiveColor={'gray'}
 
    >
      <Tab.Screen name = "Feed" component = {this.renderFeed} options={{unmountOnBlur:true}}/>
      <Tab.Screen name = "CreateStory" component = {this.renderStory} options={{unmountOnBlur:true}}/>
    </Tab.Navigator>

  )
}
}
const styles=StyleSheet.create({
  bottomTabStyle:{
    backgroundColor:'#2f345d',
    height:'8%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow:"hidden",
    position:'absolute'
  },
  bottomTabStyleLight:{
    backgroundColor:'#eaeaea',
    height:'8%',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    overflow:"hidden",
    position:'absolute'
  },
  icons:{
    width:RFValue(30),
    height:RFValue(30)
  }
})


