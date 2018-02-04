import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
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
      listIDCounter: 1,
    }
  }

  generateListID() {
    let idc = this.state.listIDCounter;
    let id = "";

    if(idc < 100) {
      if(idc < 10) {
        id += "00";
      }
      else {
        id += "0";
      }
    }

    id += idc.toString();
    idc++;
    this.setState({listIDCounter: idc});
    console.log("Generated ID is: ",id);
    return id;
  }

  generateTaskID(listID) {
    let lists = this.state.lists;
    let id=listID;
    let idc = 0;
    lists.map(list =>
      {
        if(list.id == listID) {
          idc = list.taskIDCounter;
          list.taskIDCounter++;
          this.setState({lists: lists});
        }
      }
    )

    if(idc < 100) {
      if(idc < 10) {
        id += "00";
      }
      else {
        id += "0";
      }
    }

    id += idc.toString();
    console.log("Generated ID is: ",id);
    return id;
  }

  generateSubTaskID(taskID) {
    let tasks = this.state.tasks;
    let id = taskID;
    let idc = 0;
    tasks.map(task =>
      {
        if(task.id == taskID) {
          idc = task.subTaskIDCounter;
          task.subTaskIDCounter++;
          this.setState({tasks: tasks});
        }
      }
    )

    if(idc < 100) {
      if(idc < 10) {
        id += "00";
      }
      else {
        id += "0";
      }
    }

    id += idc.toString();
    console.log("Generated ID is: ",id);
    return id;
  }

  addList(item) {
    let lists = this.state.lists;
    let newList = {
      name: item,
      status: false,
      id: this.generateListID(),
      taskIDCounter: 1,
    }
    lists.push(newList);
    this.setState({lists: lists});
    document.getElementsByTagName('input')[0].value = '';
  }

  addTask(item, listId) {
      let tasks = this.state.tasks;
      let newTask = {
        id: this.generateTaskID(listId),
        name: item,
        list: listId,
        status: false,
        showModal: false,
        subTaskIDCounter: 1,
        subTasks: []
      }
      tasks.push(newTask);
      this.setState({tasks: tasks});
      document.getElementsByTagName('input')[0].value = '';
  }

  addSubTask(item, task) {
      let tasks = this.state.tasks;
      let newSubTask = {
        id: this.generateSubTaskID(task.id),
        name: item,
        task: task.id,
        status: false
      }
      let index = tasks.indexOf(task);
      tasks[index].subTasks.push(newSubTask);
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
      if(task.list === item.id) {
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
