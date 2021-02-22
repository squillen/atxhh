import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Form from '../Form/Form';
import Dropdown from '../Dropdown/Dropdown';
import Checkbox from '../Checkbox/Checkbox';

import './UserSelections.scss';

const todaysDay = new Date().getDay();
const initialState = {
  food: true,
  drinks: true,
  prices: [
    ['$', true],
    ['$$', false],
    ['$$$', false],
    ['$$$$', false],
  ],
  selectedDays: [
    ['Sunday', todaysDay === 0],
    ['Monday', todaysDay === 1],
    ['Tuesday', todaysDay === 2],
    ['Wednesday', todaysDay === 3],
    ['Thursday', todaysDay === 4],
    ['Friday', todaysDay === 5],
    ['Saturday', todaysDay === 6],
  ],
  cuisines: [['JAPANESE', true]],
};

export default function UserSelections({ data, handleUpdate }) {
  const [activeDropdown, setActiveDropdown] = useState('');
  const [firstRender, setFirstRender] = useState(false);
  const [userSelections, setUserSelections] = useState(initialState);
  useEffect(() => {
    const readySearch = (array, cb) =>
      array.reduce((arr, tuple, idx) => {
        const [el, isTrue] = tuple;
        if (isTrue) arr.push(cb(el, idx));
        return arr;
      }, []);

    const search = {
      whatToGoFor: [],
      happyHourDays: readySearch(userSelections.selectedDays, (el, index) =>
        index.toString()
      ),
      prices: readySearch(userSelections.prices, (price) =>
        price.length.toString()
      ),
      cuisines: readySearch(userSelections.cuisines, (el) => el.toString()),
    };

    if (userSelections.food) search.whatToGoFor.push('food');
    if (userSelections.drinks) search.whatToGoFor.push('drinks');
    handleUpdate(search);
  }, [userSelections]);

  useEffect(() => {
    if (data.length && firstRender) {
      setFirstRender(true);
      const newCuisines = data.reduce((arr, el) => {
        const arrCopy = [...arr];
        el.cuisine.forEach((cuisine, idx) => {
          arrCopy[idx] = [];
          arrCopy[idx][0] = cuisine;
          arrCopy[idx][1] = true;
        });
        return arrCopy;
      }, []);
      setUserSelections({ ...userSelections, cuisines: newCuisines });
    }
  }, [data]);
  return (
    <Form>
      <div className="checkbox__selections">
        <h3 className="checkbox__selections--header">I want to:</h3>
        {['food', 'drinks'].map((choice) => (
          <Checkbox
            key={choice}
            onChange={() =>
              setUserSelections({
                ...userSelections,
                [choice]: !userSelections[choice],
              })
            }
            checked={userSelections[choice]}
            display={choice}
          />
        ))}
      </div>
      <div className="dropdowns">
        <Dropdown
          headerTitle="Cuisines"
          active={activeDropdown}
          setActive={setActiveDropdown}
        >
          {userSelections.cuisines.map(([cuisine, currentBool], idx) => {
            const newCuisines = [...userSelections.cuisines];
            newCuisines[idx][1] = !currentBool;
            return (
              <Checkbox
                labelRight
                key={cuisine}
                onChange={() =>
                  setUserSelections({
                    ...userSelections,
                    cuisines: newCuisines,
                  })
                }
                display={cuisine}
                checked={userSelections.cuisines[idx][1]}
              />
            );
          })}
        </Dropdown>
        <Dropdown
          headerTitle="Price"
          active={activeDropdown}
          setActive={setActiveDropdown}
        >
          {userSelections.prices.map(([display, currentBool], idx) => (
            <Checkbox
              labelRight
              key={display}
              onChange={() => {
                const newPrices = [...userSelections.prices];
                newPrices[idx][1] = !currentBool;
                setUserSelections({
                  ...userSelections,
                  prices: newPrices,
                });
              }}
              display={display}
              checked={userSelections.prices[idx][1]}
            />
          ))}
        </Dropdown>
        <Dropdown
          headerTitle="Days"
          active={activeDropdown}
          setActive={setActiveDropdown}
        >
          {userSelections.selectedDays.map(([day, currentBool], idx) => (
            <Checkbox
              labelRight
              key={day}
              onChange={() => {
                const newSelectedDays = [...userSelections.selectedDays];
                newSelectedDays[idx][1] = !currentBool;
                setUserSelections({
                  ...userSelections,
                  selectedDays: [...newSelectedDays],
                });
              }}
              display={day}
              checked={currentBool}
            />
          ))}
        </Dropdown>
      </div>
    </Form>
  );
}

UserSelections.propTypes = {
  data: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
