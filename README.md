# Front-end Web Development

## Start the application

First, install the dependencies using `yarn install`.

To start the React app, create a `.env` file in the root of this folder with the following content

```.env
REACT_APP_API_URL=url of your webservice
REACT_APP_AUTH0_DOMAIN=your auth0 domain
REACT_APP_AUTH0_CLIENT_ID=your auth0 clientid
REACT_APP_AUTH0_API_AUDIENCE=your unique auth0 id for the webservice
```

Then run `yarn start`.

## Run the tests with Cypress UI

First, install the dependencies using `yarn install`.

Create a `cypress.env.json`:

```json
{
  "auth_audience": "{YOUR_API_IDENTIFIER}",
  "auth_url": "https://{YOUR_DOMAIN}/oauth/token",
  "auth_client_id": "{YOUR_CLIENT_ID}",
  "auth_client_secret": "{YOUR_CLIENT_SECRET}",
  "auth_username": "{YOUR_TEST_USERNAME}",
  "auth_password": "{YOUR_TEST_PASSWORD}"
}
```

Then run `yarn test`.
