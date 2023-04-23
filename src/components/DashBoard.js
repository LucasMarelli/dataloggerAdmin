import { useEffect, useState } from "react"
import DeviceService from "../services/DeviceService";
import MyLineChart from "./LineChart";
import moment from "moment";

export default function Dashboard() {
    const [devicesWithMeassurements, setDevicesWithMeassurements] = useState()
    useEffect(() => {
        getDevicesWithMeassurements();
    }, [])

    const getDevicesWithMeassurements = async () => {
        const filter = {
            include: [{
                relation: "measurements",
                scope: {
                    where: {
                        createdAt: { between: [moment().subtract(24, "h").toISOString(), moment().toISOString()] }
                    }
                }
            }
            ],
        }
        const resp = await DeviceService.get("?filter=" + JSON.stringify(filter))
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
            <MyLineChart data={devicesWithMeassurements}></MyLineChart>
        </>
    )
}