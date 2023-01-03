import {
  Card,
  Group,
  Image,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useGetProfile } from "./data-access/useGetProfile";
import { useGetUserFollowing } from "./data-access/useGetUserFollowing";
import { TopArtists } from "./TopArtists";
import { TopTracks } from "./TopTracks";

const ProfilePage = () => {
  const { data: profile, isLoading: isProfileLoading } = useGetProfile();
  const { data: userFollowing, isLoading: isFollowingLoading } =
    useGetUserFollowing();

  if (isProfileLoading && isFollowingLoading) return <Loader />;

  const profileImage =
    profile &&
    profile.images.length > 0 &&
    profile.images[0] &&
    profile.images[0].url;

  const followers = profile.followers && profile.followers.total;
  const followings = userFollowing && userFollowing.artists.items.length;
  return (
    <>
      <Card withBorder radius="md">
        <Group position="left" pb="md">
          <Image
            radius="xl"
            width={200}
            height={200}
            src={profileImage}
            fit="contain"
            withPlaceholder
          />
          <Stack>
            <Title order={1}>{profile.display_name}</Title>
            <Title order={3}>
              Followers{" "}
              <Text span c="blue" inherit>
                {followers}
              </Text>
            </Title>
            <Title order={3}>
              Following{" "}
              <Text span c="blue" inherit>
                {followings}
              </Text>
            </Title>
          </Stack>
        </Group>
        <TopArtists />
        <Space h="sm" />

        <TopTracks />
      </Card>
    </>
  );
};
export default ProfilePage;
