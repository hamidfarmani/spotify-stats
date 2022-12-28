import {
  Accordion,
  Paper,
  ScrollArea,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
  const { hash } = useLocation();

  const [token, setToken] = useState("");
  const [value, setValue] = useState([]);

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
