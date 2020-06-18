import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error("Invalid type. Type must be 'income' or 'outcome'");
    }

    if (!value) {
      throw new Error("'value' is required");
    }

    if (typeof value !== 'number') {
      throw new Error("'value' must be a number");
    }

    if (!title) {
      throw new Error("'title' is required");
    }

    if (typeof title !== 'string') {
      throw new Error("'title' must be a string");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
