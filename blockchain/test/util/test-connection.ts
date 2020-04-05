import ConnectionClient from "../../client/lib/ft3/core/connection-client";
require('dotenv').config();

//TODO: remove TestConnection class and replace it connection util class
// which creates an instance of ConnectionClient
class TestConnection extends ConnectionClient {
    constructor() {
        super('http://localhost:7740/', process.env.CHAIN_ID);
    }

    static connection() {
        return new ConnectionClient('http://localhost:7740/', process.env.CHAIN_ID);
    }
}

export default TestConnection;