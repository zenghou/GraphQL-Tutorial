import { useQuery, gql } from '@apollo/client';
import { GET_AUTHOR_QUERY } from '../queries/queries';
import React, { useState } from 'react';

const displayAuthors = (loading, error, data) => {
  if (loading) {
    return (<option disabled>Loading...</option>);
  } else if (error) {
    return (<option disabled>Error ): </option>);
  } else {
    return data.authors.map((author) => {
      return (<option key={author.id}>{author.name}</option>)
    })
  }
}

const submitForm = (e, input) => {
  e.preventDefault();
  console.log(input);
}

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  // console.log(allValues)
  const { loading, error, data } = useQuery(GET_AUTHOR_QUERY);
  return (
    <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={ (e) => { setName(e.target.value) }} />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={ (e) => { setGenre(e.target.value) }}/>
        </div>
        <div className="field">
            <label>Author:</label>
            <select onChange={ (e) => { setAuthorId(e.target.value) }}>
                <option>Select author</option>
                { displayAuthors(loading, error, data) }
            </select>
        </div>
        <button onClick={ (e) => submitForm(e, {name, genre, authorId}) }>+</button>
    </form>
  )
}

export default AddBook;
