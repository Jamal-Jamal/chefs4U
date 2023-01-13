1/5/23
-Today I worked on creating the user table for the Accounts API. Added the specific fields and tried testing it with fastapi on port 8000
1/6
- Continued to work on the user table and get it set up with the accounts API so I can make post requests. Was able to successfully create accounts in the backend using the table I created. One thing that was hard to implement was extra fields if you type in true for the isChef boolean field and made the rest of the chef fields optional. But I was able to add optional fields and everything was working as expected

1/9
-I started to create the login page for the front end with react.js. This task was fairly simple given that there was an exploration on it. I set up the barebones of the login page without the use of authentication or a token.

1/10 - Finally finished the login page without authentication token, but I think that I need to implement a POST request within the logic so that when a user logs in they use their account credentials which gets sent to the back end so they can login to their account

1/11 -

1/12 - Today I have to update the account table so the username field is unique. We came to a conclusion that if two users had the same username it would log you into the first user account that was created. I also updated the user table to insert a UNIQUE attribute to the username column.
