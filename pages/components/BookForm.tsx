import React, { useEffect, useState } from "react";
import { GET_BOOKS } from "../graphql-client/queries";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, UPDATE_BOOK } from "../graphql-client/mutations";

type BookFormProps = {
  data: any;
  setData: any;
};

export default function BookForm({ data, setData }: BookFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
  });

  const [addBook] = useMutation(CREATE_BOOK);
  const [updateBook] = useMutation(UPDATE_BOOK);

  useEffect(() => {
    if (data?.book) {
      setFormData({
        name: data.book.name,
        author: data.book.author,
      });
      setOpen(true);
    }
  }, [data]);

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (data?.book) {
      console.log("update");

      updateBook({
        variables: { id: data.book.id, ...formData },
        refetchQueries: [{ query: GET_BOOKS }],
      });
      setFormData({ name: "", author: "" });
      setData();
    } else {
      console.log("add");

      addBook({
        variables: formData,
        refetchQueries: [{ query: GET_BOOKS }],
      });
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setFormData({ name: "", author: "" });
  };

  return (
    <div>
      <button className="btn" onClick={handleToggle}>
        Create Book
      </button>
      <dialog
        id="my_modal_1"
        className="modal backdrop"
        open={open}
        onClose={handleToggle}
      >
        <form method="dialog" onSubmit={handleSubmitForm} className="modal-box">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="mr-5 ml-2 mb-1 block text-black text-lg"
            >
              Name
            </label>

            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              className="input input-bordered w-full input-ghost"
              onChange={handleInput}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="author" className="mr-5 ml-2 mb-1 block text-lg ">
              Author
            </label>
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              className="w-full input input-bordered input-ghost"
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn mt-2">
            Submit
          </button>
        </form>
        <form
          method="dialog"
          className="modal-backdrop"
          onSubmit={() => {
            setData();
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
