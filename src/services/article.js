import {createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

  
export const articleApi = createApi({
    reducerPath:'', 
    baseQuery:fetchBaseQuery({
        baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders:(headers) =>{
            headers.set( 'X-RapidAPI-Key', 'dbb073721bmsh78eb966d733b858p1b2eb7jsn79bed8b95cd4')
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com')
            return headers;
        }
    }),  
    endpoints:(builder) =>({
        getSummary:builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })

});

export const {useLazyGetSummaryQuery } = articleApi;