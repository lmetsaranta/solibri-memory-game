import {useEffect, useState} from 'react';
import { ItemList, ITEM_STATUS } from '../data/itemList';
import Card from './Card';
import { shuffle } from "../utils";

const Cards = () => {
  const [items, setItems] = useState(ItemList);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [preventClick, setPreventClick] = useState(false);

  useEffect(() => {
    const newItems = [...items];
    shuffle(newItems);
    setItems(newItems);
  }, []);

  const check = (currentIndex) => {
    if(items[currentIndex].number === items[prevIndex].number) {
      // It's a Match
      const newItems = [...items];
      newItems[currentIndex].status = ITEM_STATUS.CORRECT;
      newItems[prevIndex].status = ITEM_STATUS.CORRECT;
      setItems(newItems);
      setPrevIndex(-1);
      setPreventClick(false);
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
    setTimeout(() => {
      const newItems = [...items];
      newItems[currentIndex].status = '';
      newItems[prevIndex].status = '';
      setItems(newItems);
      setPreventClick(false);
    }, 1000);
  }

  const handleClick = (id) => {
    if (preventClick || items[id].status === ITEM_STATUS.CORRECT) {
      return;
    }

    if(prevIndex === -1) {
      const newItems = [...items];
      newItems[id].status = ITEM_STATUS.ACTIVE;
      setItems(newItems);
      setPrevIndex(id);
    } else {
      setPreventClick(true);
     check(id);
    }
  }
  
    return (
      <div className={'container'}>
        {items.map((item, index) => {
          return (
            <Card key={item.id} item={item} id={index} handleClick={handleClick}/>
          )
        } )}
      </div>
    )
};

export default Cards;
