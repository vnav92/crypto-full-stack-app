# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
  - Chakra UI - gave me have some ready UI components like: button, switch etc. I have chosen this library over i.e. Material UI or AntDesign because my impression is that Chakra UI has the easiest configuration and styles overriding which in my opinion is very important aspect by such small projects,
  - react-query - I realise that in such a very small project library like this could look like an overkill but in this project I wanted to show how would I prepare app to be extended in the future (I will elaborate more about it in the last answer of this section). I generally very like to use react-query. It simplifies development, it is flexible (you can pass anything to the hook, it only needs to return promise) and it gives a lot of useful benefits (caching, easy to use error information and many more).
  - axios - data-fetching library
  - classnames - I like to use this library because it provides very rich classNames manipulation possibilities, making i.e. conditional styling much, much easier
  - lodash - let me use 'orderBy', 'shuffle' etc and avoid additional workload,
  - node-sass - I really like to use scss. I also like to use StyledComponents but I felt like scss-modules and classnames will be a perfect choice in this case. I like to use StyledComponents when I have to deal with more logic-related styles, i.e. when app uses theming,

### Q) What's the command to start the frontend application locally?
npm start

### Q) What libraries did you add to the backend? What are they used for?
- nodemon - provides hot reloading which simplifies development and lets save some time
- decimal.js - it is very useful (in case of our app) in handling decimal numbers in a correct way, thanks to it 0.1 + 0.2 finally equals 0.3 ;)!
- dotenv - handles usage of .env file
- express - I like how express simplifies work with requests, responses, routes etc.
- http-codes - very useful enum, which provides each status code - it is not always very easy to memorise every status code, http-codes allows to use human friendly names and converts them to status
- node-fetch - allows execute http request from the node.js app
- winston - thanks to this library we can have fully configurable app logs, in case of this project just a small config is enough but just in case of bigger needs it is possible to configure a lot of aspect, even saving logs to the certain file

### Q) What's the command to start the backend application locally?
npm start / npm start:dev

### Q) Any other comments we should read before evaluating your solution?
Just one: I realise that in both parts you may have an impression that I splitted code too strongly, that some solutions may look like overengineering. I mean here for example adding a lot of reusable components, adding the consts for colors, creating dedicated directory for modules, adding react-query etc. For backend part it may be: adding exchange urls to .env, adding dedicated directories for routes and validation and many more. I just would like you to know that I am aware of that but also I wanted to show how would I prepare the application to be developed and extended.
---

# General:

### Q) If you had more time, what further improvements or new features would you add?
Front-end:
 - search by coin name/symbol (search input),
 - I think that this type of layout is a great candidate to add a skeleton layout for loading state
 - I would return currency logos and display them in the cards using lazy loading,
 - If we plan to handle more coins in the future I would think about adding some pagination and server-side filtering and sorting
 - Preview of the current price of certain coin could be interesting
 - I would add the tests to whole functionality
 - I would improve the UI to be more attractive
 - Feature of displaying coin details would be interesting - after clicking on a certain card, some details would be displayed - price and few sentences about the coin
 
 Back-end:
 - I would add possibility to check other pairs of tokens,
 - I would add more robust tests (I only added the test for exchange.service.ts because I want to be sure that critical logic of counting the amount of money works correctly)
 - I would add possibility to check even more exchanges - the information which ones could be provided by request to the api
 - We can reverse the logic - we could check also which exchange would give us the biggest amount of certain crypto for given amount of usd/usdt

### Q) Which parts are you most proud of? And why?
Front-end: I think that I handled the logic of paralelly applied filters in a developer-friendly and easily-extendable way. In 'get-filtered-currencies' I wanted the logic to easily receive a new type of filter/sorter. There is no additional logic required to extend functionality - just a new record in config needs to be added.

Back-end: I like the way I handled the 'exchange.validator.ts' and mechanism of checking the cheapest exchange.
Similarly to front-end description, in those two places I also wanted to introduce logic which could be extended easily. In validator we can add more rules and in 'exchange.service.ts' => 'getTheCheapestExchange()' we also can add more exchanges to be checked just by adding another object to function argument config.

### Q) Which parts did you spend the most time with? What did you find most difficult?
This answer partially covers the previous one. I spend the most time in front-end to arrange easy to extend filter/sort logic. I have to confess that my initial choice about UI library wasn't the best. I initially picked AntDesign but after some time I realised that it required to much overriding, even for such a small project.

In back-end I spent the most time on adjusting calculations of decimals / making sure it is working correctly. 

### Q) How did you find the test overall? Did you have any issues or have difficulties completing? If you have any suggestions on how we can improve the test, we'd love to hear them.
The task was very interesting for me. In my career I used to work on few of them. I often had a feeling that I have to do the same as in previous one, instructions were just a little bit different. 

When I was working on your task I had a feeling that someone arranged some parts in non-obvious way intentionally (like combining the sorters/filters), also exploring and using crypto exchanges was a fun for me. Presence of useful links in readme was helpful, instruction was clear.

Thank you for spending your time on reviewing my code, I am always opened for a comments and suggestions.
