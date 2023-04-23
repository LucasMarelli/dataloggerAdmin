import { Button, TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

export default function WhereFilter({ defaultWhereFilter = {}, onApply = (where) => { }, onChange = () => { } }) {
    const [where, setWhere] = useState({
        createdAt: { between: [moment().subtract(24, "h").startOf("minute").toISOString(), moment().startOf("minute").toISOString()] }
    });
    const [applyDisabled, setApplyDisabled] = useState(false);

    useEffect(() => {
        setWhere({ ...where, ...defaultWhereFilter })
    }, [])
    const handleStartDateChange = (event) => {
        const startDate = new Date(event.target.value).toISOString();
        const between = [...where.createdAt.between]
        between[0] = startDate
        console.log("between", between)
        setWhere({ ...where, createdAt: { between } })
    };
    const handleClick = () => {
        onApply(where);
        setApplyDisabled(true)
    }

    const formatDate = (date) => {
        if (!date) return
        return moment(date).format("yyyy-MM-DD[T]HH:mm")
    }

    useEffect(() => {
        onChange(where)
        setApplyDisabled(false)
    }, [where])

    const handleEndDateChange = (event) => {
        const endDate = new Date(event.target.value).toISOString();
        const between = [...where.createdAt.between]
        between[1] = endDate
        console.log("between", between)
        setWhere({ ...where, createdAt: { between } })
    };
    return (
        <div style={{ padding: 15, display: "flex", alignItems: "center" }}>
            <TextField
                label="Start date"
                type="datetime-local"
                value={formatDate(where?.createdAt?.between[0])}
                onChange={handleStartDateChange}
                style={{ marginRight: 10 }}
            />
            <TextField
                label="End date"
                type="datetime-local"
                value={formatDate(where?.createdAt?.between[1])}
                onChange={handleEndDateChange}
                style={{ marginRight: 10 }}
            />
            <Button variant="contained" disabled={applyDisabled} style={{ height: "80%" }} color="primary" onClick={handleClick}>Aplicar</Button>
        </div>
    )
}
