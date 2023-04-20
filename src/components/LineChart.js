import moment from "moment/moment";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip, ScatterChart, Scatter, ResponsiveContainer } from "recharts";

export default function MyLineChart() {

    return (
        <>
            <div style={{ width: '100%', height: 400, marginTop: 40, }}>
                <ResponsiveContainer >
                    <LineChart width={730} height={250}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" scale={"time"}  domain={['auto', 'auto']} tickFormatter={(value) => moment(value).format("DD/MM/yy hh:mm")} />
                        <YAxis type="number" dataKey="value" domain={[0, "auto"]} />
                        <Tooltip />
                        <Legend />
                        {data.map((d, index) => <Line key={index} name={d.name} dataKey={"value"} stroke={colors[index]} data={d.values} />)}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    )
}
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d45087", "#47bac1",
    "#e27c3e", "#8d62a9", "#ff9f40", "#6e5687", "#52b6ca"];
const data1 = {
    name: "T1",
    values: [
        { time: new Date(2022, 0, 1, 0).getTime(), value: 22 },
        { time: new Date(2022, 0, 1, 1).getTime(), value: 23 },
        { time: new Date(2022, 0, 1, 2).getTime(), value: 24 },
        { time: new Date(2022, 0, 1, 3).getTime(), value: 25 },
        { time: new Date(2022, 0, 1, 4).getTime(), value: 26 },
        { time: new Date(2022, 0, 1, 5).getTime(), value: 27 },
        { time: new Date(2022, 0, 1, 6).getTime(), value: 28 },
    ]
}

const data2 = {
    name: "T2",
    values: [
        { time: new Date(2022, 0, 1, 0).getTime(), value: 20 },
        { time: new Date(2022, 0, 1, 1).getTime(), value: 21 },
        { time: new Date(2022, 0, 1, 2).getTime(), value: 22 },
        { time: new Date(2022, 0, 1, 3).getTime(), value: 23 },
        { time: new Date(2022, 0, 1, 4).getTime(), value: 24 },
        { time: new Date(2022, 0, 1, 5).getTime(), value: 25 },
        { time: new Date(2022, 0, 1, 6).getTime(), value: 26 },
    ]
}
const data = [data1, data2]
