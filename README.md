# smart_timer
Timer app for tracking work periods, with aim of observe most effective time cycles and protect mental wellbeing while working.

For working example https://sezgink.github.io/smart_timer

## Timer Details

For selecting current mission, by clicking "Select Mission Button" open missions list, click the one you want to make active mission, click garbage icon near list item to delete mission from list, click add mission to open add mission panel.
If user signed in, react app get and edit missions list by using backend application, if not signed in hold them in react state.

![Alt text](/md/TimerSelectMission.png?raw=true "Title")


Use start toggle to start timer, and use stop button to stop timer and add recent interval to the intervals list with the current mission.
If user signed in, app gets todays intervals from backend and add new intervals to the data on the backend.

![Alt text](/md/TimerGeneral2.png?raw=true "Title")


If user signed in, Work Chart navigation being visible, and user can select day intervals up to length of 7 days to see their daily work amount on charts,histogram and tasks they worked on.

![Alt text](/md/TimerWorkChart.png?raw=true "Title")

## Project Details

Used MaterialUI for most of component UIs, 
Mantine for data range picker, 
Formik for login and signup forms,
daysjs for date processing,
react-router-dom for routing on front-end.

Backend source link https://github.com/sezgink/smart_timer_backend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
