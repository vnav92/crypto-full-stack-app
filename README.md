<div align="center">
  <p>
    <img src="assets/logo_black.svg" width="250" />
  </p>
  <p>
    The new standard for fiat to crypto
  </p>
</div>

# Takehome Test (Full-Stack)

## Overview

This is a takehome test for candidates applying for a full-stack developer
position at MoonPay. It contains four sections: "Frontend", "Backend", "Databases" and "Follow-up" which
together include a series of tests involving HTML, CSS, JavaScript, Node.js and SQL.

Feel free to solve these questions however you see fit, using whatever coding
style or third-party libraries you think are appropriate.

To start the test, simply clone this repo and make your edits locally.

## Frontend

For the frontend portion of the test, use the `/frontend` folder. There are 7 features we'd like to add:

1. Fetch and display the list of currencies available on MoonPay (see endpoint below).
2. Add CSS to create a responsive layout that will display one column on mobile
   devices, two columns on tablet devices, and three columns on desktops.
3. Add a toggle to control if currencies not supported in the US should be displayed.
4. Add a toggle to control if currencies not available in test mode should be displayed.
5. Add a button to sort the list of currencies by alphabetical order using the name of the currencies.
6. Add a button to sort the list of currencies by alphabetical order using the symbol/code of the currencies.
7. Add a button to apply a random shuffle to the list of currencies when it is clicked.

Feel free to structure the code however you prefer and use third-party libraries at your discretion.

### API Information

- **MoonPay API `GET /v3/currencies` endpoint:** https://api.moonpay.io/v3/currencies

## Backend

For the backend portion of the test, use the `/backend` folder. We'd like to write some code that achieves the following:

1. Create a JSON API (REST or GraphQL) using Node.js which will return which cryptocurrency exchange we should use to buy a given amount of Bitcoin to minimise the amount of USD or USDT we'll spend on this trade.

Example API call (for 1 BTC):

```
curl http://localhost:4000/exchange-routing?amount=1
```

Example API response (if Coinbase price of \$10,000 / BTC is the cheapest):

```
{
  "btcAmount": 1,
  "usdAmount": 10000,
  "exchange": "coinbase"
}
```

2. You'll need to compare Binance and Coinbase Prime order books and compute the best execution price for the given amount of Bitcoin we want to buy. (You can assume that 1 USDT = 1 USD at all time.)
3. [Bonus] Add a third exchange to compare with Binance and Coinbase Prime.

Feel free to structure the code however you prefer and use third-party libraries at your discretion.

### API Information & Documentation

- **Crypto Trading 101: How to Read an Exchange Order Book:** https://www.coindesk.com/crypto-trading-101-how-to-read-an-exchange-order-book
- **Binance API Documentation:** https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md
- **Coinbase Prime API Documentation:** https://docs.prime.coinbase.com/

## Databases

For the databases portion of the test, use the `/databases` folder.

Let's say you have two SQL tables: `users` and `transactions`.

The `users` dataset has 1M+ rows; here are the first three:
| id | email | country |
|--------|------------------|---------|
| user_1 | user1@moonpay.io | FRA |
| user_2 | user2@moonpay.io | GBR |
| user_3 | user3@moonpay.io | USA |

The `transactions` dataset has 1M+ rows; here are the first three:
| id | quote_currency | usd_amount | user_id |
|---------------|----------------|------------|---------|
| transaction_1 | btc | 100 | user_3 |
| transaction_2 | btc | 2000 | user_2 |
| transaction_3 | eth | 50 | user_1 |

1. Create a SQL query that shows the TOP 3 customers who spent the most.
2. Write an SQL query to find out how many users spent more than $1,000 but less than $2,000.
3. Print every country where the average lifetime spending per user is lower than \$500.

## Follow-up

Answer the questions in the [FOLLOW-UP.md](./FOLLOW-UP.md) file.

## Submitting Your Code

Once you've completed the test, please compress your files (via zip or tar) and
return them as a link or email attachment in reply to your test invite. We'd like the
code in your submission to remain private, so please avoid committing or pushing
the code publicly.

Once we receive it, a member of our team will review and we'll get back to you
as soon as possible.

Thanks!
