import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import { RESTAURANTS_QUERY } from '../../utils/graphql/queries';
import Form from '../Form';
import Dropdown from '../Dropdown';
import Checkbox from '../Checkbox';

import './styles.scss';

const todaysDay = new Date().getDay();
const initialState = {
  whatToGoFor: [
    ['food', true],
    ['drinks', true],
  ],
  prices: [
    ['All', true],
    ['$', true],
    ['$$', true],
    ['$$$', true],
    ['$$$$', true],
  ],
  selectedDays: [
    ['All', false],
    ['Sunday', todaysDay === 0],
    ['Monday', todaysDay === 1],
    ['Tuesday', todaysDay === 2],
    ['Wednesday', todaysDay === 3],
    ['Thursday', todaysDay === 4],
    ['Friday', todaysDay === 5],
    ['Saturday', todaysDay === 6],
  ],
  cuisines: [['All', true]],
};

export default function UserSelections({ originalData, handleUpdate }) {
  const [activeDropdown, setActiveDropdown] = useState('');
  const [search, setSearch] = useState({});
  const [userSelections, setUserSelections] = useState(initialState);
  const { data = {}, error, loading, refetch } = useQuery(RESTAURANTS_QUERY, {
    variables: search,
  });

  useEffect(() => {
    console.log('data :>> ', data);
    if (data && data.restaurants) {
      handleUpdate(data.restaurants.results);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [search]);

  // set all restaurant cuisines
  useEffect(() => {
    if (originalData.length && userSelections.cuisines.length <= 1) {
      const cuisinesIncluded = {};
      const newCuisines = originalData.reduce((arr, el) => {
        const arrCopy = [...arr];
        el.cuisine.forEach((cuisine) => {
          if (!cuisinesIncluded[cuisine]) {
            const tuple = [cuisine, true];
            arrCopy.push(tuple);
            cuisinesIncluded[cuisine] = true;
          }
        });
        return arrCopy;
      }, []);
      setUserSelections({
        ...userSelections,
        cuisines: [...userSelections.cuisines, ...newCuisines],
      });
    }
  }, [originalData]);

  useEffect(() => {
    const searchIfSelected = (array, cb) => {
      let formattedArray = [...array];
      if (array[0][0].toString().toLowerCase() === 'all')
        formattedArray = array.slice(1, array.length);
      return formattedArray.reduce((arr, tuple, idx) => {
        const [el, isSelected] = tuple;
        if (isSelected) arr.push(cb(el, idx));
        return arr;
      }, []);
    };

    const query = {
      happyHourDays: searchIfSelected(
        userSelections.selectedDays,
        (el, index) => index.toString()
      ),
      prices: searchIfSelected(userSelections.prices, (price) =>
        price.length.toString()
      ),
      cuisines: searchIfSelected(userSelections.cuisines, (el) =>
        el.toString()
      ),
      whatToGoFor: searchIfSelected(userSelections.whatToGoFor, (el) =>
        el.toString().toUpperCase()
      ),
    };
    console.log('query :>> ', query);
    setSearch(query);
  }, [userSelections]);

  // helpers
  const updateUserSelectionTupleValue = (key, idx, value) => {
    const newArr = [...userSelections[key]];
    const display = newArr[idx][0];
    if (display.toString().toLowerCase() === 'all') {
      newArr.forEach((el) => {
        el[1] = value;
      });
    } else {
      if (newArr[0][0].toString().toLowerCase() === 'all') {
        newArr[0][1] = !userSelections.whatToGoFor[0][1];
      }
      newArr[idx][1] = value;
    }
    console.log('newArr :>> ', newArr);
    setUserSelections({
      ...userSelections,
      [key]: newArr,
    });
  };

  return (
    <div className="user-selections__form">
      <Form>
        <div className="checkbox__selections">
          <h3 className="checkbox__selections--header">I want:</h3>
          {userSelections.whatToGoFor.map(([display, currentBool], idx) => (
            <Checkbox
              labelRight
              key={display}
              onChange={() =>
                updateUserSelectionTupleValue('whatToGoFor', idx, !currentBool)
              }
              display={display}
              checked={userSelections.whatToGoFor[idx][1]}
            />
          ))}
        </div>
        <div className="dropdowns">
          <div className="selection">
            <h4 className="selection--header">Cost:</h4>
            <div className="selection--checkboxes">
              {userSelections.prices.map(([display, currentBool], idx) => (
                <div key={display} className="selection--checkbox">
                  <Checkbox
                    labelRight
                    key={display}
                    onChange={() =>
                      updateUserSelectionTupleValue('prices', idx, !currentBool)
                    }
                    display={display}
                    checked={userSelections.prices[idx][1]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="selection">
            <h4 className="selection--header">On:</h4>
            <div className="selection--checkboxes">
              {userSelections.selectedDays.map(([day, currentBool], idx) => (
                <div key={day} className="selection--checkbox">
                  <Checkbox
                    labelRight
                    key={day}
                    onChange={() =>
                      updateUserSelectionTupleValue(
                        'selectedDays',
                        idx,
                        !currentBool
                      )
                    }
                    display={day}
                    checked={currentBool}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="selection full-width">
            <Dropdown
              headerTitle="Cuisines"
              active={activeDropdown}
              setActive={setActiveDropdown}
            >
              {userSelections.cuisines.map(([cuisine, currentBool], idx) => (
                <Checkbox
                  labelRight
                  key={cuisine}
                  onChange={() =>
                    updateUserSelectionTupleValue('cuisines', idx, !currentBool)
                  }
                  display={cuisine.split('_').join(' ')}
                  checked={userSelections.cuisines[idx][1]}
                />
              ))}
            </Dropdown>
          </div>
        </div>
      </Form>
    </div>
  );
}

UserSelections.propTypes = {
  originalData: PropTypes.array.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};
