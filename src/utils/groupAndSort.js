import moment from "moment"

export const groupAndSort = (devicesWithMeasurements) => {
    if (!devicesWithMeasurements) return []
    const groupedData = {}
    devicesWithMeasurements.forEach((device) => {
        device.measurements?.forEach((measurement) => {
            const date = moment(moment(measurement.createdAt).startOf('minute').toISOString());
            const dateTime = date.format("DD/MM/yyyy HH:mm")
            if (!groupedData[dateTime]) {
                groupedData[dateTime] = {}
                groupedData[dateTime].dateTime = dateTime
            }
            groupedData[dateTime].time = date.valueOf()
            groupedData[dateTime][device.name] = measurement.value
        })
    })
    var data = Object.keys(groupedData).map((key, i) => { return { ...groupedData[key], id: i } });
    data.sort((a, b) => a.time - b.time)
    return data
}