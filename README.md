# Spotify-stats

Spotify Stats is a fun and interactive web application that allows you to visualize your personalized Spotify data. With Spotify Stats, you can view your top artists, top tracks, and recently played tracks. Whether you want to see which artists you listened to the most over the past year or get a better understanding of your music preferences, Spotify Stats has you covered.

To use the application, you will need to have a Spotify account and grant the application access to your Spotify data. Once you have done this, you can start exploring your personalized Spotify data and getting insights into your music listening habits.

# Live version

You can check the live version of this project [here](https://hamid-spotify.netlify.app/).

# Features

1. Top artists: View your most listened-to artists over a specified time period (e.g. past month, past year).
2. Top tracks: View your most played tracks over a specified time period.
3. Recently played tracks: View a list of the tracks you have recently played on Spotify.
4. Responsive design: The application is designed to be responsive, so it can be easily viewed on a variety of devices, including desktop computers, tablets, and smartphones.
5. Sending emails with a template using EmailJs

For instructions on how to install and set up the application, please see the installation instructions.

# Installation

1. Clone this project locally
2. Run `yarn` in your terminal
3. Run `yarn start` in your terminal

To deploy the app into your GitHub pages, you can run `yarn run deploy`.

# Environment variables

All of the needed environment variables have been mentioned in the `.env.example` file.

- You need to create your developer account on Spotify and get client ID and the secret and pass them in .env file
- If you want to send out emails using EmailJs, you need to follow their instructions and provide them in your .env file
- Provide the base name and url as well

# Dependencies

- [React](https://reactjs.org/) 18.2.0
- [Mantine](https://mantine.dev/) is the theming and styling library used in this project.
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/reference/#/) has been used get information from Spotify.
- [EmailJs](https://www.emailjs.com/) has been used to send emails with a template.
