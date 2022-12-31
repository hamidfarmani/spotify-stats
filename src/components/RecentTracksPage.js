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
import { useGetUsersRecentTracks } from "./data-access/useGetUsersRecentTracks";

const RecentTracksPage = () => {
  const { data: recentTracks } = useGetUsersRecentTracks();

  if (!recentTracks) return <Loader />;

  const data = recentTracks.items.map((item) => ({
    playedAt: item.played_at,
    avatar: item.track.album.images[0].url,
    name: item.track.name,
    artists: item.track.artists.map((artist) => artist.name + " "),
    duration: item.track.duration_ms,
    album: item.track.album.name,
    playLink: item.track.external_urls.spotify,
  }));

  const rows = data.map((item) => (
    <tr key={item.name + " " + item.album}>
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
        <Text size="sm">{moment(item.playedAt).fromNow()}</Text>
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
              <th>Played at</th>
              <th>Play on Spotify</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Card>
  );
};

export default RecentTracksPage;
