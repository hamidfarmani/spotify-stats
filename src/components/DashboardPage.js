import {
  Accordion,
  Button,
  Paper,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SpotifyAuth, Scopes } from "react-spotify-auth";

const DashboardPage = () => {
  const { hash } = useLocation();

  const [token, setToken] = useState("");
  const [value, setValue] = useState([]);
  const CLIENT_ID = "b83f71f2f54f4e50966d6c1fd1e1606a";
  const REDIRECT_URI = "http://localhost:3000";

  useEffect(() => {
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <ScrollArea style={{ height: 730 }}>
      <Paper shadow="md" p="md">
        <Title order={1}>Spotify stats</Title>
        <Space h="md" />

        <SpotifyAuth
          redirectUri={REDIRECT_URI}
          clientID={CLIENT_ID}
          scopes={[Scopes.userReadPrivate, Scopes.userTopRead]}
          onAccessToken={(token) => setToken(token)}
        />

        <Space h="sm" />

        <Text>Some description.</Text>
        <Space h="sm" />

        <Text>Some more</Text>

        <Space h="xl" />

        <Accordion
          value={value}
          onChange={setValue}
          variant="separated"
          defaultValue="action1"
        >
          <Accordion.Item value="action1">
            <Accordion.Control>Action1</Accordion.Control>
            <Accordion.Panel>
              <Text>Action 1 description.</Text>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="action2">
            <Accordion.Control>Action2</Accordion.Control>
            <Accordion.Panel>
              <Text>Action 2 description.</Text>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Space h="xl" />
      </Paper>
    </ScrollArea>
  );
};
export default DashboardPage;
