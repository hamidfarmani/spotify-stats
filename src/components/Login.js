import {
  BackgroundImage,
  Button,
  Center,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import React from "react";
import { BrandSpotify } from "tabler-icons-react";
import Background from "../styles/images/login-backgrond.jpg";
import { useLoginStyles } from "../styles/loginStyles";
import SendEmailPage from "./SendEmailPage";

export const Login = () => {
  const { classes } = useLoginStyles();
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "code";
  const scopes = `user-read-private user-read-email user-top-read user-read-recently-played user-follow-read`;

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
          <Stack>
            <Button
              style={{ backgroundColor: "#1DB954" }}
              leftIcon={<BrandSpotify />}
              component="a"
              href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scopes}`}
            >
              If you signed up, Login here
            </Button>

            <Center>
              <Text>or</Text>
            </Center>

            <SendEmailPage />
          </Stack>
        </Paper>
      </BackgroundImage>
    </div>
  );
};
