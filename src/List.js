import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, Checkbox, Modal, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SubTask from './SubTask';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    }
    this.setColor = this.setColor.bind(this);
  }

  setAtt(item) {
    let prop = {};
    if (item.status) {
      prop.defaultChecked;
    }
    return prop;
  }

  setColor() {
    return {
      color: '#ccc'
    }
  }

  doesExist(match) {
    let lists = this.props.lists;
    for (let list of lists) {
      if(list.id === match.params.listId) {
        return true;
      }
  }
  return false;
}

findList() {
  const {match} = this.props;
  let lists = this.props.lists;
  for (let list of lists) {
    if(list.id === match.params.listId) {
      return list.name;
    }
  }
}

  render() {
    const {match} = this.props;
    if(this.doesExist(match)) {
      return(
        <div className="container">
          <h3>List: {this.findList()}</h3>

          <FormGroup>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Add a Task"
                onChange={e => this.setState(
                  {item: e.target.value}
                )}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    if(this.state.item !== null) {
                      this.props.addTask(this.state.item, match.params.listId);
                      this.setState({item: null});
                    }
                  }
                }}
              />
              <InputGroup.Addon onClick={e =>{
                if(this.state.item !== null) {
                  this.props.addTask(this.state.item, match.params.listId);
                  this.setState({item: null});
                }
              }}>
                <Glyphicon glyph="plus"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <div className="tasks">
            <h2>ToDo</h2>
            {
              this.props.tasks.map((task) => {
                if(task.list === match.params.listId && task.status === false) {
                  return (
                    <div className="task" key={task.id}>
                      <div className="check">
                        <Checkbox inline onChange={e => this.props.setCheck(task)}/>
                      </div>
                      <div onClick={() => this.props.openModal(task)} className="name">{task.name}</div>
                      <div className="del" onClick={e => this.props.removeTask(task)}>
                        <Glyphicon bsSize="small" glyph="remove"/>
                      </div>
                      <SubTask addSubTask={this.props.addSubTask} removeSubTask={this.props.removeSubTask} setCheck={this.props.setSubTaskCheck} task={task} showModal={task.showModal} closeModal={this.props.closeModal}></SubTask>
                    </div>
                  )
                }
              })
            }
          </div>

          <div className="tasks">
            <h2>Done</h2>
            {
              this.props.tasks.map((task) => {
                if(task.list === match.params.listId && task.status === true) {
                  return (
                    <div className="task" key={task.id}>
                      <div className="check">
                        <Checkbox inline defaultChecked onChange={e => this.props.setCheck(task)}/>
                      </div>
                      <div onClick={() => this.props.openModal(task)} className="name" style={this.setColor()}>{task.name}</div>
                      <div className="del" onClick={e => this.props.removeTask(task)}>
                        <Glyphicon bsSize="small" glyph="remove"/>
                      </div>
                      <SubTask addSubTask={this.props.addSubTask} removeSubTask={this.props.removeSubTask} setCheck={this.props.setSubTaskCheck} task={task} showModal={task.showModal} closeModal={this.props.closeModal} setColor={this.setColor}></SubTask>
                    </div>
                  )
                }
              })
            }
          </div>

        </div>
      )
    }
    else {
      return(
        <div>
          <h1>
            This is a 404 for sure!
          </h1>
          <h3><Link to="/lists">Find a Proper "Path" Here :D</Link></h3>
        </div>
      )
    }
  }
}

export default List
