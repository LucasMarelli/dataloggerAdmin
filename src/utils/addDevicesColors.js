const colors = ["#8884d8", "#82ca9d", "#d45087", "#47bac1",
    "#e27c3e", "#8d62a9", "#ff9f40", "#6e5687", "#52b6ca", "#ffc658"];
export default function addDevicesColors(devices) {
    devices.forEach((device, i) => {
        device.color = colors[i]
    })
    return devices
}