import React from 'react';
import { connect } from 'react-redux'

// import logo from './logo.svg';
import './App.css';
import TasksPage from './components/TasksPage'
import { createTask, updateTask } from './action'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.createTasks = this.createTasks.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
  }

  createTasks(title, description) {
    this.props.dispatch(createTask({ title, description }))
  }

  onStatusChange() {
    this.props.dispatch(updateTask(id, { status }))
  }

  render() {
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          createTask={this.createTasks}
          onStatusChange={this.onStatusChange}
        />
      </div>
    )
  }
}

function mapState(state) {
  const { tasks } = state
  return { tasks }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default connect(mapState)(App)
