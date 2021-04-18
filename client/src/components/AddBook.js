import { useQuery, gql } from '@apollo/client';
import { GET_AUTHOR_QUERY } from '../queries/queries';

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


// stateless functional components cannot have methods, they need to be defined outside
function BookList() {
  const { loading, error, data } = useQuery(GET_AUTHOR_QUERY);
  return (
    <form id="add-book">
        <div className="field">
            <label>Book name:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Genre:</label>
            <input type="text" />
        </div>
        <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
                { displayAuthors(loading, error, data) }
            </select>
        </div>
        <button>+</button>
    </form>
  )
}

export default BookList;
