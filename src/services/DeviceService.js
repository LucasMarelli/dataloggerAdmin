import CRUDService from "./crud";
class DeviceService extends CRUDService {
    constructor() {
        super("devices");
    }

}
export default new DeviceService();