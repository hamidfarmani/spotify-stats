import { createStyles, Paper, Title } from "@mantine/core";

import React from "react";
import { Scopes, SpotifyAuth } from "react-spotify-auth";
import { useAuthContext } from "../context/AuthProvider";
import Background from "../styles/images/background.jpg";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 800,
    backgroundSize: "cover",
    backgroundImage: `url(${Background})`,
    boxShadow: theme.shadows.md,
    border: 0,
    borderRadius: theme.radius.sm,
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 800,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const Login = () => {
  const { classes } = useStyles();
  const authContext = useAuthContext();

  // const CLIENT_ID = "b83f71f2f54f4e50966d6c1fd1e1606a";
  // const REDIRECT_URI = "http://localhost:3000";

  function doLogin(accessToken) {
    window.location.hash = "";
    authContext.login({ accessToken });
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} shadow="md" radius="sm" p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to Spotify stats!
        </Title>
        <SpotifyAuth
          redirectUri={process.env.REACT_APP_REDIRECT_URI}
          clientID={process.env.REACT_APP_CLIENT_ID}
          scopes={[
            Scopes.userReadPrivate,
            Scopes.userTopRead,
            Scopes.userReadRecentlyPlayed,
          ]}
          onAccessToken={(token) => doLogin(token)}
          title="Login to your Spotify"
        />
      </Paper>
    </div>
  );
};
