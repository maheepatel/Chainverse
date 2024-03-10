import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
  "X-RapidAPI-Host": REACT_APP_NEWS_RAPIDAPI_HOST,
};

const baseUrl = "https://crypto-news16.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

// const createRequest = ({ newsCategory, count }) =>
// {
//   let url = "/news/";
//   if (newsCategory === "top") {
//     url += `top/${count}`;
//   }

//   console.log("url" + url);
//   console.log(newsCategory);

//   // } else {
//   //   url += "all";
//   // }

//   return { url, headers: cryptoNewsHeaders };
// };

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      // query: (newsCategory, count) => createRequest({ newsCategory, count }),
      // createRequest(`/news/${newsCategory}/${count}`),
      query: ({ newsCategory, count }) => createRequest(`/news/top/${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

// const options = {
//   method: 'GET',
//   url: 'https://crypto-news16.p.rapidapi.com/news/top/5',
//   headers: {
//     'X-RapidAPI-Key': 'ee0fd1c787msh414cf1a58a2c538p10d5e6jsna13e70e0a9e5',
//     'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
//   }
// };
