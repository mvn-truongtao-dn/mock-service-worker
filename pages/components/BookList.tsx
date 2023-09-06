import { book } from "@/type";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import BookDetail from "./BookDetail";
import { GET_BOOKS } from "../graphql-client/queries";
import { DELETE_BOOK } from "../graphql-client/mutations";
import { TrashIcon } from "@heroicons/react/24/solid";
import { WrenchIcon } from "@heroicons/react/24/solid";
type BookListProps = {
  setData: (value: book) => void;
};

export default function BookList({ setData }: BookListProps) {
  const [selectedBook, setSelectedBook] = useState<string>();
  const [active, setActive] = useState(false);
  const { data } = useQuery(GET_BOOKS);
  const [deleteBook] = useMutation(DELETE_BOOK);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("http://localhost:3000/user");
  //     const users = await response.json();
  //     console.log(users);
  //   })();
  // }, []);

  return (
    <div className="bg-white p-5 rounded-lg">
      {data?.books ? (
        <ul className="basis-3/6">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="text-sm">
                  <th>Name</th>
                  <th>Author</th>
                  <th className="float-right mr-[50px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.books?.map((item: book, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item.book.name}</td>
                      <td>{item.book.author}</td>
                      <td className="float-right">
                        <div
                          onClick={() => {
                            setSelectedBook(item.book.id);
                            setActive(true);
                          }}
                          className="inline-flex"
                        >
                          <BookDetail selectedBook={selectedBook} />
                        </div>

                        <button
                          onClick={() => {
                            setData(item);
                          }}
                          className="ml-2 hover:text-blue-700"
                        >
                          <WrenchIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => {
                            // setActiveDelete(item.id);
                            setTimeout(() => {
                              deleteBook({
                                variables: { id: item.book.id },
                                refetchQueries: [{ query: GET_BOOKS }],
                              });
                            }, 500);
                          }}
                          className="p-2 hover:text-red-500 font-bold"
                        >
                          <TrashIcon className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ul>
      ) : (
        <div>No data book!</div>
      )}
    </div>
  );
}
