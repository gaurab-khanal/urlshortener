import axios from "axios";
import { BACKEND } from "./constant";

export const createShortUrl = async (url: string) => {
  const res = await axios.post(`${BACKEND}`, { url });

  return res;
};
