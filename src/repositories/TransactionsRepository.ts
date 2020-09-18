import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {

    return this.transactions;
  }

  public getBalance(): Balance {

    const income =
      this.transactions.filter( ( item: Transaction ) => item.type === 'income' )
        .reduce( ( acc: number, item: Transaction ) => acc += item.value, 0 );

    const outcome =
      this.transactions.filter( ( item: Transaction ) => item.type === 'outcome' )
        .reduce( ( acc: number, item: Transaction ) => acc += item.value, 0 );

    return {
      'income': income,
      'outcome': outcome,
      'total': income - outcome
    };
  }



  public create( { title, value, type }: TransactionDTO ): Transaction {

    const transaction = new Transaction( { title, value, type } );

    this.transactions.push( transaction );

    return transaction;
  }

}

export default TransactionsRepository;
