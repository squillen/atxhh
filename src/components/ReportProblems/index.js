import { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { UPDATE_RESTAURANT_MUTATION } from '../../utils/graphql/mutations';

// COMPONENTS
import Checkbox from '../Checkbox';
import Button from '../Button';
import Form from '../Form';

// HELPERS
import {
  canUserReportRestaurantProblem,
  updateUserReportedProblems,
} from '../../utils/helpers';

const potentialProblems = [
  ['Wrong hours/days', false, 'WRONG_TIMES'],
  ['No longer applicable', false, 'NO_LONGER_ACTIVE'],
];

export default function ReportProblems({ restaurantID, warnings }) {
  const userCanSubmitWarnings = canUserReportRestaurantProblem(restaurantID);
  const [alreadyReportedProblem, setAlreadyReportedProblem] = useState(
    !userCanSubmitWarnings
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
      <div className="problems-container__header">
        <h1 className="text">butter my biscuit! what&apos;s wrong?</h1>
      </div>
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
        <Button
          type="submit"
          className="submit-btn"
          label="submit"
          onClick={submitInfo}
        />
      </Form>
    </>
  );
  const alreadyReportedProblemDisplay = (
    <>
      <div className="header">
        <h1>Ah, shiitake!</h1>
        <h2>
          It looks like you&apos;ve already notified us of errors within the
          past 24 hours. Let us know a little later on. Thanks, hot sauce.
        </h2>
      </div>
    </>
  );
  const submissionSuccessDisplay = (
    <>
      <div className="header">
        <h1>Thanks for letting us know.</h1>
        <h2>You&apos;re a real class act.</h2>
      </div>
    </>
  );
  const submissionErrorDisplay = (
    <>
      <div className="header">
        <h1>Boo. We weren&apos;t able to report that.</h1>
        <h2>Try again?</h2>
      </div>
    </>
  );
  let display = reportProblemsDisplay;
  if (alreadyReportedProblem) display = alreadyReportedProblemDisplay;
  if (submissionSuccess) display = submissionSuccessDisplay;
  if (submissionError) display = submissionErrorDisplay;
  return <div className="problems-container">{display}</div>;
}

ReportProblems.defaultProps = {
  warnings: {},
};

ReportProblems.propTypes = {
  restaurantID: PropTypes.string.isRequired,
  warnings: PropTypes.object,
};
