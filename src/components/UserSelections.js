import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import Toggle from './Toggle';
import Form from './Form';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import { useListener } from '../hooks/helpers';

const todaysDay = new Date().getDay();
const initialState = {
  whatToGoFor: [
    ['food', true],
    ['drinks', true],
  ],
  price: [
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
  times: ['24:00', '00:00'],
  cuisine: [['All', true]],
};

export default function UserSelections({
  showSelections,
  setShowSelections,
  originalRestaurants,
  handleSearchUpdate,
}) {
  if (!originalRestaurants.length) return null;
  const [activeDropdown, setActiveDropdown] = useState('');
  const [happeningNow, setHappeningNow] = useState(false);
  const [atTop, setAtTop] = useState(false);
  const [userSelections, setUserSelections] = useState(initialState);
  const [search, setSearch] = useState({});

  // WINDOW LISTENER
  function checkIfAtTop() {
    const isTop = window.scrollY > 150;
    setAtTop(isTop);
  }
  useListener('scroll', checkIfAtTop, 'window');

  // /// EFFECTS /////
  // update restaurant results in Home
  useEffect(() => {
    handleSearchUpdate(search);
  }, [search]);

  useEffect(() => {
    let times = ['24:00', '00:00'];
    const { selectedDays } = userSelections;
    let newSelectedDays = [...selectedDays];
    if (happeningNow) {
      const [hour, min] = new Date().toTimeString().split(' ')[0].split(':');
      const timeNow = `${hour}:${min}`;
      times = [timeNow, timeNow];
      newSelectedDays = selectedDays.map((tuple, idx) => {
        if (idx - 1 === todaysDay) tuple[1] = true;
        else tuple[1] = false;
        return tuple;
      });
    }
    setUserSelections({
      ...userSelections,
      times,
      selectedDays: newSelectedDays,
    });
  }, [happeningNow]);

  // set restaurant cuisines on data
  useEffect(() => {
    if (originalRestaurants.length && userSelections.cuisine.length <= 1) {
      const cuisinesIncluded = {};
      const newCuisines = originalRestaurants.reduce((arr, el) => {
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
        cuisine: [...userSelections.cuisine, ...newCuisines],
      });
    }
  }, [originalRestaurants, userSelections.cuisine]);

  // update search object
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
      happyHourDays_in: searchIfSelected(
        userSelections.selectedDays,
        (el, index) => index.toString(),
      ),
      price_in: searchIfSelected(userSelections.price, (price) =>
        price.length.toString(),
      ),
      cuisine_in: searchIfSelected(userSelections.cuisine, (el) =>
        el.toString(),
      ),
      whatToGoFor_in: searchIfSelected(userSelections.whatToGoFor, (el) =>
        el.toString().toUpperCase(),
      ),
      startTime_lte: userSelections.times[0],
      endTime_gte: userSelections.times[1],
    };
    setSearch(query);
  }, [userSelections]);

  // helpers
  const updateUserSelectionTupleValue = (key, idx, value) => {
    const selection = userSelections[key] ?? [[]];
    const newArr = [...selection];
    if (key === 'selectedDays' && newArr[idx] !== todaysDay + 1)
      setHappeningNow(false);
    const display = newArr[idx][0] || '';
    if (display.toString().toLowerCase() === 'all') {
      newArr.forEach((el) => {
        el[1] = value;
      });
    } else {
      newArr[idx][1] = value;
    }
    setUserSelections({
      ...userSelections,
      [key]: newArr,
    });
  };

  return (
    <div
      className={atTop ? 'selections-container--white' : 'selections-container'}
    >
      <Toggle
        toggle={showSelections}
        showLabel='Show filters'
        hideLabel='Hide filters'
        onClick={() => setShowSelections(!showSelections)}
      />
      <div
        className={`user-selections__form ${
          showSelections ? 'selections--show' : 'selections--hide'
        }`}
      >
        <Form>
          <div className='checkbox__selections'>
            <h3 className='checkbox__selections--header'>I want:</h3>
            {userSelections.whatToGoFor.map(([display, currentBool], idx) => (
              <Checkbox
                labelRight
                key={display}
                onChange={() =>
                  updateUserSelectionTupleValue(
                    'whatToGoFor',
                    idx,
                    !currentBool,
                  )
                }
                display={display}
                checked={userSelections.whatToGoFor[idx][1]}
              />
            ))}
          </div>
          <div className='checkbox__selections'>
            <h3 className='checkbox__selections--header'>Happening now:</h3>
            <Checkbox
              labelRight
              onChange={() => setHappeningNow(!happeningNow)}
              checked={happeningNow}
            />
          </div>
          <div className='dropdowns'>
            <div className='selection'>
              <h4 className='selection--header'>Cost:</h4>
              <div className='selection--checkboxes'>
                {userSelections.price.map(([display, currentBool], idx) => (
                  <div key={display} className='selection--checkbox'>
                    <Checkbox
                      labelRight
                      key={display}
                      onChange={() =>
                        updateUserSelectionTupleValue(
                          'price',
                          idx,
                          !currentBool,
                        )
                      }
                      display={display}
                      checked={userSelections.price[idx][1]}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='selection'>
              <h4 className='selection--header'>On:</h4>
              <div className='selection--checkboxes'>
                {userSelections.selectedDays.map(([day, currentBool], idx) => (
                  <div key={day} className='selection--checkbox'>
                    <Checkbox
                      labelRight
                      key={day}
                      onChange={() =>
                        updateUserSelectionTupleValue(
                          'selectedDays',
                          idx,
                          !currentBool,
                        )
                      }
                      display={day}
                      checked={currentBool}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className='selection full-width'>
              <Dropdown
                headerTitle='Cuisines'
                active={activeDropdown}
                setActive={setActiveDropdown}
              >
                {userSelections.cuisine.map(([cuisine, currentBool], idx) => (
                  <Checkbox
                    labelRight
                    key={cuisine}
                    onChange={() =>
                      updateUserSelectionTupleValue(
                        'cuisine',
                        idx,
                        !currentBool,
                      )
                    }
                    display={cuisine.split('_').join(' ')}
                    checked={userSelections.cuisine[idx][1]}
                  />
                ))}
              </Dropdown>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

UserSelections.propTypes = {
  originalRestaurants: PropTypes.array.isRequired,
  handleSearchUpdate: PropTypes.func.isRequired,
  showSelections: PropTypes.bool.isRequired,
  setShowSelections: PropTypes.func.isRequired,
};
