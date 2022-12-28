import {
  Card,
  Image,
  Loader,
  SimpleGrid,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useArtistsPageStyles } from "../styles/artistsPageStyles";
import { useGetUsersTopArtists } from "./data-access/useGetUsersTopArtists";

const ArtistsPage = () => {
  const { classes } = useArtistsPageStyles();
  const { data: topArtists } = useGetUsersTopArtists();

  if (!topArtists) return <Loader />;

  const data =
    topArtists &&
    topArtists.items.map((item) => ({
      id: item.id,
      image: item.images[0].url,
      name: item.name,
    }));

  const items = data.map((item) => (
    <UnstyledButton
      key={item.name}
      className={classes.item}
      component={Link}
      to={`/artist/${item.id}`}
    >
      <Image
        radius="xl"
        width={170}
        height={170}
        src={item.image}
        fit="contain"
        withPlaceholder
      />
      <Text size="xs" mt={7}>
        {item.name}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Title order={2}>Your Top Artists</Title>

      <SimpleGrid cols={6} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};
export default ArtistsPage;
