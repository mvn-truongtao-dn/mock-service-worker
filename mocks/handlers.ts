import { book } from "@/type";
import { v4 as uuidv4 } from "uuid";

const books: book[] = [
  {
    book: {
      id: "1",
      name: "Learn NextJS",
      author: "TruongTao",
    },
  },
];

import { graphql } from "msw";

export const handlers = [
  graphql.query("https://custom/api/getBooks", (req, res, ctx) => {
    return res(
      ctx.data({
        books: books,
      })
    );
  }),

  graphql.mutation("deleteBook", (req, res, ctx) => {
    const obj = req.variables;
    const book = books.find((item: book) => item.book.id === obj.id);
    const index = books.findIndex((item: book) => item.book.id === obj.id);
    books.splice(index, 1);

    if (book) return res(ctx.data(book));
  }),

  graphql.query("getBooks", (req, res, ctx) => {
    return res(
      ctx.data({
        books: books,
      })
    );
  }),

  graphql.query("getBook", (req, res, ctx) => {
    const obj = req.variables;
    const book = books.find((item: book) => item.book.id === obj.id);

    if (book) return res(ctx.data(book));
  }),

  graphql.mutation("createBook", (req, res, ctx) => {
    const obj = req.variables;
    const id = uuidv4();
    books.push({ book: { ...obj, id: id } } as book);
    return res(
      ctx.status(200),
      ctx.data({
        addBook: obj,
      })
    );
  }),

  graphql.mutation("updateBook", (req, res, ctx) => {
    const obj = req.variables;
    const index = books.findIndex((item: book) => item.book.id === obj.id);
    books[index].book = { ...books[index].book, ...obj };
    if (index !== -1)
      return res(ctx.status(200), ctx.data({ book: books[index].book }));
  }),
];
