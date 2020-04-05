import AccountBuilder from './util/account-builder';
import BlockchainUtil from "./util/blockchain-util";
import TestUser from './util/test-user';

import {Account, BlockchainSession, User, KeyPair, addAuthDescriptor, SingleSignatureAuthDescriptor, FlagsType, Operation} from 'ft3-lib';

/**
 * These are bad tests, but they give an idea of the system at work
 */
describe("user test", ()=>{

  let blockchain;
  const admin = new User(new KeyPair("371806572A0B8740B6E90006E9C39AC18B6E077EFF7D0EA79C3C4F5690F36189"), new SingleSignatureAuthDescriptor(Buffer.from("024D7A49878382169871F2C7320B6C91EA97C9DE89316996DAE4D3BC5E7DCB9E67", "hex"), [FlagsType.Account, FlagsType.Transfer], null));
  let adminSession: BlockchainSession;
  let theDoctorSession: BlockchainSession;
  
  let location;
  let organization;
  let theDoctor;
  let user;

  beforeAll(async () => {
    blockchain = await BlockchainUtil.getDefaultBlockchain();
    adminSession = blockchain.newSession(admin);

    await adminSession.call(new Operation("create_nfa"))
  });

  it("creates one location", async () => {
    const tx = await adminSession.call(new Operation("create_location", "Borgo Panigale (BO)", "44.502327", "11.322598"));
    location = await adminSession.query('get_location', {name: "Borgo Panigale (BO)"});

    console.log(location)
    expect(location.latitude).toBe("11.322598");
  });

  it("creates one organization", async () => {
    const tx = await adminSession.call(new Operation("create_organization", "Maggiore", "HOSPITAL", location.name));
    organization = await adminSession.query('get_organization', { name: "Maggiore"});
    console.log(organization)
  })

  it("Creates one hospital user", async () => {
    user = TestUser.singleSig();

    const account = await new AccountBuilder(
      blockchain,
      user
    ).build();
    
    account.sync()
    const accounts = await Account.getByParticipantId(user.keyPair.pubKey, blockchain.newSession(user));
    expect(accounts[0].id).toStrictEqual(account.id);

    
    const tx = await adminSession.call(new Operation("add_user", account.id_, "Doctor1", organization.name));
    
    theDoctor = await adminSession.query("get_account", {account_id: account.id_});
    theDoctorSession = blockchain.newSession(user);
    console.log(theDoctor)
  });

  it("creates few assets",async  ()=>{
    console.log(theDoctor)
    const txBuilder = await blockchain.transactionBuilder()
    const asset = await txBuilder
      .add(new Operation("create_asset", theDoctor.account_id, theDoctorSession.user.authDescriptor.id, "Respirator001", "Help the patient to breath", 0, "http://link-to-image.com"))
      .add(new Operation("create_asset", theDoctor.account_id, theDoctorSession.user.authDescriptor.id, "Respirator002", "Help the patient to breath", 0, "http://link-to-image.com"))
      .add(new Operation("create_asset", theDoctor.account_id, theDoctorSession.user.authDescriptor.id, "Doctor001", "Takes care of multiple patients", 0, "http://link-to-image.com"))
      .add(new Operation("asset_on_sale", theDoctor.account_id, theDoctorSession.user.authDescriptor.id, "Respirator001"))
      .add(new Operation("asset_on_sale", theDoctor.account_id, theDoctorSession.user.authDescriptor.id, "Doctor001"))
      .build(theDoctorSession.user.authDescriptor.signers)
      .sign(theDoctorSession.user.keyPair)
      .post()
  })


});