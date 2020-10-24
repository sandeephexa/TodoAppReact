import React, {Component} from 'react';
import Todos from './components/Todos';
import AddTodo from './components/AddTod';
import Header from './components/layout/Header';
import {v4 as uuid} from "uuid";

class App extends Component {
  state = {
     todos : [
       {
         id : uuid(),
         title: 'First Todo',
         completed: false
       },
       {
         id : uuid(),
         title: 'Second Todo',
         completed: true
       },
       {
         id : uuid(),
         title: 'Third Todo',
         completed: false
       }
     ]
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
    this.setState({todos : [...this.state.todos.filter(todo => 
      todo.id !== id )]
  })
  }

  addTodo = (title) => {
    const newTodo = {
      id: uuid(),
      title: title,
      completed : false
    };

    this.setState({todos : [...this.state.todos, newTodo]})
  }

  render() {
    
    return (
      <div className="App">
        <div className="container">
        <Header/>
        <AddTodo addTodo={this.addTodo}/>
         <h1> <Todos todos={ this.state.todos } markComplete = {this.markComplete} removeTodo = {this.removeTodo} /> </h1>
      </div>
      </div>
    );
  } 
}

export default App;
