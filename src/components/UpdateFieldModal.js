import { Label } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../App";

/**
 * @param {object} obj
 * @param {'button'| 'checkbox'| 'color'| 'date'| 'datetime-local'| 'email'| 'file'| 'hidden'| 'image'| 'month'| 'number'| 'password'| 'radio'| 'range'| 'reset'| 'search'| 'submit'| 'tel'| 'text'| 'time'| 'url'| 'week'} obj.type 
 * @returns 
 */
export default function UpdateFieldModal({ open, onAccept = () => { }, onCancel = () => { }, title = "", fieldName = "", type = "" }) {
    const [value, setValue] = useState("")
    const { setIsLoading } = useContext(AppContext);


    const onAccept_ = async (event) => {
        try {
            setIsLoading(true)
            await onAccept(value);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    const onCancel_ = () => {
        setValue("");
        onCancel();
    }
    if (!open) return <></>
    return (
        <>
            <div style={{
                position: "absolute",
                width: "30vw",
                height: "30",
                backgroundColor: "#f7f7f7",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 40,
                boxShadow: "13px 9px 35px -8px rgba(0,0,0,0.76)"
            }}>
                <h3>{title}</h3>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <span >
                        <div style={{ margin: 10, fontWeight: "bold", color: "gray" }}>{fieldName}</div>
                    </span>
                    <span>
                        <TextField type={type} style={{ margin: 10 }} onChange={(event) => setValue(event.target.value)} value={value}></TextField>
                    </span>
                </div>
                <div style={{ margin: 30, display: "flex", justifyContent: "space-around", width: "70%" }}>
                    <Button onClick={onAccept_} disabled={!value} variant="contained">Aceptar</Button>
                    <Button onClick={onCancel_} variant="contained">Cancelar</Button>
                </div>
            </div>
        </>
    )
}