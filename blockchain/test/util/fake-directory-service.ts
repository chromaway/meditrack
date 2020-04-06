import { DirectoryService } from "ft3-lib";
import { ChainConnectionInfo } from "ft3-lib";

export default class FakeDirectoryService implements DirectoryService {
    private readonly chainInfos: ChainConnectionInfo[];

    constructor(chainInfos: ChainConnectionInfo[]) {
        this.chainInfos = chainInfos;
    }

    async getChainConnectionInfo(id: Buffer): Promise<ChainConnectionInfo | null> {
        return this.chainInfos.find(info => info.chainId.toString('hex') === id.toString('hex'));
    }

}