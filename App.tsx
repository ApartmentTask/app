/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useEffect, useState}from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity ,
  Alert,
  FlatList,
} from 'react-native';


function App(): React.JSX.Element {

  const [apartmentData, setApartmentData] = useState([]);

  const getApartment = async () => {
    try {
      const response = await fetch('http://192.168.112.138:3000/api/apartments');
      const json = await response.json();
      setApartmentData(json);
    } catch (error) {
      console.error(error);
    } 
  };

  useEffect(() => {
    getApartment();
  }, []);



    const Item = ({apartment} : {apartment: any}) => (
      <TouchableOpacity onPress={
        ()=>{
          const head=apartment.name //name
          const body="price: $"+apartment.price+"\n\nDescription: "+apartment.description  //price and description
          Alert.alert(head,body)}
        }>
     <View style={styles.viewStyle}>
        <Text style={styles.sectionDescription}>{apartment.name}</Text>
     </View>
     </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.backgroundStyle}>

      <Text style={styles.sectionTitle}>Apartment List</Text>

      <FlatList
        data={apartmentData}
        renderItem={({item}: {item: any}) => <Item apartment={item} />}
        keyExtractor={item => item._id} //._id
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  viewStyle:{
    marginTop: 30,
    width:250,height:100, 
    backgroundColor:'grey', 
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:20
  },
  backgroundStyle:{
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default App;
