import { Book } from '../contracts';
import { BaseService } from './base';

export class BookService<FS> extends BaseService<Book, FS> {
	protected url = '/books';
}
