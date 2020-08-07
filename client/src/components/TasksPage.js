import React from 'react'
import TaskList from './TaskList'

const TASK_STATUSES = ['Unstarted', 'In Progress', 'Completed']

class TasksPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNewCardForm: false,
      title: '',
      description: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.createTask = this.createTask.bind(this)
    this.toggelForm = this.toggelForm.bind(this)
    this.renderTaskLisks = this.renderTaskLisks.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  resetForm() {
    this.setState({
      showNewCardForm: false,
      title: '',
      description: '',
    })
  }

  toggelForm() {
    this.setState({ showNewCardForm: !this.state.showNewCardForm })
  }

  createTask(e) {
    e.preventDefault()
    const { title, description } = this.state
    this.props.createTask({
      title,
      description,
    })
    this.resetForm()
  }

  renderTaskLisks() {
    const { tasks } = this.props
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter((task) => task.status === status)
      return <TaskList
              key={status}
              tasks={statusTasks}
              status={status}
              onStatusChange={this.props.onStatusChange}
            />
    })
  }

  render() {
    const { title, description, showNewCardForm } = this.state
    return (
      <div className="task-list">
        <div className="task-list-header">
          <button className="button button-default" onClick={this.toggelForm}>
            + New Task
          </button>
        </div>
        {showNewCardForm && (
          <form className="task-list-form" onSubmit={this.createTask}>
            <input
              name="title"
              value={title}
              placeholder="Title"
              onChange={this.handleChange}
              className="full-width-input"
              type="text"
            />
            <input
              name="description"
              value={description}
              placeholder="About Task"
              onChange={this.handleChange}
              className="full-width-input"
              aria-multiline="true"
              type="text"
            />
            <button type="submit" className="button">Submit</button>
          </form>
        )}
        <div className="task-lists">
          {this.renderTaskLisks()}
        </div>
      </div>
    )
  }
}

export default TasksPage
