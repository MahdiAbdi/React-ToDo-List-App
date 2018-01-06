import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import keyIndex from 'react-key-index'
import Lists from './Lists'
import List from './List'
import {Nav, Navbar, NavItem} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.removeList = this.removeList.bind(this);
    this.setCheck = this.setCheck.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.removeSubTask = this.removeSubTask.bind(this);
    this.setSubTaskCheck = this.setSubTaskCheck.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      lists: [],
      tasks: [],
    }
  }

  addList(item) {
    let lists = this.state.lists;
    let newList = {
      name: item,
      status: false
    }
    lists.push(newList);
    keyIndex(lists, 1);
    this.setState({lists: lists});
    document.getElementsByTagName('input')[0].value = '';
  }

  addTask(item, listId) {
      let tasks = this.state.tasks;
      let newTask = {
        name: item,
        list: listId,
        status: false,
        showModal: false,
        subTasks: []
      }
      tasks.push(newTask);
      keyIndex(tasks, 1);
      this.setState({tasks: tasks});
      document.getElementsByTagName('input')[0].value = '';
  }

  addSubTask(item, task) {
      let tasks = this.state.tasks;
      let newSubTask = {
        name: item,
        task: task._nameId,
        status: false
      }
      let index = tasks.indexOf(task);
      tasks[index].subTasks.push(newSubTask);
      keyIndex(tasks[index].subTasks, 1);
      keyIndex(tasks, 1);
      this.setState({tasks: tasks});
      document.getElementById('addSubTask').value = '';
  }

  removeTask(item) {
    let tasks = this.state.tasks;
    let index = tasks.indexOf(item);
    tasks.splice(index, 1);
    this.setState(tasks);
 }

 removeSubTask(item, task) {
   let tasks = this.state.tasks;
   let index = tasks.indexOf(task);
   let subIndex = tasks[index].subTasks.indexOf(item);
   tasks[index].subTasks.splice(subIndex, 1);
   this.setState({tasks: tasks});
 }

 setSubTaskCheck(item, task) {
  let tasks = this.state.tasks;
  let index = tasks.indexOf(task);
  let subIndex = tasks[index].subTasks.indexOf(item);
  tasks[index].subTasks[subIndex].status = !tasks[index].subTasks[subIndex].status;
  this.setState(tasks);
 }

 removeList(item) {
    let lists = this.state.lists;
    let index = lists.indexOf(item);
    lists.splice(index, 1);
    this.setState(lists);
    // Remove tasks
    let tasks = this.state.tasks;
    for (let task of tasks) {
      if(task._listId === item._nameId) {
        let index = lists.indexOf(task);
        tasks.splice(index, 1);
      }
    }
    this.setState(tasks);
  }

  setCheck(item) {
    let tasks = this.state.tasks;
    let index = tasks.indexOf(item);
    tasks[index].status = !tasks[index].status;
    this.setState(tasks);
  }

  openModal(task) {
    let tasks = this.state.tasks;
    let index = tasks.indexOf(task);
    tasks[index].showModal = true;
    this.setState({tasks: tasks});
  }

  closeModal() {
    let tasks = this.state.tasks;
    for (let task of tasks) {
      task.showModal = false;
    }
    this.setState({tasks: tasks});
  }

  render() {
    return(
      <Router>
        <div>

          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/lists">ToDo App</Link>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1}><Link to="/lists">Home</Link></NavItem>
            </Nav>
          </Navbar>

          <div className="container">
            <Route exact path="/lists"
              render={(props) => <Lists {...props} lists={this.state.lists}
                tasks={this.state.tasks}
                addList={this.addList} removeList={this.removeList}></Lists>} />

            <Route path="/lists/:listId"
              render={(props) => <List {...props} lists={this.state.lists}
                tasks={this.state.tasks} addTask={this.addTask} removeTask={this.removeTask}
                setCheck={this.setCheck} addSubTask={this.addSubTask}
                removeSubTask={this.removeSubTask}
                setSubTaskCheck={this.setSubTaskCheck}
                openModal={this.openModal} closeModal={this.closeModal}></List>} />

          </div>
        </div>
      </Router>
    )
  }
}

export default App;
