import { Card, Group, Image, Loader, Stack, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useArtistsPageStyles } from "../styles/artistsPageStyles";
import { useGetArtistDetails } from "./data-access/useGetArtistDetails";

const ArtistDetailsPage = () => {
  const { id } = useParams();

  const { classes } = useArtistsPageStyles();
  const { data: artistDetails } = useGetArtistDetails(id);

  if (!artistDetails) return <Loader />;

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Stack align="center">
        <Image
          radius="xl"
          width={400}
          height={400}
          src={artistDetails.images[0].url}
          fit="contain"
          withPlaceholder
        />
        <Title size={80}>{artistDetails.name}</Title>
      </Stack>

      <Group position="center" spacing="xl">
        <div>
          <Title order={3}>
            {artistDetails.followers.total.toLocaleString()}
          </Title>
          <Text>Followers</Text>
        </div>
        <div>
          <Title order={3}>
            {artistDetails.genres.map((item) => item + " ")}
          </Title>
          <Text>Genres</Text>
        </div>
        <div>
          <Title>{artistDetails.popularity}%</Title>
          <Text>Popularity</Text>
        </div>
      </Group>
    </Card>
  );
};
export default ArtistDetailsPage;
