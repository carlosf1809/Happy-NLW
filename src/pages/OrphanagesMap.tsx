import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../services/api';

interface Orphanage {
   id: number;
   name: string;
   latitude: number;
   longitude: number;
}

export default function OrphanagesMap(){
   const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
   const navigation = useNavigation();

   useFocusEffect(() => {
      api.get('orphanages').then(Response =>{
         setOrphanages(Response.data)
      })
   },)


   function handleNavigatorToOrphanageDetails( id: number ){
      navigation.navigate('OrphanageDetails', { id });
   }
   function handleNavigatorToCreteOphanage(){
      navigation.navigate('SelectMapPosition');
   }

    return(
         <View style={styles.container}>
            <MapView 
               provider={PROVIDER_GOOGLE}
               style={styles.map} 
               initialRegion={{
               latitude:-19.8225222,
               longitude:-43.9671416,
               latitudeDelta:0.008,
               longitudeDelta:0.008,
               }}
            >
               {orphanages.map(orphanage => {
                  return(
                     <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        calloutAnchor={{
                           x:2.7,
                           y:0.8,
                        }}
                        coordinate={{
                           latitude: orphanage.latitude,
                           longitude: orphanage.longitude,
                        }}
                        >
                           <Callout tooltip onPress={() => handleNavigatorToOrphanageDetails(orphanage.id)}>
                              <Text>
                              <View style={styles.CalloutContainer}> 
                                    <Text style={styles.CalloutText}> {orphanage.name} </Text>
                              </View>

                              </Text>
                           </Callout>
                     </Marker>
                  )
               })}
            </MapView>

            <View style={styles.footer}>
               <Text style={styles.footerText}>
                  {orphanages.length} Orfanatos encontrados 
               </Text>

               <RectButton style={styles.createOrphanageButton} onPress={handleNavigatorToCreteOphanage}>
                  <Feather name="plus" size={20} color="#FFF"/>
               </RectButton>


            </View> 
      
      </View>
    )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   map:{
     width: Dimensions.get('window').width,
     height: Dimensions.get('window').height,
   },
   CalloutContainer:{
     width:160,
     height:46,
     paddingHorizontal:16,
     backgroundColor:'rgba(255,255,255,0.8)',
     borderRadius: 16,
     justifyContent:'center',
     elevation:10,
     
     
   },
   CalloutText:{
     color:'#0089a5',
     fontSize:14, 
     fontFamily:'Nunito_700Bold',
   },
 
   footer:{
     position: 'absolute',
     left:24,
     right:24,
     bottom:32,
 
     backgroundColor:'#FFF',
     borderRadius:20,
     height:56,
     paddingLeft:24,
 
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
 
     elevation:10,
 
     shadowColor : '#969696',
     shadowOpacity: 0.8,
     shadowRadius: 10,
   },
   footerText:{
     color: '#8fa7b3',
     fontFamily:'Nunito_700Bold',
   },
   createOrphanageButton:{
     width:56,
     height:56,
     backgroundColor:'#15c3d6',
     borderRadius: 20,
 
 
     alignItems: 'center',
     justifyContent:'center'
 
   },
 });
 