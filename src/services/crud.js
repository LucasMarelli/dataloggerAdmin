import HTTPService from "./HTTPservice";
import config from "../config";

class CRUDService extends HTTPService {
    nombreRecurso = "";

    // recibimos en el constructor el nombre de un recurso
    // representa un modelo en la api
    constructor(recurso = "") {
        super()
        this.nombreRecurso = recurso;
        this.http.defaults.baseURL = config.url + "/" + this.nombreRecurso;
    }

    async find(filter = {}) {
        return await this.get("", {
            params: {
                filter
            }
        });
    }

    async count(where = {}) {
        return await this.get("/count", {
            params: {
                where
            }
        });
    }

    async findById(id, filter) {
        return await this.get(`/${id}`, {
            params: {
                filter
            }
        })
    }

    async create(data) {
        return await this.post("", data);
    }

    async uploadFiles(file, id, propertyName = "files") {
        const formData = new FormData();
        formData.append("file", file);
        const response = await this.post("/" + id + "/" + propertyName, formData);
        return response;
    }

    async update(id, data) {
        return await this.put("/" + id, data);
    }

    async updateFields(id, data) {
        return await this.patch("/" + id, data);
    }

    async delete(id) {
        return await this.delete("/" + id);
    }

    async findLinked(modelId, targetName, filter) {
        return await this.get("/" + modelId + "/" + targetName, {
            params: {
                filter
            }
        });
    }

    async link(modelId, targetName, targetId) {
        return await this.patch("/" + modelId + "/" + targetName + "/link/" + targetId);
    }

    async unlink(modelId, targetName, targetId) {
        return await this.delete("/" + modelId + "/" + targetName + "/unlink/" + targetId);
    }

    async fetchBetweenDates(finalDay, classeId) {
        return await this.find({
            include: ["users"],
            order: ["date ASC"],
            where: {
                classeId,
                dayString: finalDay
            }
        });
    }
};

export default CRUDService;