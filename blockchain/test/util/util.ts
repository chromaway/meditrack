import { util, gtv } from "postchain-client";

function generateNumber(max: number = 10000): number {
    return Math.round(Math.random()*max)
}

function generateAssetName(prefix: string = 'CHROMA'): string {
    return prefix + '_' + generateNumber();
}

function generateId() {
    return util.hash256(`${generateNumber()}`);
}

function blockchainAccountId(chainId: Buffer) {
    return gtv.gtvHash(['B', chainId]);
}

export {
    generateAssetName,
    generateId,
    blockchainAccountId,
}