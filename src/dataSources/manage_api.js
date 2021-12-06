const { RESTDataSource } = require("apollo-datasource-rest");

const serverConfig = require("../server");

class ManageAPI extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = serverConfig.manage_api_url;
    }

    async getAllDeliveries() {
        return await this.get("/pedidos-general");
    }

    async getDeliveries(username, filter) {
        let filtro = "filtrar=";
        if(filter == "" || filter == null) filtro = "";
        else filtro += filter;
        console.log("Mandando a:");
        console.log(this.baseURL+"/pedidos/"+username+"?"+filtro);
        return await this.get("/pedidos/"+username+"?"+filtro);
    }

    async getDelivery(deliveryId) {
        return await this.get("/pedidos/details/"+deliveryId);
    }

    async createDelivery(delivery) {
        delivery = new Object(JSON.parse(JSON.stringify(delivery)));
        return await this.post("/pedidos", delivery);
    }

    async editDelivery(delivery) {
        delivery = new Object(JSON.parse(JSON.stringify(delivery)));
        return await this.put("/pedidos/edit/"+delivery.id, delivery);
    }

    async deleteDelivery(deliveryId) {
        return await this.delete("/pedidos/delete/"+deliveryId);
    }

}

module.exports = ManageAPI;