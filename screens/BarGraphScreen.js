// https://medium.com/kaliop/make-your-own-svg-graph-with-react-native-svg-and-d3-js-dd0250813313
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Svg, { G, Rect, Line, Text } from 'react-native-svg';
import { svgPathProperties } from 'svg-path-properties';

// import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
// import * as format from 'd3-format';
// import * as axis from 'd3-axis';

import { scaleLinear, scalePoint } from 'd3-scale';

const GRAPH_MARGIN = 20;
const GRAPH_BAR_WIDTH = 7;
const ROUND = 100;
const UNIT = 'kn';
const colors = {
  axis: '#E5E5EA',
  bars: '#54C7FC'
};
const SVGHeight = 400;
const SVGWidth = 360;
const graphHeight = SVGHeight - 2 * GRAPH_MARGIN;
const graphWidth = SVGWidth - 2 * GRAPH_MARGIN;

const graphData = [
  { label: 'Jan', value: 200 },
  { label: 'Feb', value: 743 },
  { label: 'Mar', value: 353 },
  { label: 'Apr', value: 876 },
  { label: 'May', value: 432 },
  { label: 'Jun', value: 655 },
  { label: 'Jul', value: 62 },
  { label: 'Aug', value: 70 },
  { label: 'Sep', value: 156 },
  { label: 'Oct', value: 878 },
  { label: 'Nov', value: 656 },
  { label: 'Dec', value: 765 },
];

// x scale point
const xDomain = graphData.map(item => item.label);
const xRange = [0, graphWidth];
const x = scalePoint()
  .domain(xDomain)
  .range(xRange)
  .padding(1);

// y scale linear
const maxValue = 878;
const ceilingValue = Math.ceil(maxValue / ROUND) * ROUND;
const midValue = ceilingValue / 2;
const yDomain = [0, maxValue];
const yRange = [0, graphHeight];
const y = scaleLinear()
  .domain(yDomain)
  .range(yRange);

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <Svg width={SVGWidth} height={SVGHeight} style={{ padding: 20 }}>
        <G y={graphHeight}>

        {/* ceiling axis */}
        <Line
            x1="0"
            y1={y(ceilingValue) * -1 + 10}
            x2={graphWidth}
            y2={y(ceilingValue) * -1 + 10}
            stroke={colors.axis}
            strokeWidth="0.5"
          />

        {/* mid axis */}
          <Line
            x1="0"
            y1={y(midValue) * -1}
            x2={graphWidth}
            y2={y(midValue) * -1}
            stroke={colors.axis}
            strokeWidth="0.5"
          />

        {/* bottom axis */}
          <Line
            x1="0"
            y1="2"
            x2={graphWidth}
            y2="2"
            stroke={colors.axis}
            strokeWidth="0.5"
          />

        <Text
          x={graphWidth}
          y={y(ceilingValue) * -1 + 20}
          textAnchor="end"
          fontSize={12}
          fill="black"
          fillOpacity={0.3}
        >
          {`${ceilingValue}${UNIT}`}
        </Text>

        {/* bars */}
        {graphData.map(item => (
          <Rect
            key={`bar-${item.label}`}
            x={x(item.label) - (GRAPH_BAR_WIDTH / 2)}
            y={y(item.value) * -1}
            rx={2.5}
            width={GRAPH_BAR_WIDTH}
            height={y(item.value)}
            fill={colors.bars}
          />
        ))}

        {/* keys */}
        {graphData.map(item => (
          <Text
            key={`label-${item.label}`}
            fontSize={8}
            x={x(item.label)}
            y={10}
            textAnchor="middle"
            fillOpacity={0.4}
          >
            {item.label}
          </Text>
        ))}

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
    justifyContent: 'flex-start',
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
