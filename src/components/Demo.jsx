import React from 'react'
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';


const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    const [allArticles, setAllArticles] = useState([])

    useEffect(() => {
        const articleFromLocalStorage = JSON.parse(
            localStorage.getItem('allArticles')
        )

        if (articleFromLocalStorage) {
            setAllArticles(articleFromLocalStorage)
        }

    }, []);




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(article.url)
        const response = await getSummary({ articleUrl: article.url });


        if (response?.data?.summary) {
            const newArticle = { ...article, summary: response?.data?.summary };
            const trialSummary = response?.data?.summary;
            console.log(trialSummary)

            const updatedAllArticles = [newArticle, ...allArticles];
            
            setArticle(newArticle);

            setAllArticles(updatedAllArticles);

            localStorage.setItem('allArticles', JSON.stringify(allArticles));

            console.log(newArticle)



        }

    }


    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className='flex flex-col w-full gap-2'>
                <form className='relative flex'
                    onSubmit={handleSubmit}
                >

                    <img src={linkIcon} alt='link_icon'
                        className='absolute left-0 my-2 ml-3 w-5' />
                    <input type='url' placeholder='Enter a URL'
                        value={article.url}
                        onChange={(e) => setArticle({ ...article, url: e.target.value })}
                        required
                        className='url_input peer'
                    />
                    <button
                        type='submit'
                        className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'

                    >
                        Submit

                    </button>
                </form>
                
                <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                    {allArticles.map((item, index) => (
                        <div
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className='link_card'
                        >
                            <div className='copy_btn'>
                                <img src={copy}
                                alt='copy'
                                className='w-[40%] h-[40%] object-contain'
                                />

                            </div>
                            <p>
                                {item.url}
                            </p>

                        </div>
                    ))}

                </div>


              

            </div>
            <div className='my-10 max-w-full flex justify-center items-center'>
                {isFetching ? (
                    <img
                    src={loader} alt='loader' className='w-20 h-20 object-contain'
                    />

                ): error ?(
                    <p className='font-inter font-bold text-black'>
                        Ooops, there is a problem <br />
                        <span className='font-satoshi font-nomal'>
                            {error?.data?.error}
                        </span>

                    </p>

                ):(
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                                
                                <span className='blue_gradient'>
                                Article Summary
                                </span>
                            </h2>
                            <div className='summary_box'>
                                <p>{article.summary}</p>

                                </div>
                            </div>
                    )
                )}

            </div>
         
           

        </section>
    )
}

export default Demo