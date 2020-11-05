import { Book, Category, Tag, User, Author } from '../contracts';
import { BaseService } from './base';

export class BookService<FS> extends BaseService<Book, FS> {
	protected url = '/books';
}

export class TagService<FS> extends BaseService<Tag, FS> {
	protected url = '/tags';
}

export class CategoryService<FS> extends BaseService<Category, FS> {
	protected url = '/categories';
}

export class UserService<FS> extends BaseService<User, FS> {
	protected url = '/users';
}

export class AuthorService<FS> extends BaseService<Author, FS> {
	protected url = '/authors';
}
