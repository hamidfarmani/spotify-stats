import { Card, Image, Loader, Space, Title } from "@mantine/core";
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
        <Title order={5}>Following: {followings}</Title>

        <TopArtists />
        <Space h="sm" />

        <TopTracks />
      </Card>
    </>
  );
};
export default ProfilePage;
