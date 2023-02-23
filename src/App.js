import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, []);

  const getTransactions = async () => {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        dateTime
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDateTime('');
        setDescription('');
        console.log('result: ', json)
      })
    })
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={handleSubmit}>

        <div className="basic">

          <input
            type="text"
            placeholder={'+200 new tv'}
            onChange={ev => setName(ev.target.value)}
            value={name}
          />

          <input
            type="datetime-local"
            value={dateTime}
            onChange={ev => setDateTime(ev.target.value)}
          />

        </div>

        <div className="description">
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
          />
        </div>

        <button type="submit">Add new expense</button>

      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => {
          return (<div className="transaction">
            <div className="left">
              <div className="name">
                {transaction.name}
              </div>
              <div className="description">
                {transaction.description}
              </div>
            </div>

            <div className="right">
              <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                {transaction.price}
              </div>
              <div className="datetime">
                {transaction.dateTime}
              </div>
            </div>
          </div>
          )
        })}

      </div>
    </main>
  );
}

export default App;
