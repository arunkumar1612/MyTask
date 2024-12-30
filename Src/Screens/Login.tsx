import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { GetAllFunds, increment } from '../redux/features/CounterSlice'

export default function Login(props: { navigation: any }) {
 
  const moveToScreen =()=>{
   props.navigation.navigate("Home")
  }

 
 
  const {value} = useSelector((state: RootState) => state.counter)
  const dispatch = useDispatch<AppDispatch>();

  const callApi=()=>{
    dispatch(GetAllFunds())
  }
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>{value}</Text>

      <TouchableOpacity onPress={()=>dispatch(increment())}>
      <Text>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>moveToScreen()}>
      <Text>Next Screen</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>callApi()}>
      <Text>API call</Text>
      </TouchableOpacity>
    </View>
  )
}