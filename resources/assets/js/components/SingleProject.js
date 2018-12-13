import axios from 'axios'
import React, { Component } from 'react'

class SingleProject extends Component {
  constructor (props) {
    super(props)
    this.state = {
      project: {},
      t: []
    }
    this.handleMarkProjectAsCompleted = this.handleMarkProjectAsCompleted.bind(this)
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddNewTask = this.handleAddNewTask.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)

  }
  handleFieldChange (event) {
      this.setState({
        title: event.target.value
      })
    }

    handleAddNewTask (event) {
      event.preventDefault()

      const task = {
        title: this.state.title,
        project_id: this.state.project.id
      }

      axios.post('/api/t', task)
        .then(response => {
          // clear form input
          this.setState({
            title: ''
          })
          // add new task to list of t
          this.setState(prevState => ({
            t: prevState.t.concat(response.data)
          }))
        })
        .catch(error => {
          this.setState({
            errors: error.response.data.errors
          })
        })
    }

    hasErrorFor (field) {
      return !!this.state.errors[field]
    }

    renderErrorFor (field) {
      if (this.hasErrorFor(field)) {
        return (
          <span className='invalid-feedback'>
            <strong>{this.state.errors[field][0]}</strong>
          </span>
        )
      }
    }
  handleMarkProjectAsCompleted () {
      const { history } = this.props

      axios.put(`/api/projects/${this.state.project.id}`)
        .then(response => history.push('/'))
  }

  componentDidMount () {
    const projectId = this.props.match.params.id

    axios.get(`/api/projects/${projectId}`).then(response => {
      this.setState({
        project: response.data,
        t: response.data.t
      })
    })
  }
  handleMarkTaskAsCompleted (taskId) {
      axios.put(`/api/t/${taskId}`).then(response => {
        this.setState(prevState => ({
          t: prevState.t.filter(task => {
            return task.id !== taskId
          })
        }))
      })
    }
  render () {
    const { project, t } = this.state

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>{project.name}</div>
              <div className='card-body'>
                <p>{project.description}</p>

                <button className='btn btn-primary btn-sm' onClick={this.handleMarkTaskAsCompleted.bind(this,task.id)}>
            Mark as completed
        </button>
                <hr />

                <ul className='list-group mt-3'>
                  {t.map(task => (
                    <li
                      className='list-group-item d-flex justify-content-between align-items-center'
                      key={task.id}
                    >
                      {task.title}

                      <button className='btn btn-primary btn-sm'>
                        Mark as completed
                      </button>
                    </li>
                  ))}
                </ul>
                <form onSubmit={this.handleAddNewTask}>
      <div className='input-group'>
        <input
          type='text'
          name='title'
          className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
          placeholder='Task title'
          value={this.state.title}
          onChange={this.handleFieldChange}
        />
        <div className='input-group-append'>
          <button className='btn btn-primary'>Add</button>
        </div>
        {this.renderErrorFor('title')}
      </div>
    </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default SingleProject