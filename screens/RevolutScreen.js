// https://youtu.be/9Yh5AV9eNKk
import * as React from 'react';
import { Image, Platform, StyleSheet, View, Dimensions, Animated, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Svg, { Path, LinearGradient, Defs, Stop } from 'react-native-svg';
import { svgPathProperties } from 'svg-path-properties';

// import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
// import * as format from 'd3-format';
// import * as axis from 'd3-axis';

import {
  scaleTime,
  scaleLinear,
  scaleQuantile,
} from 'd3-scale';

const d3 = {
  // scale,
  shape,
  // format,
  // axis,
};

const height = 300;
const { width } = Dimensions.get('window');
const verticalPadding = 80;
const cursorRadius = 10;
const labelWidth = 100;

const data = [
  { x: new Date(2020, 2, 4), y: 0 },
  { x: new Date(2020, 2, 6), y: 0 },
  { x: new Date(2020, 2, 7), y: 100 },
  { x: new Date(2020, 2, 13), y: 100 },
  { x: new Date(2020, 2, 15), y: 200 },
  { x: new Date(2020, 2, 17), y: 300 },
  { x: new Date(2020, 2, 21), y: 400 },
]

const scaleX = scaleTime().domain([new Date(2020, 2, 4), new Date(2020, 2, 21)]).range([0, width]);
const scaleY = scaleLinear().domain([0, 400]).range([height - verticalPadding, verticalPadding]); 
const scaleLabel = scaleQuantile().domain([0, 400]).range([0, 100, 200, 300, 400]);
const line = d3.shape.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y))
  .curve(d3.shape.curveBasis)(data);
const properties = new svgPathProperties(line);
const lineLength = properties.getTotalLength();

export default function HomeScreen() {
  const [x, setX] = React.useState(new Animated.Value(0));
  const cursor = React.useRef();
  const label = React.useRef();

  const translateX = x.interpolate({
    inputRange: [0, lineLength],
    outputRange: [width - labelWidth, 0],
    extrapolate: 'clamp',
  })

  const moveCursor = value => {
    const {x, y} = properties.getPointAtLength(lineLength - value);
    cursor.current.setNativeProps({ top: y - cursorRadius, left: x - cursorRadius });
    const labelText = scaleLabel(scaleY.invert(y));
    label.current.setNativeProps({ text: `${labelText} NZD` })
  }

  React.useEffect(() => {
    x.addListener(({ value }) => moveCursor(value));
    moveCursor(lineLength);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Svg {...{ width, height }}>
          <Defs>
            <LinearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient">
              <Stop stopColor="#CDE3F8" offset="0%" />
              <Stop stopColor="#eef6fd" offset="80%" />
              <Stop stopColor="#FFFFFF" offset="100%" />
            </LinearGradient>
          </Defs>
          <Path d={line} fill="transparent" stroke="#367be2" strokeWidth="5"/>
          <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill="url(#gradient)" />
          <View ref={cursor} style={styles.cursor} />
        </Svg>
        <Animated.View style={styles.label} style={[ styles.label, { transform: [{ translateX }]}]}>
          <TextInput ref={label} />
        </Animated.View>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        />

      </View>
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
  cursor: {
    width: cursorRadius * 2,
    height: cursorRadius * 2,
    borderRadius: cursorRadius,
    borderColor: '#367be2',
    borderWidth: 3,
    backgroundColor: '#fff',
  },
  label: {
    position: 'absolute',
    top: 20,
    left: 0,
    padding: 10,
    backgroundColor: '#fff',
    width: labelWidth,
  }
});
