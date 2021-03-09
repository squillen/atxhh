import { useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { UPDATE_RESTAURANT_MUTATION } from '../../utils/graphql/mutations';

// COMPONENTS
import Checkbox from '../Checkbox';
import Button from '../Button';
import Form from '../Form';

// HELPERS
import { useAuthentication } from '../../hooks/useAuthentication';

const potentialProblems = [
  ['Wrong hours/days', false, 'WRONG_HOURS'],
  ['No longer applicable', false, 'NO_LONGER_ACTIVE'],
];

export default function ReportProblems({ restaurantID, warnings }) {
  const currentUser = useAuthentication();
  const [updateRestaurant] = useMutation(UPDATE_RESTAURANT_MUTATION);
  const [problems, setProblems] = useState(potentialProblems);
  const handleChange = (idx, newBool) => {
    const newProblems = [...problems];
    newProblems[idx][1] = newBool;
    setProblems(newProblems);
  };

  const submitInfo = () => {
    const warningsCopy = warnings ? { ...warnings } : {};
    const newWarnings = problems.reduce((obj, [display, isTrue, key]) => {
      if (isTrue) {
        obj[key] = warningsCopy[key] > 0 ? warningsCopy[key] + 1 : 1;
      }
      return obj;
    }, {});
    console.log('newWarnings :>> ', newWarnings);
    updateRestaurant({
      ignoreResults: true,
      variables: {
        id: restaurantID,
        data: {
          warnings: newWarnings,
        },
      },
      onCompleted: ({ result }) => console.log('RESULT:::', result),
      onError: (err) => console.error('ERROR:::', err),
    });
  };
  return (
    <div className="problems-container">
      <div className="problems-container__header">
        <div className="text">oh no! what's wrong?</div>
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
    </div>
  );
}

ReportProblems.defaultProps = {
  warnings: {},
};

ReportProblems.propTypes = {
  restaurantID: PropTypes.string.isRequired,
  warnings: PropTypes.object,
};
