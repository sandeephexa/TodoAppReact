import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodo from './components/AddTod';
import Header from './components/layout/Header';
import About from './components/pages/About';
//import {v4 as uuid} from "uuid";
import axios from 'axios';

class App extends Component {
  state = {
     todos : []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => {
      this.setState({todos: res.data})
    })
  }

  // toggle complete
  markComplete = (id) => {
    this.setState({todos : this.state.todos.map(todo => {
      if(todo.id === id){
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  }

// remove Todo
  removeTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`, )
    .then(res => {
      this.setState({todos : [...this.state.todos.filter(todo => 
        todo.id !== id )]
    })
  })
  }

  addTodo = (title) => {
    
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed : 'false'
    })
    .then(res => {
      this.setState({todos : [...this.state.todos, res.data]})
    })
  }

  render() {
    
    return (
      <Router>
        <div className="App">
          <div className="container">
          <Header/>
          <Route exact path="/" render={props => (
              <React.Fragment>
              <AddTodo addTodo={this.addTodo}/>
              <h1> <Todos todos={ this.state.todos } markComplete = {this.markComplete} removeTodo = {this.removeTodo} /> </h1>
              </React.Fragment>
          )}>
          </Route>
          <Route path="/about" component={About}></Route>
        </div>
        </div>
      </Router>
    );
  } 
}

export default App;
