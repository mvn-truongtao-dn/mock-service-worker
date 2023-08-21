import { book } from "@/type";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_BOOK } from "../graphql-client/queries";
import { EyeIcon } from "@heroicons/react/24/solid";

type BookDetailProps = {
  selectedBook: string | undefined;
};

export default function BookDetail({ selectedBook }: BookDetailProps) {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(GET_BOOK, {
    variables: {
      id: selectedBook,
    },
    skip: selectedBook === undefined,
  });

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <div>
      <button className="" onClick={handleToggle}>
        <EyeIcon className="h-6 w-6" />
      </button>
      <dialog
        id="my_modal_1"
        className="modal backdrop"
        open={open}
        onClose={handleToggle}
      >
        <form method="dialog" className="modal-box text-lg">
          <h1>{data?.book?.name}</h1>
          <h1>{data?.book?.author}</h1>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
