import React from "react";
import Wave from "react-wavify";

const wavesContainer: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
}

function generateGradientColors(num: number, baseColor: string): string[] {
    const colors: string[] = [baseColor];

    const hexToRGB = (hex: string): number[] =>
        hex
            .replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`)
            .substring(1)
            .match(/.{2}/g)!
            .map((x) => parseInt(x, 16));

    const RGBToHex = (r: number, g: number, b: number): string =>
        `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;

    const lightenColor = (color: string, percentage: number): string => {
        const [r, g, b] = hexToRGB(color);
        const newR = Math.round(r + ((255 - r) * percentage) / 100);
        const newG = Math.round(g + ((255 - g) * percentage) / 100);
        const newB = Math.round(b + ((255 - b) * percentage) / 100);
        return RGBToHex(newR, newG, newB);
    };

    const percentageStep = 8;

    for (let i = 1; i <= num; i++) {
        const previousColor = colors[i - 1];
        const nextColor = lightenColor(previousColor, percentageStep);
        colors.push(nextColor);
    }

    return colors;
}


export const Waves = () => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [colors, setColors] = React.useState<string[] | null>(null);

    var pauseStatus = false;

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            setColors(generateGradientColors(containerRef.current.clientHeight / 120, '#883aff'));
        }
    }, []);

    return (
        <div ref={containerRef} style={wavesContainer}>
            {colors && colors.map((color, index) => (
                <div
                    key={color}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: index * 100,
                        overflow: 'visible'
                    }}>
                    <Wave
                        fill={color}
                        paused={pauseStatus}
                        options={{
                            height: 20,
                            amplitude: 5,
                            speed: 0.5,
                            points: 4
                        }}
                    />
                </div>
            ))
            }
        </div>
    )
}