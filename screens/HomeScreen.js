import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';

const d3 = {
  scale,
  shape,
  format,
  axis,
};

import {
    scaleTime,
    scaleLinear
} from 'd3-scale';

const height = 200;
const { width } = Dimensions.get('window');


const data = [
  { x: new Date(2020, 2, 4), y: 0 },
  { x: new Date(2020, 2, 7), y: 0 },
  { x: new Date(2020, 2, 13), y: 100 },
  { x: new Date(2020, 2, 15), y: 100 },
  { x: new Date(2020, 2, 15), y: 300 },
  { x: new Date(2020, 2, 17), y: 200 },
  { x: new Date(2020, 3, 4), y: 400 },
]

const scaleX = scaleTime().domain([new Date(2018, 10, 5)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 300]).range([height, 0]);
const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Text>Alright. Here we go.</Text>

      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
