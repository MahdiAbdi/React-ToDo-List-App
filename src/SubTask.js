import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, Checkbox, Modal, Button } from 'react-bootstrap';

class SubTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    }
  }

  setColor() {
    return {
      color: '#ccc'
    }
  }

  render() {
    return(
      <Modal show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add SubTask</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <FormGroup>
            <InputGroup>
              <FormControl id="addSubTask"
                type="text"
                placeholder="Add a SubTask"
                onChange={e => this.setState(
                  {item: e.target.value}
                )}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    if(this.state.item !== null) {
                      this.props.addSubTask(this.state.item, this.props.task);
                      this.setState({item: null});
                    }
                  }
                }}
              />
              <InputGroup.Addon onClick={e =>{
                if(this.state.item !== null) {
                  this.props.addSubTask(this.state.item, this.props.task);
                  this.setState({item: null});
                }
              }}>
                <Glyphicon glyph="plus"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>

          <div className="tasks">
            <h3>ToDo</h3>
            {
              this.props.task.subTasks.map((subTask) => {
                if(subTask.status === false) {
                  return (
                    <div className="task" key={subTask._nameId}>
                      <div className="check">
                        <Checkbox inline onChange={e => this.props.setCheck(subTask, this.props.task)}/>
                      </div>
                      <div className="name">{subTask.name}</div>
                      <div className="del" onClick={e =>{
                        this.props.removeSubTask(subTask, this.props.task)
                      } }>
                        <Glyphicon bsSize="small" glyph="remove"/>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
          <div className="tasks">
            <h3>Done</h3>
            {
              this.props.task.subTasks.map((subTask) => {
                if(subTask.status === true) {
                  return (
                    <div className="task" key={subTask._nameId}>
                      <div className="check">
                        <Checkbox inline defaultChecked onChange={e => this.props.setCheck(subTask, this.props.task)}/>
                      </div>
                      <div className="name" style={this.setColor()}>{subTask.name}</div>
                      <div className="del" onClick={e => this.props.removeSubTask(subTask, this.props.task)}>
                        <Glyphicon bsSize="small" glyph="remove"/>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>

        </Modal.Body>
      </Modal>
    )
  }
}

export default SubTask;
