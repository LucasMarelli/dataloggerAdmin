import moment from "moment"

export const groupAndSort = (devicesWithMeasurements) => {
    if (!devicesWithMeasurements) return []
    const groupedData = {}
    devicesWithMeasurements.forEach((device) => {
        device.measurements?.forEach((measurement) => {
            measurement.dateTime = moment(measurement.createdAt).format("DD/MM/yyyy HH:mm")
            measurement.time = moment(measurement.createdAt).valueOf()
            if (!groupedData[measurement.dateTime]) {
                groupedData[measurement.dateTime] = {}
                groupedData[measurement.dateTime].dateTime = measurement.dateTime
            }
            groupedData[measurement.dateTime].time = moment(measurement.createdAt).valueOf()
            groupedData[measurement.dateTime][device.name] = measurement.value
        })
    })
    var data = Object.keys(groupedData).map((key, i) => { return { ...groupedData[key], id: i } });
    return data.sort((a, b) => a.time - b.time)
}