import CRUDService from "./crud";
class DeviceService extends CRUDService {
    constructor() {
        super("devices");
    }
    updateSamplingTime = (samplingTime) => {
        samplingTime = Number(samplingTime)
        return this.patch("/sampling-time", { samplingTime })
    }
}
export default new DeviceService();