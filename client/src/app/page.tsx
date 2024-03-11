"use client";
import { createShortUrl } from "../../utils/urlApi";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { BACKEND } from "../../utils/constant";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copyText, setCopyText] = useState<string>("Copy");

  const handleClick = async (data: FormData) => {
    try {
      setCopyText("Copy");
      const url = data.get("url") as string;
      setLoading(true);
      const res = await createShortUrl(url);
      setLoading(false);
      setShortUrl(`${BACKEND}/${res.data.data.shortId}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPasswordToClipBoard = () => {
    setCopyText("Copied");
    window.navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="h-screen bg-indigo-900 flex flex-col justify-center items-center">
      <div className="text-white text-2xl font-bold  absolute top-4 ">
        URL shortener{" "}
      </div>
      <div className=" ">
        <form
          action={handleClick}
          className="flex lg:flex-row flex-col gap-4 items-center"
        >
          <input
            type="text"
            name="url"
            placeholder="Enter url"
            className="h-[30px] rounded-lg mr-[20px] outline-none p-2 text-center font-normal text-large border-2"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full"
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#ffffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {shortUrl && (
          <>
            <div className="flex lg:flex-row flex-col gap-4 items-center mt-4">
              <div className="flex items-center rounded-lg mr-[20px]  outline-none p-2 text-center font-normal text-large border-2  bg-white">
                {shortUrl}
              </div>
              <button
                onClick={copyPasswordToClipBoard}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full "
              >
                {copyText}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
