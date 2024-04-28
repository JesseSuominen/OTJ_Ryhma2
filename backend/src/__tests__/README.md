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
"succeeded test.PNG" shows the expected result.  
IMPORTANT: make user can fail, if the user is not deleted  

# Other

UI testing was done manually.
For example:
- Header shows links to: Home, Calendar and Chat. Also Login and Sign up buttons. If logged in, shows logout button
- Home shows Buttons for: Home, Calendar and Chat

- clicking from Home (no user) -> Calendar: shows "Please Login to view Calendar." -text
- clicking from Home (no user) -> Chat: shows "No chatrooms available." -text

- clicking Signup shows signup form
    - on error show that Authorization failed
    - on succes state to logged in
- clicking Login shows login form
    - on error show that Authorization failed
    - on succes state to logged in

- clicking from Home -> Calendar: progress and events
    - Add progress: progression bar gets increased
    - Add event: opens minicalendar where you can select start and end date, fills calendar with your event(s)
    - clicking an event (date on calendar) opens up data from event and it can be deleted

- clicking from Home -> Chat: All possible joinable chatrooms and creating a room
    - clicking join on a chatroonm
        - your messages are on right side and others on left side
        - you can send a message

- clicking logout removes token and places you back to home page