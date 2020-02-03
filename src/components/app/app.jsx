import React, {Component} from 'react';

import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';

import Array from '../../array.js';
import './app.css';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

    maxId = 100;

    state = {Array}
 
  onItemDeleted = (id) => {
    this.setState(({Array}) => {
      const idx = Array.findIndex((el) => el.id === id);
      const newArray = [
        ...Array.slice(0, idx),
        ...Array.slice(idx + 1)
      ];

      return{
        Array: newArray
      }
    })
  }

  AddItem = (text) => {
    const newItem = {
      label: text,
      important: false,
      id: this.maxId++
    }

    this.setState(({Array}) => {
      const newArr = [
        ...Array,
        newItem
      ];

      return{
        Array: newArr
      }
    })
  }

  onToggleDone = (id) => {
      console.log(`Toggle Done ${id}`)
  }

  onToggleImportant = (id) => {
      console.log(`Toggle Important ${id}`)
  }

  render(){
      
    const {Array} = this.state

    return (
      <div className="todo-app">
            <AppHeader toDo={1} done={3}/>

        <div className="top-panel d-flex">
            <SearchPanel />
            <ItemStatusFilter />
        </div>

            <TodoList todos={Array}
            onDeleted={this.onItemDeleted}
            
            onToggleDone={this.onToggleDone}
            onToggleImportant={this.onToggleImportant}/>

            <ItemAddForm onItemAdded={this.AddItem}/>
      </div>
    );
  }
   
  };