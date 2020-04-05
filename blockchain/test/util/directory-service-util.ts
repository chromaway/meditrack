import { DirectoryService } from "ft3-lib";
import FakeDirectoryService from "./fake-directory-service";
import {ChainConnectionInfo} from "ft3-lib";

export default class DirectoryServiceUtil {
    static getDefaultDirectoryService(): DirectoryService {
        return new FakeDirectoryService([
            new ChainConnectionInfo(
                Buffer.from(process.env.REACT_APP_BLOCKCHAIN_RID, 'hex'),
                process.env.REACT_APP_NODE_ADDRESS
            )
        ]);
    }
}