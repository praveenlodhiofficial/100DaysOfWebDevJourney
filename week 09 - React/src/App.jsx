import React from 'react'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import BuggyComponent from './components/BuggyComponent'

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </>
  )
}

export default App