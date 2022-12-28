import {
  ActionIcon,
  Avatar,
  Card,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
  Title,
} from "@mantine/core";
import moment from "moment/moment";
import { PlayerPlay } from "tabler-icons-react";
import { useGetUsersTopTracks } from "./data-access/useGetUsersTopTracks";

const TracksPage = () => {
  const { data: topTracks } = useGetUsersTopTracks();

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

  return (
    <Card withBorder radius="md">
      <Title order={2}>Your Top Tracks</Title>

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
