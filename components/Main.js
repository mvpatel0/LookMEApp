import React,{Components} from "react";
import {
StyleSheet,
Text,
View,
SafeAreaView,
Platform, 
Image,
ScrollView, 
TouchableOpacity
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';
import {Camera} from 'expo-camera';

export default class Main extends React.Component{
  constructor(props){
    super(props);
      this.state={
        hasCameraPermission:null,
        face:[]
      }
  }
async componentDidMount(){
    Permissions.askAsync(Permissions.CAMERA)
    .then(this.onCameraPermission)
  }
  onCameraPermission({status}){
    this.setState({
      hasCameraPermission:status==="granted"
    })
  }
  onfacesDetected({faces}){
    this.setState({faces:faces})
    console.log(faces)
  }
render(){
   const {hasCameraPermission} = this.state
    if(hasCameraPermission===null){
      
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.androidSafearea}/>
      <View style={styles.titleContainer}>
      <Text style={styles.titleText}>Look Me APP__</Text>
      </View>
      <View style={styles.cameraContainer}>
      <Camera
      style={{flex:1}}
      type={Camera.Constants.Type.front}
      faceDetectorSettings={{
         mode:FaceDetector.FaceDetectorMode.fast,
         detectLandmarks:FaceDetector.FaceDetectorLandmarks.all,
         runClassification:FaceDetector.FaceDetectorClassifications.all
   }}
onFacesDetected = {this.onfacesDetected}
      />
      </View>
      
      </View>
    )
    }
    else{
      return(
        <View>
        <Text>No Access To Camera</Text>
        </View>
      )
    }
}}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  androidSafearea:{
    marginTop:Platform.OS==="android"?StatusBar.currentHeight:0
  },
  titleContainer:{
    flex:0.1,
    alignItems:"center",
    justifyContent:"center"
  },
  titleText:{
    fontSize:30
  },
  cameraContainer:{
    flex:0.7
  }
})
