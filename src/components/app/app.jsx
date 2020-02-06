import React, {Component} from 'react';

import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from '../item-add-form';

export default class App extends Component {

    maxId = 100;

    state = {
      Array: [
        this.createTodoItem('Alarm in 8:00'),
        this.createTodoItem('Alarm in 12:00'),
        this.createTodoItem('Alarm in 15:00'),
        this.createTodoItem('Alarm in 18:00'),
        this.createTodoItem('Alarm in 20:00')
      ],
      term: '',
      filter: 'all'
    }
 
  createTodoItem(label){
      return {
        label,
        important: false,
        done: false,
        id: this.maxId++  
      }
  }

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
    const newItem = this.createTodoItem(text);

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

  toggleProperty(arr, id, propName){
    const idx = arr.findIndex((el) => el.id === id);

    //update object
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    }

    //construct newArray
    return [
      ...arr.slice(0,idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  onToggleDone = (id) => {
    setTimeout(() => {
      this.setState(({Array}) => {
        return{
          Array: this.toggleProperty(Array, id, 'done')
        }
      })
    },1000)
  }

  onToggleImportant = (id) => {
    setTimeout(() => {
      this.setState(({Array}) => {
        return{
          Array: this.toggleProperty(Array, id, 'important')
        }
      })
    }, 1000)
  }

  search(items, term){
    if(term.length === 0){
      return items;
    }

      return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
    }

    onSearchChange = (term) => {
      this.setState({
         term 
        });
    }

    onFilterChange = (filter) => { //when changed filter we'll change his state and return in itemStatusF
      this.setState({
         filter 
        });
    }

    filter(items, filter){ //logic filter from 3
      switch(filter){
        case 'all':
          return items;
        case 'active':
          return items.filter((item) => !item.done) //return only active
        case 'done':
          return items.filter((item) => item.done) //all items which done
        default:
          return items;
      }
    }


  render(){
    const {Array, term, filter} = this.state;

    const visibleItems = this.filter(this.search(Array, term), filter); // after search we'll filter and get
    const doneCount = Array.filter((el) => el.done).length;  
    const todoCount = Array.length - doneCount;

  return (
      <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount}/>

      <div className="top-panel d-flex">
            <SearchPanel 
            onSearchChange={this.onSearchChange}/>
            <ItemStatusFilter 
            filter={filter} //for what filter access
            onFilterChange = {this.onFilterChange} // recover state our component
            /> 
      </div>

            <TodoList 
            todos={visibleItems}
            onDeleted={this.onItemDeleted}
            
            onToggleDone={this.onToggleDone}
            onToggleImportant={this.onToggleImportant}/>

            <ItemAddForm onItemAdded={this.AddItem}/>
      </div>
    );
  };
   
  };