import { useState } from "react";
import { book } from "@/type";
import BookList from "./components/BookList";
import BookForm2 from "./components/BookForm2";

export default function Home() {
  const [data, setData] = useState<book>();

  return (
    <div className="bg-[#DCDCDC] w-full h-screen">
      <h1 className="text-4xl text-center py-10">
        Mock Service Worker GraphQL-API
      </h1>
      <div className="flex flex-col w-1/2 m-auto">
        <div className="basis-4/12 mb-10">
          <BookForm2 data={data} setData={setData} />
        </div>
        <div className="basis-8/12">
          <BookList setData={setData} />
        </div>
      </div>
    </div>
  );
}
