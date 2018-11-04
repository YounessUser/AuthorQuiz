import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

var PropTypes = require('prop-types');


function Book({title, onClick}) {
  return (
    <div className="answer" onClick={() => onClick(title)}>
      <h4>{title}</h4>
    </div>
  );
}


function Hero() {
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Turn({author, books, highlight, onAnswerSelected}) {

  function highlightToBackgroundColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }

  return (
    <div className="row turn" style={{backgroundColor: highlightToBackgroundColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} alt="Authore" className="authorImage"/>
      </div>

      <div className="col-6">
        {books.map((title, i) => <Book title={title} key={i} onClick={onAnswerSelected} />)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  highlight: PropTypes.string.isRequired
}

function Continue({ show, onContinue }) {
  return (
    show &&
    <div className="row continue">
        <button className="btn btn-primary btn-lg " onClick={onContinue}>
          Continue
        </button>
      </div>
  );
}

function Footer() {
  return (
    <div className="row">
      <div className="col-12">
        <p className="text-muted credit">All Image from <a href="#">Here</a></p>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAnswerSelected: (answer) => {
      dispatch({ type: 'ANSWER_SELECTED', answer });
    },
    onContinue: () => {
      dispatch({ type: 'CONTINUE'});
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function ({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluide">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={highlight === 'correct'} onContinue={onContinue} />
        <p><Link to="/add" >Add Author</Link></p>
        <Footer />
      </div>
    );
  }
);

export default AuthorQuiz;
