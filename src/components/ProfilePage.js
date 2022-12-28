import { Image, Loader, Paper, Space, Title } from "@mantine/core";
import { useGetProfile } from "./data-access/useGetProfile";
import { TopArtists } from "./TopArtists";
import { TopTracks } from "./TopTracks";

const ProfilePage = () => {
  const { data: profile } = useGetProfile();

  if (!profile) {
    return <Loader />;
  }

  const profileImage =
    profile.images.length > 0 && profile.images[0] && profile.images[0].url;

  const followers = profile.followers && profile.followers.total;
  return (
    <>
      <Paper shadow="md" p="md">
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
      </Paper>
      <Paper>
        <TopArtists />
        <Space h="sm" />

        <TopTracks />
      </Paper>
    </>
  );
};
export default ProfilePage;
