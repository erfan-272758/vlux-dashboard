# admin

## Installation

Install the application dependencies by running:

```sh
yarn
```

## Development

Start the application in development mode by running:

```sh
yarn dev
```

## Production
### Requirements
add all env exists in `.env` file into process env and for build create `.env.local` in root directory and complete fields

Build the application in production mode by running:

```sh
yarn build
```

## DataProvider

The included data provider use [FakeREST](https://github.com/marmelab/fakerest) to simulate a backend.
You'll find a `data.json` file in the `src` directory that includes some fake data for testing purposes.

It includes two resources, posts and comments.
Posts have the following properties: `id`, `title` and `content`.
Comments have the following properties: `id`, `post_id` and `content`.

## Authentication

The included auth provider should only be used for development and test purposes.
You'll find a `users.json` file in the `src` directory that includes the users you can use.

You can sign in to the application with the following usernames and password:
- janedoe / password
- johndoe / password

