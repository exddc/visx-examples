import { jsonList2 } from '../exampleData';
import { colors } from '../colors';

import { Axis } from '@visx/axis';
import { curveNatural } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath, AreaClosed } from '@visx/shape';
import { LinearGradient } from '@visx/gradient';

export function BasicAreaChart(props) {
    // Define the graph dimensions and margins
    const width = props.width || 800;
    const height = props.height || 500;
    const padding = 50;

    // Define the scales of the graph
    // Linear scales are used for continuous data

    // The x scale maps the x values to the width of the graph
    const xScale = scaleLinear({
        // The domain is the range of values the data can take on
        domain: [0, jsonList2.length - 1], // The first and last x values, here: from 0 to the last index of the data

        // The range is the size of the graph in pixels
        range: [padding, width - padding], // The first and last x pixels
    });

    // The y scale maps the y values to the height of the graph
    const yScale = scaleLinear({
        // The domain is the range of values the data can take on
        domain: [
            Math.min(...jsonList2.map((d) => d.y)) - 50,
            Math.max(...jsonList2.map((d) => d.y)) + 50,
        ], // The first and last y values, here: from the min y value - 50 to the max y value + 50

        // The range is the size of the graph in pixels
        range: [height - padding, padding], // The first and last y pixels
    });

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
                hideZero // Hide the zero tick
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

            {/* Define the gradient */}
            <LinearGradient
                id="fill" // The id of the gradient to be used in the fill
                from={colors.red} // The color at the start of the gradient
                to={colors.black} // The color at the end of the gradient
                fromOpacity={0.6} // The opacity at the start of the gradient
                toOpacity={0.4} // The opacity at the end of the gradient
            />

            {/* The area */}
            <AreaClosed
                data={jsonList2} // The data to be used
                yScale={yScale} // The y scale to be used
                xScale={xScale} // The x scale to be used
                x={(d) => xScale(d.x)} // The x accessor
                y={(d) => yScale(d.y)} // The y accessor
                fill="url(#fill)" // The fill of the area (the gradient)
                curve={curveNatural} // The curve of the area
            />

            {/* The line to make it look nicer */}
            <LinePath
                data={jsonList2} // The data to map to the line path
                x={(d) => xScale(d.x)} // The x position of the line path
                y={(d) => yScale(d.y)} // The y position of the line path
                stroke={colors.red} // The color of the line path
                strokeWidth={3} // The width of the line path
                curve={curveNatural} // The curve of the line path
            />
        </svg>
    );
}
