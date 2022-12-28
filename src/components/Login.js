import { createStyles, Paper, Title } from "@mantine/core";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Scopes, SpotifyAuth } from "react-spotify-auth";
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

export const Login = (props) => {
  const { classes } = useStyles();
  const { hash } = useLocation();

  const [token, setToken] = useState("");
  const CLIENT_ID = "b83f71f2f54f4e50966d6c1fd1e1606a";
  const REDIRECT_URI = "http://localhost:3000";

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
          redirectUri={REDIRECT_URI}
          clientID={CLIENT_ID}
          scopes={[Scopes.userReadPrivate, Scopes.userTopRead]}
          onAccessToken={(token) => setToken(token)}
          title="Login to your Spotify"
        />
      </Paper>
    </div>
  );
};
