import {Blockchain} from 'ft3-lib';
import DirectoryServiceUtil from "./directory-service-util";

require('dotenv').config();

export default class BlockchainUtil {
    static async getDefaultBlockchain(): Promise<Blockchain> {
        return await Blockchain.initialize(
            Buffer.from(process.env.REACT_APP_BLOCKCHAIN_RID, 'hex'),
            DirectoryServiceUtil.getDefaultDirectoryService()
        )
    }
}