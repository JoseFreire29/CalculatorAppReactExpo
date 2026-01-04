import { globalStyles } from '@/styles/global-styles';
import {Pressable, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme';

interface Props{
    label: string;
    color ?: string;
    blackText ?: boolean;
    doubleSize ?: boolean;
    onPress: () => void;

}

const CalculatorButton = ({
  label, 
  color = Colors.darkGray, 
  blackText = false,
  doubleSize = false, 
  onPress}: Props) => {
  return (

    <Pressable 
    style={({pressed})=> ({
      ...globalStyles.button,
      backgroundColor: color,
      opacity: pressed ? 0.8 : 1,
      width: doubleSize ? 180 : 80,

    })} onPress={onPress}>


        <Text style={{
          ...globalStyles.buttonText,
          color: blackText ? 'black' : 'white',
        }}>{label}</Text>

    </Pressable>
  )
}

export default CalculatorButton