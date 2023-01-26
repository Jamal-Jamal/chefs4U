1/4 - This day was dedicated to project planning. We worked on creating our endpoints, API-design, and writing out our tickets/stories through gitlab.

1/5 - We continued to create our ticket description for issues and started to work on setting up the barebones of the project so everyone had access to a project that had all the required folders and files for the back end and front end. This day mainly consisted of project set up.

1/6 -Today I worked on creating the user table for the Accounts API. Added the specific fields and tried testing it with fastapi on port 8000. Continued to work on the user table and get it set up with the accounts API so I can make post requests. Was able to successfully create accounts in the backend using the table I created. One thing that was hard to implement was extra fields if you type in true for the isChef boolean field and made the rest of the chef fields optional. But I was able to add optional fields and everything was working as expected

1/9 - Today, I began working on creating the login page for the front end of my project using react.js. This task was fairly simple as I had previously explored the concept, so I set up the barebones of the login page without the use of authentication or a token. I created the basic structure of the login form and added some placeholder text to give an idea of how the final product will look.

1/10 - I finally finished the login page without authentication token, but I realized that I need to implement a POST request within the logic so that when a user logs in they use their account credentials which gets sent to the back end so they can login to their account. I added a submit button to the form and created the necessary event handlers to handle form submissions.

1/11 - Today, I focused on CSS styling for the login and sign up page to improve the overall look and feel of the application. I added a background color, changed the font and added some padding to the form fields to make them more legible.

1/12 - I spent the day updating the account table so the username field is unique. We had discovered that if two users had the same username it would log you into the first user account that was created. I also updated the user table to insert a UNIQUE attribute to the username column to prevent this issue. I also added some validation to the form to ensure that users cannot submit the form with an already existing username.

1/13 - I attempted to set up front end token auth. I was able to implement front end auth for logging in and signing up. So now when users log in you can check the cookies and see that a token was generated. I added some logic to check if the token exists in the cookies and redirect the user to the login page if it doesn't.

1/17 - I submitted my first merge request where I have completed the login form/sign up form in the front end, and created the user table was directly merged to main. This was a big accomplishment and I am happy to see my work being incorporated into the main branch. I also added some comments to the code to help other understand my thought process and the logic behind the code.

1/18 - I spent the day writing a detailed readme file for my full stack coding project, including project start up instructions and a description of the project's features and functionality. I also included screenshots of the application to give users an idea of what to expect when they run the project.

1/19 - Today, I focused on fixing the delete button for the edit event form in my project. I added an alert that pops up to confirm the deletion of the event. This feature improves the user experience by giving them a double check before deleting an event.

1/20 - I had a difficult time implementing a get all accounts unit test for my project as it required connecting to the real database. Despite the challenges, I persisted and was able to complete the unit test. This helped me ensure that all the accounts were being retrieved correctly.

1/23 - I continued to work on the unit test with a peer and we were eventually able to get it to work by implementing a fake database. This allowed us to test the functionality without affecting the live data.

1/24 - I spent the day fixing some css styling for the delete button so that it was on the right side of the form. I also added some css styling to all the buttons for the application. This improved the overall look and feel of the application.

1/25 - I added some css styling to the navbar and added a background image. The css styling I used for the navbar mimicked a netflix browser type nav bar. Allthough css is fairly simple because you mainly have to import stuff and copy and paste I had a hard time figuring out how to update the text color for the navbar but was eventually able to implement it. Now the navbar looks more polished and consistent with the overall design.

1/26 - Today, I finished all of my features/stories so I spent the day pair programming with project mates that still had stories to work on. It was great to be able to help out and share knowledge with my team. Did some clean up including removing any print statements or console logs or comments out of the code.

1/27 - We have finished the project so today was a chill day.
