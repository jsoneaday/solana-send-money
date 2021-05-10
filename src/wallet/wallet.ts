// @ts-ignore
import Wallet from "@project-serum/sol-wallet-adapter";
import {
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
} from "@solana/web3.js";
import EventEmitter from "eventemitter3";

export interface WalletAdapter extends EventEmitter {
  publicKey: PublicKey | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  connect: () => any;
  disconnect: () => any;
}

const network = "http://devnet.solana.com";
const connection = new Connection(network, "confirmed");
const wallet: WalletAdapter = new Wallet("https://www.sollet.io", network);

export async function initWallet() {
  await wallet.connect();
  console.log("network", network);
  console.log("connection", connection);
  console.log("wallet publicKey", wallet?.publicKey?.toBase58());
}

export async function createChatAccounts() {}

export async function sendMoney(destPubkey: PublicKey) {
  try {
    const walletAccountInfo = await connection.getAccountInfo(
      wallet!.publicKey!
    );
    console.log("wallet data size", walletAccountInfo?.data.length);

    const receiverAccountInfo = await connection.getAccountInfo(destPubkey);
    console.log("receiver data size", receiverAccountInfo?.data.length);

    const instruction = SystemProgram.transfer({
      fromPubkey: wallet!.publicKey!,
      toPubkey: destPubkey,
      lamports: 500 * 1000000, // about half a SOL
    });
    let trans = new Transaction();
    trans.add(instruction);
    trans.feePayer = wallet!.publicKey!;
    let hash = await connection.getRecentBlockhash();
    console.log("blockhash", hash);
    trans.recentBlockhash = hash.blockhash;

    let signedTrans = await wallet.signTransaction(trans);
    console.log("sign transaction");
    let signature = await connection.sendRawTransaction(
      signedTrans.serialize()
    );
    console.log("send raw transaction");
    let result = await connection.confirmTransaction(signature, "singleGossip");
    console.log("confirm", result);
  } catch (e) {
    console.warn("Failed", e);
  }
}
