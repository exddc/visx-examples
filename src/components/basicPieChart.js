import { pieDataSet } from '../exampleData';
import { colors, pieDataColors } from '../colors';

import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';

export function BasicPieChart(props) {
    // Define the graph dimensions
    const width = props.width || 800;
    const height = props.height || 500;
    const radius = Math.min(width, height) / 2;

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

            {/* The pie chart */}
            <Group top={height / 2} left={width / 2}>
                <Pie
                    x={width / 2} // The x position of the pie chart
                    y={height / 2} // The y position of the pie chart
                    data={pieDataSet} // The data to be displayed
                    pieValue={(d) => d.y} // The value of each data point
                    outerRadius={radius - 20} // The radius of the pie chart
                    cornerRadius={3} // The corner radius of the pie chart
                >
                    {/* The pie chart slices */}
                    {(pie) => {
                        return pie.arcs.map((arc, i) => {
                            const [centroidX, centroidY] =
                                pie.path.centroid(arc); // The x and y position of the centroid of the slice
                            const hasSpaceForLabel =
                                arc.endAngle - arc.startAngle >= 0.1; // Whether the slice has enough space for a label

                            return (
                                <g key={i}>
                                    {/* The group element for the slice */}
                                    <path
                                        d={pie.path(arc) || undefined} // The path of the slice
                                        fill={pieDataColors[arc.data.x]} // The fill color of the slice
                                        strokeWidth={0.3} // The stroke width of the slice
                                        stroke={colors.white} // The stroke color of the slice
                                    />
                                    {hasSpaceForLabel && ( // If the slice has enough space for a label
                                        <text // The text element for the label
                                            x={centroidX} // The x position of the label
                                            y={centroidY} // The y position of the label
                                            dy=".33em" // The vertical offset of the label
                                            fontSize={20} // The font size of the label
                                            fill={colors.white} // The fill color of the label
                                            textAnchor="middle" // The text anchor of the label
                                        >
                                            {
                                                // The text of the label
                                                pieDataSet.find(
                                                    (d) => d.x === arc.data.x
                                                ).x
                                            }
                                        </text>
                                    )}
                                </g>
                            );
                        });
                    }}
                </Pie>
            </Group>
        </svg>
    );
}
