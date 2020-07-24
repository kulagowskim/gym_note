import React, { useEffect, useState } from 'react';
import { View, Text, Button, Slider } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Brightness.requestPermissionsAsync();
      if (status === 'granted') {
        //Brightness.setSystemBrightnessAsync(1);
        Brightness.setBrightnessAsync(sliderValue)
      }
    })();
  }, [sliderValue]);

  function changeSlider(e) {
    setSliderValue(e)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text>{sliderValue}</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={0}
        value={sliderValue}
        step={0.25}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        onValueChange={e=>changeSlider(e)}
      />
    </View>
  );
}