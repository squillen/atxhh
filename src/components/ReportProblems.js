import { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { UPDATE_RESTAURANT_MUTATION } from '../utils/graphql/mutations';

// COMPONENTS
import Checkbox from './Checkbox';
import Button from './Button';
import Form from './Form';

// HELPERS
import {
  canUserReportRestaurantProblem,
  updateUserReportedProblems,
} from '../utils/helpers';
import BackgroundImageDiv from './BackgroundImageDiv';

const potentialProblems = [
  ['Wrong hours/days', false, 'WRONG_TIMES'],
  ['No longer applicable', false, 'NO_LONGER_ACTIVE'],
  ['Broken link', false, 'BROKEN_LINK'],
];

export default function ReportProblems({
  restaurantID,
  warnings,
  handleClose,
}) {
  const userCanSubmitWarnings = canUserReportRestaurantProblem(restaurantID);
  const [alreadyReportedProblem, setAlreadyReportedProblem] = useState(
    !userCanSubmitWarnings,
  );
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const handleCompleted = (id) => {
    setSubmissionSuccess(true);
    return updateUserReportedProblems(id);
  };
  const handleError = (error) => {
    console.error('ERROR:::', error);
    return setSubmissionError(true);
  };
  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT_MUTATION, {
    ignoreResults: true,
    onCompleted: () => handleCompleted(restaurantID),
    onError: (err) => handleError(err),
  });
  const [problems, setProblems] = useState(potentialProblems);
  const handleChange = (idx, newBool) => {
    const newProblems = [...problems];
    newProblems[idx][1] = newBool;
    setProblems(newProblems);
  };

  const submitInfo = (e) => {
    e.preventDefault();
    if (userCanSubmitWarnings) {
      const warningsCopy =
        warnings && Object.keys(warnings).length ? { ...warnings } : {};
      const { __typename, ...warningsWithoutType } = warningsCopy;
      const newWarnings = problems.reduce((obj, [display, isSelected, key]) => {
        if (isSelected) {
          obj[key] = obj[key] >= 0 ? obj[key] + 1 : 1;
        }
        return obj;
      }, warningsWithoutType);
      updateRestaurant({
        variables: {
          id: restaurantID,
          data: {
            warnings: { ...newWarnings },
          },
        },
      });
    } else {
      setAlreadyReportedProblem(true);
    }
  };
  const reportProblemsDisplay = (
    <>
      <div className='problems-container__header'>
        <div className='header-image'>
          <BackgroundImageDiv
            image='./images/shiitake.jpg'
            styles={{ borderRadius: '1rem' }}
          />
        </div>
      </div>
      <div className='form-container'>
        <h2 className='text'>What&apos;s wrong?</h2>
        <Form>
          {problems.map(([display, bool], idx) => (
            <Checkbox
              key={display}
              labelRight
              display={display}
              checked={problems[idx][1]}
              onChange={() => handleChange(idx, !bool)}
            />
          ))}
        </Form>
      </div>
      <Button
        type='submit'
        styles={{ border: '3px solid #a33f4c' }}
        label='Report'
        onClick={submitInfo}
      />
    </>
  );
  const createDisplay = ({
    h2,
    h3,
    label = 'Close',
    onClick = handleClose,
  }) => (
    <div className='container'>
      <div className='header'>
        <h2>{h2}</h2>
        <h3>{h3}</h3>
      </div>
      <Button type='button' label={label} onClick={onClick} />
    </div>
  );
  const alreadyReportedProblemDisplay = createDisplay({
    h2: 'Oye!',
    h3:
      "It looks like you've already notified us of errors for this restaurant within the past 24 hours. Let us know a little later on. Thanks, hot sauce.",
  });
  const submissionSuccessDisplay = createDisplay({
    h2: 'Thanks for letting us know.',
    h3: "You're putting the happy in happy hour.",
  });
  const submissionErrorDisplay = createDisplay({
    h2: "Boo. We weren't able to report that.",
    h3: 'Try again?',
    onClick: submitInfo,
  });
  let display = reportProblemsDisplay;
  if (alreadyReportedProblem) display = alreadyReportedProblemDisplay;
  if (submissionSuccess) display = submissionSuccessDisplay;
  if (submissionError) display = submissionErrorDisplay;
  return <div className='problems-container'>{display}</div>;
}

ReportProblems.defaultProps = {
  warnings: {},
  handleClose: () => {},
};

ReportProblems.propTypes = {
  restaurantID: PropTypes.string.isRequired,
  warnings: PropTypes.object,
  handleClose: PropTypes.func,
};
