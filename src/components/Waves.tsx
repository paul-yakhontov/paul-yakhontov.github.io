import React from "react";
import Wave from "react-wavify";


export const Waves = () => {
    const wavePos1: React.CSSProperties = {
        position: "fixed",
        zIndex: 1,
        bottom: "40vh",
        width: "100%"
    };

    const wavePos2: React.CSSProperties = {
        position: "fixed",
        zIndex: 1,
        bottom: "24vh",
        width: "100%"
    };

    const wavePos3: React.CSSProperties = {
        position: "fixed",
        zIndex: 1,
        bottom: "10vh",
        width: "100%"
    };

    const wavePos4: React.CSSProperties = {
        position: "fixed",
        zIndex: 1,
        bottom: "-6vh",
        width: "100%"
    };

    var pauseStatus = false;

    return (
        <div>
            <div style={wavePos1}>
                <Wave
                    fill="#ac76ff"
                    paused={pauseStatus}
                    options={{
                        height: 0,
                        amplitude: 5,
                        speed: 0.5,
                        points: 4
                    }}
                />
            </div>
            <div style={wavePos2}>
                <Wave
                    fill="#a164ff"
                    paused={pauseStatus}
                    options={{
                        height: 0,
                        amplitude: 5,
                        speed: 0.3,
                        points: 5
                    }}
                />
            </div>
            <div style={wavePos3}>
                <Wave
                    fill="#9550ff"
                    paused={pauseStatus}
                    options={{
                        height: 0,
                        amplitude: 10,
                        speed: 0.3,
                        points: 3
                    }}
                />
            </div>
            <div style={wavePos4}>
                <Wave
                    fill="#883aff"
                    paused={pauseStatus}
                    options={{
                        height: 0,
                        amplitude: 10,
                        speed: 0.3,
                        points: 4
                    }}
                />
            </div>
        </div>
    )
}