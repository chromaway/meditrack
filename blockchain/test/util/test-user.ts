import { FlagsType } from "ft3-lib";
import { KeyPair} from "ft3-lib";
import { User} from "ft3-lib";
import { SingleSignatureAuthDescriptor} from "ft3-lib";
import { MultiSignatureAuthDescriptor} from "ft3-lib";

class TestUser {
    static singleSig(rule: any | null = null) {
        const keyPair = new KeyPair();
        const singleSigAuthDescriptor = new SingleSignatureAuthDescriptor(
            keyPair.pubKey,
            [FlagsType.Account, FlagsType.Transfer],
            rule
        );
        return new User(keyPair, singleSigAuthDescriptor);
    }

    static multiSig(requiredSignatures: number, numberOfParticipants: number, rule: any | null = null) {
        //TODO: add validation
        const keyPairs = Array(numberOfParticipants).map(() => new KeyPair());

        const multiSigAuthDescriptor = new MultiSignatureAuthDescriptor(
            keyPairs.map(({ pubKey}) => pubKey),
            requiredSignatures,
            [FlagsType.Account, FlagsType.Transfer],
            rule
        );

        return new User(keyPairs[0], multiSigAuthDescriptor)
    }
}

export default TestUser;