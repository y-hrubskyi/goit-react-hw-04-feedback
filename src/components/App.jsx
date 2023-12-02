import { useState } from 'react';

import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

import { GlobalStyle } from './GlobalStyle';
import { Layout } from './App.styled';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const values = Object.values(feedback);
    return values.reduce((total, item) => total + item, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();

    return ((good * 100) / total).toFixed(0);
  };

  const handleClick = key => {
    setFeedback(prevState => ({ ...prevState, [key]: prevState[key] + 1 }));
  };

  const total = countTotalFeedback();

  return (
    <Layout>
      <GlobalStyle />

      <Section title="Please leave a feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            stats={feedback}
            total={total}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Layout>
  );
};
