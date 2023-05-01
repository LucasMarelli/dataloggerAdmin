import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

export default function MyTable({ data, devices }) {
    if (!data?.length) return (<div>No data</div>)
    console.log("data", data)
    const columns = devices.map((device) => {
        const headerName = `${device.name} [${device.unit}]`
        return {
            field: device.name,
            headerName,
            headerAlign: 'center',
            align: 'center',
            width: 150,
            renderHeader: (params) => (
                <strong style={{ color: device.color }}>
                    {headerName}
                </strong>

            ),
        }
    })
    columns.unshift({
        field: "dateTime", width: 150,
        headerName: "Tiempo",
        headerAlign: 'center',
        align: 'center'
    })
    return (
        <span style={{ height: 400 }}>
            <DataGrid
              localeText={{
                toolbarExportCSV: "Exportar como CSV",
                toolbarExport:"Exportar"
              }}
                density="compact"
                showCellVerticalBorder={true}
                rows={data}
                columns={columns}
                pageSize={5}
                disableRowSelectionOnClick
                rowsPerPageOptions={[5]}
                style={{ padding: 10 }}
                slots={{
                    toolbar: CustomToolbar,
                }}
            />
        </span>
    )
}

function CustomToolbar() {
    return (
        <GridToolbarContainer lang='es'>
            <GridToolbarExport
                csvOptions={
                    {
                        utf8WithBom: true,
                        fileName: "Medidas",
                        utf8WithBom: true
                    }}
                printOptions={{ disableToolbarButton: true }}
            />
        </GridToolbarContainer>
    );
}