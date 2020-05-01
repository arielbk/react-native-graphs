// https://medium.com/kaliop/make-your-own-svg-graph-with-react-native-svg-and-d3-js-dd0250813313
import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Svg, { G, Rect, Line } from 'react-native-svg';
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

const GRAPH_MARGIN = 20;
const colors = {
  avis: '#e4e4e4',
}

export default function HomeScreen() {
  const SVGHeight = 300;
  const SVGWidth = 300;
  const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
  const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

  return (
    <View style={styles.container}>
      <Text>
        Bar graph
      </Text>
      <Svg width={SVGWidth} height={SVGHeight}>
      {/* translate for 'graphHeight' on y axis */}
        <G y={graphHeight}>
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />
        </G>
      </Svg>
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
