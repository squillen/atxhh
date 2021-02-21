import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import Dropdown from '../Dropdown/Dropdown';
import Checkbox from '../Checkbox/Checkbox';

import './UserSelections.scss';

export default function UserSelections({ data }) {
  const [userSelections, setUserSelections] = useState({
    eat: true,
    drink: true,
    cuisines: {},
    prices: {
      $: true,
      $$: false,
      $$$: false,
      $$$$: false,
    },
    selectedDays: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    },
  });

  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    if (!cuisines.length) {
      const newCuisines = data.reduce((obj, el) => {
        const objCopy = { ...obj };
        objCopy[el.cuisine] = false;
        return objCopy;
      }, {});
      setCuisines(newCuisines);
      setUserSelections({
        ...userSelections,
        cuisines: { ...userSelections.cuisines, ...cuisines },
      });
    }
  }, [data]);
  return (
    <Form>
      <div className="checkbox__selections">
        <h3 className="checkbox__selections--header">I want to:</h3>
        {['eat', 'drink'].map((choice) => (
          <Checkbox
            key={choice}
            onClick={() =>
              setUserSelections({
                ...userSelections,
                [choice]: !userSelections[choice],
              })
            }
            checkedTest={(el) => userSelections[el]}
            display={choice}
          />
        ))}
      </div>
      <div className="dropdowns">
        <Dropdown headerTitle="Cuisines">
          {Object.keys(cuisines).map((cuisine) => (
            <Checkbox
              labelRight
              key={cuisine}
              onClick={() =>
                setUserSelections({
                  ...userSelections,
                  cuisines: {
                    ...userSelections.cuisines,
                    [cuisine]: !userSelections.cuisines[cuisine],
                  },
                })
              }
              display={cuisine}
              checkedTest={(el) => userSelections.cuisines[el]}
            />
          ))}
        </Dropdown>
        <Dropdown headerTitle="Price">
          {Object.keys(userSelections.prices).map((price) => (
            <Checkbox
              labelRight
              key={price}
              onClick={() =>
                setUserSelections({
                  ...userSelections,
                  prices: {
                    ...userSelections.prices,
                    [price]: !userSelections.prices[price],
                  },
                })
              }
              display={price}
              checkedTest={(el) => userSelections.prices[el]}
            />
          ))}
        </Dropdown>
        <Dropdown headerTitle="Days">
          {Object.keys(userSelections.selectedDays).map((day) => (
            <Checkbox
              labelRight
              key={day}
              onClick={() =>
                setUserSelections({
                  ...userSelections,
                  selectedDays: {
                    ...userSelections.selectedDays,
                    [day]: !userSelections.selectedDays[day],
                  },
                })
              }
              display={day}
              checkedTest={(el) => userSelections.selectedDays[el]}
            />
          ))}
        </Dropdown>
      </div>
    </Form>
  );
}

UserSelections.propTypes = {
  data: PropTypes.array.isRequired,
};
