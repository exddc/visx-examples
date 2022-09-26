import { jsonList } from '../exampleData';
import { colors } from '../colors';

import { Axis } from '@visx/axis';
import { scaleLinear, scaleBand } from '@visx/scale';
import { Bar } from '@visx/shape';

export function BasicBarChart(props) {
    // Define the graph dimensions and margins
    const width = props.width || 800;
    const height = props.height || 500;
    const padding = 50;

    // Define the scales of the graph
    // Linear scales are used for continuous data
    // Band scales are used for discrete data

    // The x scale maps the x values to the width of the graph
    const xScale = scaleBand({
        range: [padding, width - padding], // The first and last x pixels
        domain: jsonList.map((d) => d.x), // The x values
        padding: 0.2, // The padding between the bars
    });

    // The y scale maps the y values to the height of the graph
    const yScale = scaleLinear({
        // The domain is the range of values the data can take on
        domain: [0, Math.max(...jsonList.map((d) => d.y)) + 5], // The first and last y values, here: from 0 to the max y value + 5

        // The range is the size of the graph in pixels
        range: [height - padding, padding], // The first and last y pixels
    });

    // Compose together the scale and accessor functions to get point functions
    // The point functions are used to map the data to the graph
    const compose = (scale, accessor) => (jsonList) =>
        scale(accessor(jsonList));
    const xPoint = compose(xScale, (d) => d.x);
    const yPoint = compose(yScale, (d) => d.y);

    return (
        // The svg element is the root of the graph
        <svg width={width} height={height}>
            {/* The background of the graph */}
            <rect
                x={0} // The x position of the rectangle
                y={0} // The y position of the rectangle
                width={width} // The width of the rectangle
                height={height} // The height of the rectangle
                fill={colors.darkGray} // The fill color of the rectangle
                rx={14} // rounded corners
            />

            {/* The x axis */}
            <Axis
                orientation="bottom" // The orientation of the axis
                top={height - padding} // The y position of the axis
                scale={xScale} // The scale of the axis
                numTicks={width > 520 ? 10 : 5} // The number of ticks on the axis
                stroke={colors.white} // The color of the axis
                tickStroke={colors.white} // The color of the ticks
                tickLabelProps={() =>
                    // The style of the tick labels
                    ({
                        fill: colors.white, // The color of the tick labels
                        fontSize: 14, // The font size of the tick labels
                        textAnchor: 'middle', // The text anchor of the tick labels
                        verticalAnchor: 'middle', // The vertical anchor of the tick labels
                    })
                }
            />

            {/* The y axis */}
            <Axis
                orientation="left" // The orientation of the axis
                left={padding} // The x position of the axis
                scale={yScale} // The scale of the axis
                numTicks={height > 520 ? 10 : 5} // The number of ticks on the axis
                stroke={colors.white} // The color of the axis
                tickStroke={colors.white} // The color of the ticks
                tickLabelProps={() =>
                    // The style of the tick labels
                    ({
                        fill: colors.white, // The color of the tick labels
                        fontSize: 14, // The font size of the tick labels
                        textAnchor: 'end', // The text anchor of the tick labels
                        verticalAnchor: 'middle', // The vertical anchor of the tick labels
                    })
                }
                hideZero // Hide the zero tick
            />

            {/* The bars */}
            {jsonList.map((d, i) => {
                // Define the height of the bar
                const barHeight = height - padding * 2 - yPoint(d);
                return (
                    <Bar
                        x={xPoint(d)} // The x position of the bar
                        y={height - padding * 2 - barHeight} // The y position of the bar
                        height={barHeight} // The height of the bar
                        width={xScale.bandwidth()} // The width of the bar
                        fill={colors.green} // The fill color of the bar
                    />
                );
            })}
        </svg>
    );
}
