import React, { FC } from "react";
import { TransactionWithSignature } from "../helpers/transactions";
import "./TransactionView.css";

interface TransactionsViewProps {
  transactions?: Array<TransactionWithSignature>;
}

const TransactionsView: FC<TransactionsViewProps> = ({ transactions }) => {
  const getTransactions = () => {
    return transactions?.map((trans) => {
      return <TransactionItemView key={trans.signature} transaction={trans} />;
    });
  };

  return <div>{getTransactions()}</div>;
};

interface TransactionItemViewProps {
  transaction: TransactionWithSignature;
}
const TransactionItemView: FC<TransactionItemViewProps> = ({ transaction }) => {
  const getTransactionItems = () => {
    const signature = transaction.signature?.toString();
    const meta = transaction.confirmedTransaction.meta;
    let amount = 0;
    if (meta) {
      amount = meta.preBalances[0] - meta.postBalances[0];
    }
    return (
      <>
        <li key={signature + "fee"}>
          <label>Fee</label>&nbsp;
          {meta?.fee}
        </li>
        <li key={signature + "amount"}>
          <label>Sent Amount</label>&nbsp;
          {amount}
        </li>
        <li key={signature + "sender-balance"}>
          <label>Sender Balance</label>&nbsp;
          {meta?.postBalances[0]}
        </li>
        <li key={signature + "receiver-balance"}>
          <label>Destination Balance</label>&nbsp;
          {meta?.postBalances[1]}
        </li>
      </>
    );
  };

  return (
    <div className="trans-item">
      <ul className="trans-meta">{getTransactionItems()}</ul>
    </div>
  );
};

export default TransactionsView;
