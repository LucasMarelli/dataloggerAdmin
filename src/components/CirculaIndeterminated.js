import React from 'react';
import { CircularProgress } from '@mui/material';


export default function CircularIndeterminate({ active = false }) {
    if (!active) return <></>
    return (
        <div style={{ position: "fixed", zIndex: 100, height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.2)", top: 0, left: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    );
}