import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'
import List from './List'
import { FormGroup, FormControl, InputGroup, Glyphicon, Checkbox } from 'react-bootstrap';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newList: null
    }
  }
  render() {
    const {match} = this.props;
    return (
      <div className="container">
        <h1>Lists</h1>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Add a List"
              onChange={e => this.setState({newList: e.target.value})}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  if(this.state.newList !== null) {
                    this.props.addList(this.state.newList);
                    this.setState({newList: null})
                  }
                }
              }}
            />
            <InputGroup.Addon onClick={e =>{
              if(this.state.newList !== null) {
                console.log("IN")
                this.props.addList(this.state.newList);
                this.setState({newList: null})
              }
            }}>
              <Glyphicon glyph="plus"/>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.props.lists.map(list => {
            return (
              <div className="task" key={list.id}>
                <Link className="name" to={`lists/${list.id}`}>{list.name}</Link>
                <div className="del" onClick={e => this.props.removeList(list)}>
                  <Glyphicon bsSize="small" glyph="remove"/> </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Lists
