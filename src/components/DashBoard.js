import { useContext, useEffect, useRef, useState } from "react"
import DeviceService from "../services/DeviceService";
import MyLineChart from "./LineChart";
import moment from "moment";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MeassurementsFilter from "./WhereFilter";
import MyTable from "./MyTable";
import { groupAndSort } from "../utils/groupAndSort";

export default function Dashboard() {
    const [devicesWithMeassurements, setDevicesWithMeassurements] = useState()
    const [chartData, setChartData] = useState()
    const [filter, setFilter] = useState({
        include: [{
            relation: "measurements",
            scope: {
                where: {
                    createdAt: { between: [moment().subtract(24, "h").toISOString(), moment().toISOString()] }
                }
            }
        }
        ],
    })

    useEffect(() => {
        getDevicesWithMeassurements(filter);
    }, [filter])

    useEffect(() => {
        setChartData(groupAndSort(devicesWithMeassurements));
    }, [devicesWithMeassurements])

    const handleMeassurementsFilter = (where) => {
        const filter_ = { ...filter }
        const mesurementInclude = filter_.include.find((include) => include.relation === "measurements")
        mesurementInclude.scope.where = where
        setFilter(filter_)
    }

    const getDevicesWithMeassurements = async (filter_ = {}) => {
        console.log("req filter", filter_)
        const resp = await DeviceService.get("?filter=" + JSON.stringify(filter_))
        if (!resp.hasError) {
            const devices = resp.data
            console.log(devices)
            setDevicesWithMeassurements(devices)
            return devices
        } else {
            console.error(resp)
            return null
        }
    }

    return (
        <>
            <div style={{ padding: 20 }}>
                <MeassurementsFilter onApply={handleMeassurementsFilter} />
                <MyLineChart data={chartData} devices={devicesWithMeassurements}></MyLineChart>
                <MyTable data={chartData} devices={devicesWithMeassurements}></MyTable>
            </div>
        </>
    )
}