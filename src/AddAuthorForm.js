import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './addAuthorName.css';


// function AddAuthorForm({match}) {
//   return (
//     <div>
//       <h1>Add Author</h1>
//       <p>{JSON.stringify(match)}</p>
//     </div>
//   );
// }

class AddAuthorForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: '',
      imageUrl: '',
      books: [],
      bookTemp: ''
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }

  onFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleAddBook(){
    this.setState({
      books: this.state.books.concat([this.state.bookTemp]),
      bookTemp: ''
    });
  }

  render () {
    return (
      <div className="addAuthorName">
        <h1>Add Author</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="addAuthorName__input">
            <label htmlFor="name" >Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
          </div>
          <div className="addAuthorName__input">
            <label htmlFor="imageUrl" >Image URL</label>
            <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
          </div>
          <div className="addAuthorName__input">
            {this.state.books.map((book) => <p key={book} >{book}</p>
            )}
            <label htmlFor="bookTemp" >Image URL</label>
            <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
            <input type="button" value="+" onClick={this.handleAddBook} />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    onAddAuthor: (author) => {
        dispatch({ type: 'ADD_AUTHOR', author });
        props.history.push('/');
      },
  };
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));
