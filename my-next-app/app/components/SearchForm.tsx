
import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';

const SearchForm = () => {
    const query = 'Test'
    
  return (
    <Form action="/" scroll={false} className='search-form'>
        <input name="query" defaultValue={query} className='search-input' placeholder='search startups' />
        <div className='flex gap-2'>
            {
                query && <SearchFormReset/>
            }
            <button type='submit' className='search-btn text-white' >s</button>
        </div>
    </Form>
  )
}

export default SearchForm