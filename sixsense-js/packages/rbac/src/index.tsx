import React from 'react';
import { add, formatDate } from './utils';

const ExampleComponent: React.FC = () => {
  const sum = add(5, 7);

  const today = formatDate(new Date());

  return (
    <div>
      <h1>Simple Demo</h1>
      <p>
        <strong>5 + 7 =</strong> {sum}
      </p>
      <p>
        <strong>Today’s date is:</strong> {today}
      </p>
    </div>
  );
};

export default ExampleComponent;
