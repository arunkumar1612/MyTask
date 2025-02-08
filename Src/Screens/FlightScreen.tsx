import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LeafletView } from 'react-native-leaflet-maps';

const AirplaneRouteMap = () => {
    
  const chennai = { lat: 13.0827, lng: 80.2707 };
  const bangalore = { lat: 12.9716, lng: 77.5946 };

  return (
    <View style={styles.container}>
      <LeafletView
        mapCenterPosition={chennai}
        zoom={6}
        mapLayers={[
          {
            baseLayerName: 'OpenStreetMap',
            baseLayerIsChecked: true,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          },
        ]}
        mapMarkers={[
          {
            position: chennai,
            icon: '✈️',
            size: [32, 32],
          },
          {
            position: bangalore,
            icon: '📍',
            size: [32, 32],
          },
        ]}
        mapShapes={[
          {
            shapeType:"Polyline",
            color: 'blue',
            positions: [chennai, bangalore],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AirplaneRouteMap;
