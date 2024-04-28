# Backend Application Tests

This file contains Jest test cases for the backend application. The tests cover various routes related to user setup, chat functionality, and calendar functionality. These tests ensure that the API endpoints are working correctly and returning the expected responses.

## Test Cases

### User Setup
These tests cover the routes related to user registration, login. They ensure that a user can successfully register and log in.

### Chat Functionality
These tests cover the routes related to creating chatrooms, sending messages, and fetching chat history. They ensure that users can create chatrooms, send messages to these chatrooms, and fetch the chat history.

The prerequirement is that Login succeeds.

### Calendar Functionality
These tests cover the routes related to creating events, updating events, and fetching events. They ensure that users can create events on a calendar, update these events, and fetch the events.

Each of these test cases would send a request to the respective API endpoint and then check the response to ensure it has the correct status code and body. This helps ensure that the backend application is working correctly.

The prerequirement is that Login succeeds.

# Usage

Make sure that backend is not running on this computer
start tests with -npm run test

# Other

UI testing was done manually.