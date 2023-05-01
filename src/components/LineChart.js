import moment from "moment/moment";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ScatterChart, Scatter, ResponsiveContainer, Brush, ReferenceArea } from "recharts";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
export default function MyLineChart({ data, devices }) {
    // if (!data?.length) return (<div>No data</div>)
    const [xDomain, setXdomain] = useState(["auto", "auto"])
    const [refArea, setRefArea] = useState([0, 0])
    const [isZoomed, setIsZoomed] = useState(false)
    const zoom = () => {
        console.log("refArea", refArea)
        if (refArea[0] === refArea[1] || !refArea[1]) {
            setRefArea([0, 0])
            return;
        }
        if (refArea[0] > refArea[1]) {
            setXdomain([refArea[1], refArea[0]])
        } else {
            setXdomain([refArea[0], refArea[1]])
        }
        setIsZoomed(true)
        setRefArea([0, 0])

    }

    const zoomOut = () => {
        setXdomain(["auto", "auto"])
        setRefArea([0, 0])
        setIsZoomed(false)
    }

    return (
        <>
            <div style={{ width: '100vw', height: 600 }}>
                {isZoomed ?
                    <span style={{ position: "absolute", right: "10vw", cursor: "pointer", zIndex: 100 }} onClick={zoomOut}>
                        <ZoomOutIcon color="primary" />
                    </span>
                    : null}
                <ResponsiveContainer >
                    <LineChart width={10} height={10} data={data}
                        margin={{ bottom: 100, right: 80 }}
                        onMouseDown={(e) => {
                            if (e?.activeLabel) setRefArea([e.activeLabel, refArea[1]])
                        }}
                        onMouseMove={(e) => {
                            if (refArea[0] && e?.activeLabel) setRefArea([refArea[0], e.activeLabel])
                        }}
                        onMouseUp={zoom}

                    >
                        <Legend verticalAlign="top" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" scale={"time"} angle={45} fontSize={15} textAnchor="bottom" domain={xDomain} allowDataOverflow tickFormatter={(value) => moment(value).format("DD/MM/yy HH:mm")} />
                        <YAxis type="number" domain={[0, "auto"]} allowDataOverflow />
                        <Tooltip content={CustomTooltip} />
                        {devices?.map((d, index) => <Line type={"monotone"} key={index} name={d.name} dataKey={d.name} stroke={d.color} />)}
                        <ReferenceArea
                            x1={refArea[0]}
                            x2={refArea[1]}
                            strokeOpacity={0.3}
                        />
                        {/* <Brush
                            dataKey="time"
                            tickFormatter={(value) => moment(value).format("DD/MM/yy HH:mm")}
                        /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
const CustomTooltip = (props) => {
    const { active, payload, label } = props
    if (active && payload && payload.length) {
        return (
            <div style={{ padding: 5, backgroundColor: "rgb(0,0,0,0.1)", borderRadius: 20 }}>
                <p>{`${payload[0].payload.dateTime}`}</p>
                {payload.map((p, i) => (<div key={i}>
                    <p><span style={{ color: p.color }}>{p.name + ": "}</span>{`${p.payload[p.name]}`}</p>
                </div>))}

                <p ></p>
            </div>
        );
    }

    return null;
};
const colors = ["#8884d8", "#82ca9d", "#d45087", "#47bac1",
    "#e27c3e", "#8d62a9", "#ff9f40", "#6e5687", "#52b6ca", "#ffc658"];

