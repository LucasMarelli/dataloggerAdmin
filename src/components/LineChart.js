import moment from "moment/moment";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ScatterChart, Scatter, ResponsiveContainer } from "recharts";

export default function MyLineChart({ data, devices }) {
    // if (!data?.length) return (<div>No data</div>)
    return (
        <>
            <div style={{ width: '100%', height: 600 }}>
                <ResponsiveContainer >
                    <LineChart width={10} height={10} data={data}
                        margin={{ bottom: 100 ,right:80}}>
                        <Legend verticalAlign="top" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" scale={"time"} angle={45} fontSize={15} textAnchor="bottom" domain={['auto', 'auto']} tickFormatter={(value) => moment(value).format("DD/MM/yy HH:mm")} />
                        <YAxis type="number" domain={[0, "auto"]} />
                        <Tooltip content={CustomTooltip} />
                        {devices?.map((d, index) => <Line key={index} name={d.name} dataKey={d.name} stroke={d.color} />)}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
const CustomTooltip = (props) => {
    const { active, payload, label } = props
    console.log(props)
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

