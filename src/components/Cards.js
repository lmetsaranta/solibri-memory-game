import {useEffect, useState} from 'react';
import { ItemList } from '../itemList';
import Card from './Card';

const Cards = () => {
  const [items, setItems] = useState(ItemList);
  const [prev, setPrev] = useState(-1);

  useEffect(() => {
    items.sort(() => Math.random() - 0.5)
    setItems([...items]);
  }, []);

  const check = (current) => {
    if(items[current].id === items[prev].id) {
      items[current].status = 'correct';
      items[prev].status = 'correct';
      setItems([...items]);
      setPrev(-1)
    } else {
      items[current].status = 'wrong';
      items[prev].status = 'wrong';
      setItems([...items]);
      setPrev(-1);
      setTimeout(() => {
        items[current].status = '';
        items[prev].status = '';
        setItems([...items]);
      }, 1000);
    }
  }

  const handleClick =(id) => {
    if(prev === -1) {
      items[id].status = 'active';
      setItems([...items]);
      setPrev(id);
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
