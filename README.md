# Project Instructions

Building a travel application. It’s common to pull basic data from an API, but many applications don’t just pull the weather, they pull in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

## Getting started

It would probably be good to first get your basic project setup and functioning. Follow the steps from the course up to Lesson 4 but don't add Service Workers just yet. We won't need the service workers during development and having extra caches floating around just means there's more potential for confusion. So, fork this repo and begin your project setup.

Using Node version stable until now: v20.12.0

Remember that once you clone, you will still need to install everything:
`cd` into your new folder and run:

- `npm install --legacy-peer-deps`

For development environments:

- `npm run build-dev`

For Production environments:

- `npm run build-prod`

For Test environments:

- `npm run build-test`

## Setting up the API

### Step 1: Signup for an API key / username

- GeoNames: https://www.geonames.org/export/web-services.html
- Weather Bit: https://www.weatherbit.io/account/create
- Pixa Bay: https://pixabay.com/api/docs/

### Step 2: Environment Variables

- [ ] Use npm or yarn to install the dotenv package `npm install dotenv`. This will allow us to use environment variables we set in a new file
- [ ] Create a new `.env` file in the root of your project
- [ ] Go to your .gitignore file and add `.env` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:

```
PIXABAY_API_KEY=**************************
WEATHER_BIT_API_KEY=**************************
```

- [ ] Add this code to the very top of your server/index.js file:

```
const dotenv = require('dotenv');
dotenv.config();
```

- [ ] Reference variables you created in the .env file by putting `process.env` in front of it, an example might look like this:

```
console.log(`Your API key is ${process.env.API_KEY}`);
```

...Not that you would want to do that. This means that our updated API credential settings will look like this:
