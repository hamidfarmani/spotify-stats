import {
  Center,
  Image,
  Loader,
  Paper,
  ScrollArea,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useGetProfile } from "./data-access/useGetProfile";
import { useGetUsersTopArtists } from "./data-access/useGetUsersTopArtists";
import { TopArtists } from "./TopArtists";

const ProfilePage = () => {
  const { data: profile } = useGetProfile();

  console.log(profile);

  if (!profile) {
    return <Loader />;
  }

  const profileImage =
    profile.images.length > 0 && profile.images[0] && profile.images[0].url;

  const followers = profile.followers && profile.followers.total;
  return (
    <ScrollArea style={{ height: 730 }}>
      <Paper shadow="md" p="md">
        <Stack align="center">
          <Image
            radius="xl"
            width={200}
            height={200}
            src={profileImage}
            fit="contain"
            withPlaceholder
          />
          <Title order={1}>{profile.display_name}</Title>
          <Title order={5}>Followers: {followers}</Title>
        </Stack>

        <TopArtists />

        <Space h="md" />

        <Space h="sm" />

        <Text>Some description.</Text>
        <Space h="sm" />

        <Text>Some more</Text>

        <Space h="xl" />

        <Space h="xl" />
      </Paper>
    </ScrollArea>
  );
};
export default ProfilePage;
