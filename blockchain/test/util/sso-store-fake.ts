import SSOStore from "../../client/lib/ft3/user/sso/sso-store";
import KeyPair from "../../client/lib/cyptoUtils/keyPair";

export default class SSOStoreFake implements SSOStore {
    accountId: Buffer;
    tmpKeyPair: KeyPair;
    keyPair: KeyPair;
    tmpPrivKey: Buffer;
    privKey: Buffer;
    clear() {}
    clearTmp() {}
}