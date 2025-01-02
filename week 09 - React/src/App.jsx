import React from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const FaultyComponent = () => {
  throw new Error('Intentional Error');
  return <div>Item No. 05</div>; // This line won't execute.
};

const App = () => {
  return (
    <div className="flex flex-col justify-center gap-5 text-2xl m-10">
      <div>Item No. 01</div>
      <div>Item No. 02</div>
      <div>Item No. 03</div>
      <div>Item No. 04</div>

      {/* Wrapping FaultyComponent with ErrorBoundary */}
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>

      <div>Item No. 06</div>
      <div>Item No. 07</div>

    </div>
  );
};

export default App;
