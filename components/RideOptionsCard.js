import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "data:image/jpeg;base64,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",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "data:image/jpeg;base64,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",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "data:image/jpeg;base64,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",
  },
];

const CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("NavigateCard")} style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInformation?.distance.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
          <TouchableOpacity 
          onPress={() => setSelected(item)}
          style={tw`flex-row justify-between items-center px-4 ${id === selected?.id && "bg-gray-200"}`}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD'
              }).format(
                (travelTimeInformation?.duration.value * CHARGE_RATE * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})