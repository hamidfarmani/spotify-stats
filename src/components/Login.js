import { BackgroundImage, Center, Paper, Title } from "@mantine/core";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Scopes, SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import { useAuthContext } from "../context/AuthProvider";
import Background from "../styles/images/login-backgrond.jpg";
import { useLoginStyles } from "../styles/loginStyles";

export const Login = () => {
  const { classes } = useLoginStyles();
  const authContext = useAuthContext();
  const navigate = useNavigate();

  function doLogin(accessToken) {
    window.location.hash = "";
    authContext.login({ accessToken });
    navigate("/");
  }

  return (
    <div className={classes.wrapper}>
      <BackgroundImage src={Background} radius="sm">
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
          <Center>
            <SpotifyAuth
              redirectUri={process.env.REACT_APP_REDIRECT_URI}
              clientID={process.env.REACT_APP_CLIENT_ID}
              scopes={[
                Scopes.userReadPrivate,
                Scopes.userReadEmail,
                Scopes.userTopRead,
                Scopes.userReadRecentlyPlayed,
                Scopes.userFollowRead,
              ]}
              onAccessToken={(token) => doLogin(token)}
              onFailure={(response) => console.error(response)}
              title="Login to your Spotify"
            />
          </Center>
        </Paper>
      </BackgroundImage>
    </div>
  );
};
