import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { SearchUser, setLoading, setPage } from '../redux/features/LoginSlice'

const Home = () => {
  const { page, data, isLoading } = useSelector((state: RootState) => state.login)
  const dispatch = useDispatch<AppDispatch>();


  const renderData = ({ item }: any) => {
    return (
      <View>
        <View style={{
          flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10, flex: 1,
          padding: 10
        }}>
          <Image source={{ uri: item.avatar_url }} style={{ width: 65, height: 65,borderRadius:50}} />
          <Text style={{ fontSize: 16, color: 'grey' }}>{item.login}</Text>
          <Text style={{ fontSize: 16, color: 'grey' }}>{item.type}</Text>
        </View>
      </View>
    )
  }
  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator style={{ marginVertical: 10 }} />;
  };

  const loadMoreData = async () => {
    if (!isLoading) {
      dispatch(setLoading(true))
      dispatch(setPage())
      await dispatch(SearchUser())
    }
  };

  return (
    <View>
      <View style={{
        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 10,
        marginTop: 10, marginLeft: 10, marginRight: 10
      }}>

        <Text style={{ fontSize: 18, fontWeight: '900' }}>Image</Text>
        <Text style={{ fontSize: 18, fontWeight: '900' }}>Name</Text>
        <Text style={{ fontSize: 18, fontWeight: '900' }}>Type</Text>
      </View>
      <View style={{ marginTop: 5, backgroundColor: 'black', height: 1, width: '100%' }} />
      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        renderItem={renderData}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
      />
    </View>
  )
}

export default Home