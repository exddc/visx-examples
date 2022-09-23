import { jsonList } from '../datasets/exampleData';

import { Axis } from '@visx/axis';
import { curveNatural } from '@visx/curve';
import { scaleLinear } from '@visx/scale';
import { LinePath } from '@visx/shape';

export function BasicLineChart() {
    const width = 800;
    const height = 500;
    const padding = 50;

    const xScale = scaleLinear({
        domain: [0, jsonList.length - 1],
        range: [padding, width - padding],
    });

    const yScale = scaleLinear({
        domain: [0, Math.max(...jsonList.map((d) => d.y)) + 5],
        range: [height - padding, padding],
    });

    const colors = {
        white: '#FBFBFB',
        black: '#1B1B1B',
        gray: '#EAEAEA',
        darkGray: '#2A2A2A',
        accent: '#D248FF',
        darkAccent: '#5E10FE',
        red: '#B80C09',
    };

    return (
        <svg width={width} height={height}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill={colors.darkGray}
                rx={14}
            />
            <Axis
                orientation="bottom"
                top={height - padding}
                scale={xScale}
                numTicks={width > 520 ? 10 : 5}
                stroke={colors.white}
                tickStroke={colors.white}
                tickLabelProps={() => ({
                    fill: colors.white,
                    fontSize: 14,
                    textAnchor: 'middle',
                    verticalAnchor: 'middle',
                })}
                hideZero
            />
            <Axis
                orientation="left"
                left={padding}
                scale={yScale}
                numTicks={height > 520 ? 10 : 5}
                stroke={colors.white}
                tickStroke={colors.white}
                tickLabelProps={() => ({
                    fill: colors.white,
                    fontSize: 14,
                    textAnchor: 'end',
                    verticalAnchor: 'middle',
                })}
                hideZero
            />
            <LinePath
                data={jsonList}
                x={(d) => xScale(d.x)}
                y={(d) => yScale(d.y)}
                stroke={colors.accent}
                strokeWidth={2}
                curve={curveNatural}
            />
        </svg>
    );
}
