import {
  ActionIcon,
  Anchor,
  Group,
  Image,
  MediaQuery,
  Tooltip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Logout, MoonStars, Sun } from "tabler-icons-react";
import { useAuthContext } from "../context/AuthProvider";
import image from "../styles/images/spotify-icons-logos/Spotify_Logo_RGB_Green.png";

const MainHeader = ({ dark, toggleColorScheme }) => {
  const { authState } = useAuthContext();

  const { logout } = useAuthContext();

  return (
    <Group position="apart" style={{ width: "100%" }}>
      <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
        <Group position="left">
          <Anchor component={Link} to="/" style={{ textDecoration: "none" }}>
            <Image width={150} height={80} src={image} fit="contain" />
          </Anchor>
        </Group>
      </MediaQuery>

      <Group position="right">
        <Tooltip
          label={dark ? "Light mode" : "Dark mode"}
          radius="md"
          position="bottom"
          withArrow
          transition="fade"
          transitionDuration={200}
        >
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
          >
            {dark ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
        </Tooltip>

        {authState && authState.userLoggedIn && (
          <Tooltip label="Logout">
            <ActionIcon
              variant="outline"
              color={dark ? "yellow" : "blue"}
              component={Link}
              to={process.env.REACT_APP_BASE_NAME}
              onClick={() => {
                logout();
              }}
            >
              <Logout size={18} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </Group>
  );
};

export default MainHeader;
