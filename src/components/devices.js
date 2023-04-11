import { useEffect, useRef, useState } from "react";
import DeviceService from "../services/DeviceService";
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import UpdateFieldModal from "./UpdateFieldModal";
export default function Devices() {
    const [devices, setDevices] = useState([])
    const [openFieldModal, setOpenFieldModal] = useState(false)
    const [updateFieldModalData, setUpdateFieldModalData] = useState({ onAccept: () => { }, onCancel: () => { }, fieldName: "", type: "text" })
    const updateFunction = (deviceId, fieldName) => {
        return async (value) => await DeviceService.updateFields(deviceId, { [fieldName]: value })
    }
    useEffect(() => {
        fetchAndSet()
    }, [])
    const fetchAndSet = async () => {
        const devices_ = (await DeviceService.find())?.data;
        console.log(devices_)
        if (devices_) setDevices(devices_)
    }
    /**
     * 
     * @param {*} id 
     * @param {*} fieldToUpdate 
     * @param {*} fieldName 
     * @param {'button'| 'checkbox'| 'color'| 'date'| 'datetime-local'| 'email'| 'file'| 'hidden'| 'image'| 'month'| 'number'| 'password'| 'radio'| 'range'| 'reset'| 'search'| 'submit'| 'tel'| 'text'| 'time'| 'url'| 'week'} type  
     */
    const editModalHandler = async (id, fieldToUpdate, fieldName, type = "text") => {
        setOpenFieldModal(true);
        setUpdateFieldModalData({
            fieldName: fieldName,
            type: type,
            onAccept: async (value) => {
                const resp = await DeviceService.updateFields(id, { [fieldToUpdate]: value })
                if (!resp.hasError) fetchAndSet()
                setOpenFieldModal(false);
            }
        })
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>MQTT ID</TableCell>
                            <TableCell align="center">Nombre</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Unidad</TableCell>
                            <TableCell align="center">Intervalo de muestreo</TableCell>
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
                                    <EditIcon onClick={() => editModalHandler(device.id, "name", "Nombre")} style={{ fontSize: 15, marginLeft: 5, cursor: "pointer" }} />
                                </TableCell>
                                <TableCell style={{ color: device?.status === "not_connected" ? "red" : "green", fontWeight: "bold" }} align="center">{device.status}</TableCell>
                                <TableCell align="center">
                                    <span>{device.unit}</span>
                                    <EditIcon onClick={() => editModalHandler(device.id, "unit", "Unidad")} style={{ fontSize: 15, marginLeft: 5, cursor: "pointer" }} />
                                </TableCell>
                                <TableCell align="center">
                                    <span>{device.samplingTime}</span>
                                    <EditIcon onClick={() => editModalHandler(device.id, "samplingTime", "Intervalo de muestreo", "number")} style={{ fontSize: 15, marginLeft: 5, cursor: "pointer" }} />
                                </TableCell>
                                <TableCell align="center">{device.lastConnection}</TableCell>
                                <TableCell align="center">{device.lastDisconnection}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateFieldModal open={openFieldModal} title="Modificar Campo" onCancel={() => setOpenFieldModal(false)} {...updateFieldModalData} ></UpdateFieldModal>
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