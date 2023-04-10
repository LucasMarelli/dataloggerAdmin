import { useEffect, useState } from "react";
import DeviceService from "../services/DeviceService";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
export default function Devices() {
    const [devices, setDevices] = useState([])
    useEffect(() => {
        (async () => {
            const devices_ = (await DeviceService.find())?.data;
            console.log(devices_)
            if (devices_) setDevices(devices_)
        })()
    }, [])
    const editNameHandler = async (device) => {
        window.alert(`Nombre: ${device.name}.  No implentado`)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>MQTT Id</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Última conexión</TableCell>
                            <TableCell align="center">Última desconexión</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow
                                key={device.mqttId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{device.mqttId} </TableCell>
                                <TableCell align="center" style={{ display: "flex", justifyContent: "center" }}>
                                    <span>{device.name}</span>
                                    <EditIcon onClick={() => editNameHandler(device)} style={{ fontSize: 15, marginLeft: 5, cursor: "pointer" }} />
                                </TableCell>
                                <TableCell align="center">{device.status}</TableCell>
                                <TableCell align="center">{device.lastConnection}</TableCell>
                                <TableCell align="center">{device.lastDisconnection}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* {
                devices?.map((device) => {
                    return (
                        <div>
                            <span style={{ margin: 10 }}>{device.name}</span>
                            <span style={{ margin: 10 }}>{device.mqttId}</span>
                            <span style={{ margin: 10 }}>{device.status}</span>
                        </div>)
                })
            } */}
        </>)
}