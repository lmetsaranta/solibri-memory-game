import {useEffect, useState} from 'react';
import { ItemList, ITEM_STATUS } from '../data/itemList';
import Card from './Card';
import { shuffle } from "../utils";

const Cards = () => {
  const [items, setItems] = useState(ItemList);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [timeoutIId, setTimeoutId] = useState(null);

  useEffect(() => {
    setItems((oldItems) => shuffle(oldItems));
  }, []);

  const check = (currentIndex) => {
    if(items[currentIndex].id === items[prevIndex].id) {
      // It's a Match
      const newItems = [...items];
      newItems[currentIndex].status = ITEM_STATUS.CORRECT;
      newItems[prevIndex].status = ITEM_STATUS.CORRECT;
      setItems(newItems);
      setPrevIndex(-1);
    } else {
      // It's not a Match
      const newItems = [...items];
      newItems[currentIndex].status = ITEM_STATUS.WRONG;
      newItems[prevIndex].status = ITEM_STATUS.WRONG;
      setItems(newItems);
      setPrevIndex(-1);

      reset(currentIndex);
    }
  }

  const reset = (currentIndex) => {
    clearTimeout(timeoutIId);
    const _timeoutId = setTimeout(() => {
      const newItems = [...items];
      newItems[currentIndex].status = '';
      newItems[prevIndex].status = '';
      setItems(newItems);
    }, 1000);
    setTimeoutId(_timeoutId);
  }

  const handleClick = (id) => {
    if(prevIndex === -1) {
      setItems((oldItems) => {
        oldItems[id].status = ITEM_STATUS.ACTIVE;
        return oldItems;
      });
      setPrevIndex(id);
    } else {
     check(id);
    }
  }
  
    return (
      <div className={'container'}>
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick}/>
        ))}
      </div>
    )
};

export default Cards;
