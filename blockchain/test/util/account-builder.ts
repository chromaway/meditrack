import { Account, FlagsType } from "ft3-lib";
import {KeyPair} from "ft3-lib";
import {Asset} from "ft3-lib";
import {User} from "ft3-lib";
import {SingleSignatureAuthDescriptor} from "ft3-lib";
import {MultiSignatureAuthDescriptor} from "ft3-lib";
import {AssetBalance} from "ft3-lib";
import {Blockchain} from "ft3-lib";
import {RateLimit} from "ft3-lib";

import TestUser from "./test-user";

class AccountBuilder {
    private blockchain: Blockchain;
    private user: User;
    private balance?: number;
    private asset?: Asset;
    private participants = [new KeyPair()];
    private requiredSignaturesCount: number = 1;
    private flags: FlagsType[] = [FlagsType.Account, FlagsType.Transfer];
    private points?: number = 0;

    constructor(blockchain: Blockchain, user: User = TestUser.singleSig()) {
        this.blockchain = blockchain;
        this.participants = [user.keyPair];
        this.user = user;
    }

    /* Public functions */

    static account(blockchain: Blockchain, user?: User): AccountBuilder {
        return new AccountBuilder(blockchain, user);
    }

    withAuthFlags(flags: FlagsType[]): AccountBuilder {
        this.flags = flags;
        return this;
    }

    withParticipants(participants: KeyPair[]): AccountBuilder {
        this.participants = participants;
        return this;
    }

    withBalance(asset: Asset, balance: number): AccountBuilder {
        this.asset = asset;
        this.balance = balance;
        return this;
    }

    withPoints(points: number): AccountBuilder {
        this.points = points;
        return this;
    }

    withRequiredSignatures(count: number): AccountBuilder {
        this.requiredSignaturesCount = count;
        return this;
    }

    async build(): Promise<Account> {
        let account = await this.registerAccount();

        await this.addBalanceIfNeeded(account);
        account.rateLimit = await this.addPointsIfNeeded(account);

        return account;
    }

    /* Private functions */

    private async registerAccount(): Promise<Account> {
        return await Account.register(
            this.getAuthDescriptor(),
            this.blockchain.newSession(this.user)
        );
    }

    private async addBalanceIfNeeded(account) {
        if (this.asset && this.balance) {
            await AssetBalance.giveBalance(account.id_, this.asset.id, this.balance, this.blockchain)
        }
    }

    private async addPointsIfNeeded(account: Account) {
        if (this.points > 0) {
            await RateLimit.givePoints(account.id_, this.points, this.blockchain);
        }
        return RateLimit.getByAccountRateLimit(account.id_, this.blockchain);
    }

    private getAuthDescriptor() {
        if (this.requiredSignaturesCount > this.participants.length) {
            throw new Error("Number of required signatures has to be less than number of participants");
        }

        if (this.participants.length > 1) {
            return new MultiSignatureAuthDescriptor(
                this.participants.map(({ pubKey }) => pubKey),
                this.requiredSignaturesCount,
                this.flags,
                this.user.authDescriptor.rule
            )
        } else {
            const [participant] = this.participants;
            return new SingleSignatureAuthDescriptor(
                participant.pubKey,
                this.flags,
                this.user.authDescriptor.rule
            );
        }
    }
}

export default AccountBuilder;