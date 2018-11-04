import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const state = {
  turnData: {
    books: ['IT','Javascript','1000 night','tests'],
    author: {
      name: 'xxxx',
      imageUrl: 'http-request',
      imageSource: 'inside',
      books: ['IT'],
    }
  },
  highlight: 'none'
}

describe("AuthorQuiz", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("When the wrong answer selected", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={()=>{}}/>);
  });
  it('should have a red background', () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
  });
});

describe("When the correct answer selected", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'correct'}))} onAnswerSelected={()=>{}}/>);
  });
  it('should have a green background', () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
  });
});

describe("When the first answer selected", () => {
  let wrapper;
  const handleAnswerSelected = jest.fn();

  beforeAll(() => {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);

    wrapper.find('.answer').first().simulate('click');
  });

  it('handleAnswerSelected should be called', () => {
    expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it('selected should be IT', () => {
    expect(handleAnswerSelected).toHaveBeenCalledWith('IT');
  });
});
