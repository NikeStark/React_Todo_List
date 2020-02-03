import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {
    constructor(){
      super();

      this.state = {
        done: false,
        important: false
      }

      this.onLabelClick = () => {
        setTimeout(() => {
          this.setState((state) => {
            return {
              done: !state.done
            }
          })
        },1000)
      }

      this.onMarkImportant = () => {
        this.setState(({important}) => {
            return {
              important: !important
            }
        })
      }
      
    }
    render(){

      const {label, onDeleted,
            onToggleDone,
            onToggleImportant} = this.props

      const {done, important} = this.state

      let classNames = "todo-list-item"
      
      if(done){
        classNames += ' done'
      }
      if(important){
        classNames += ' important'
      }

      return(
        <span className={classNames}>
       <span
        className="todo-list-item-label"
        onClick={onToggleDone}>  this.onLabelClick
        {label}
      </span>

      <button type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}>   this.onMarkImportant
        <i className="fa fa-exclamation" />
      </button>

      <button type="button"
              className="btn btn-outline-danger btn-sm float-right"
              onClick={onDeleted}>
              <span className="tooltiptext">Are you sure?</span>
        <i className="fa fa-trash-o" />
      </button>
    </span>
     
    )
    }
  }