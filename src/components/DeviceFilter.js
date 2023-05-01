import { Button, Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import SensorsIcon from '@mui/icons-material/Sensors';
import MenuIcon from '@mui/icons-material/Menu';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
export default function DeviceFilter({ devices, onChange = (where) => { } }) {
    const [selection, setSelection] = useState([])
    const [open, setOpen] = useState(false)
    const columns = [{
        field: "name",
        headerName: "Todos",
        width: 180,
    }]
    const onSelectionChange = (ids) => {
        const where = { id: { inq: ids } }
        console.log("ids", ids)
        setSelection(ids)
        onChange(where)
    }
    useEffect(() => {
        const ids = devices?.map((device) => device.id)
        console.log("useEfect", devices, ids)
        setSelection(ids)
    }, [devices])
    if (!devices?.length) return
    return (
        <div style={{ zIndex: 100, marginTop: "1rem" }}>
            <span onClick={() => setOpen(!open)}>
                {
                    selection?.length !== devices?.length ?
                        < FilterAltIcon color="primary" style={{ fontSize: "2rem", cursor: "pointer", position: "absolute" }} />
                        : <FilterAltOutlinedIcon color="primary" style={{ fontSize: "2rem", cursor: "pointer", position: "absolute" }} />
                }
            </span>
            {open ?
                <span style={{ backgroundColor: "whitesmoke", position: "absolute", marginTop: "2em" }}>
                    <DataGrid
                        density="compact"
                        rows={devices}
                        columns={columns}
                        checkboxSelection
                        pagination={false}
                        hideFooterPagination={true}
                        hideFooter={true}
                        onRowSelectionModelChange={onSelectionChange}
                        rowSelectionModel={selection}
                    />
                </span>
                : null
            }
        </div>
    )
}

{/* <FormGroup style={{ display: "flex", alignItems: "start" }}>
<FormControlLabel control={<Checkbox defaultChecked size="small" />} label={<div style={{ fontSize: 15 }}>Dipositivos</div>} />
<Divider style={{ color: "red" }} />
{devices?.map((device) => <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{
    color: device.color,
    '&.Mui-checked': {
        color: device.color,
    },
}} />} label={<div style={{ color: device.color, fontSize: 15 }}>{device.name}</div>} />)}
</FormGroup> */}