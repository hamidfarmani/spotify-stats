import {
  ActionIcon,
  Avatar,
  Card,
  Center,
  Group,
  Loader,
  ScrollArea,
  SegmentedControl,
  Table,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment/moment";
import { useState } from "react";
import { PlayerPlay } from "tabler-icons-react";
import { useGetUsersTopTracks } from "./data-access/useGetUsersTopTracks";

const TracksPage = () => {
  const [timeRange, setTimeRange] = useState("medium_term");
  const { data: topTracks, refetch } = useGetUsersTopTracks(timeRange);

  if (!topTracks) return <Loader />;

  const data = topTracks.items.map((item) => ({
    avatar: item.album.images[0].url,
    name: item.name,
    artists: item.artists.map((artist) => artist.name + " "),
    duration: item.duration_ms,
    album: item.album.name,
    playLink: item.external_urls.spotify,
  }));

  const rows = data.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Avatar size={40} src={item.avatar} radius={40} />
          <div>
            <Text size="sm" weight={500}>
              {item.name}
            </Text>
            <Text color="dimmed" size="xs">
              {item.artists}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Text size="sm">{item.album}</Text>
      </td>
      <td>
        <Text size="sm">{moment(item.duration).format("mm:ss")}</Text>
      </td>
      <td>
        <ActionIcon
          variant="light"
          size="xl"
          style={{ color: "#1DB954" }}
          component="a"
          href={item.playLink}
          target="_blank"
        >
          <PlayerPlay size={25} />
        </ActionIcon>
      </td>
    </tr>
  ));

  function onTimeChange(newTimeRange) {
    setTimeRange(newTimeRange);
    refetch({ timeRange: newTimeRange });
  }

  return (
    <Card withBorder radius="md">
      <Group position="apart">
        <Title order={2}>Your Top Tracks</Title>
        <SegmentedControl
          value={timeRange}
          onChange={(value) => onTimeChange(value)}
          data={[
            {
              value: "long_term",
              label: (
                <Center>
                  <Text>All</Text>
                </Center>
              ),
            },
            {
              value: "medium_term",
              label: (
                <Center>
                  <Text>Last 6 months</Text>
                </Center>
              ),
            },
            {
              value: "short_term",
              label: (
                <Center>
                  <Text>Last 4 weeks</Text>
                </Center>
              ),
            },
          ]}
        />
      </Group>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="md">
          <thead>
            <tr>
              <th>Track</th>
              <th>Album</th>
              <th>Duration</th>
              <th>Play on Spotify</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default TracksPage;
