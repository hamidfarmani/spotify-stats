import { Loader, Navbar, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  BrandGithub,
  History,
  Microphone2,
  Music,
  Selector,
} from "tabler-icons-react";
import { navStyles } from "../styles/navStyles";
import { useGetProfile } from "./data-access/useGetProfile";
import UserButton from "./UserButton";

export const NavMenu = ({ opened }) => {
  const location = useLocation();
  const { classes } = navStyles();

  const { data: profile } = useGetProfile();

  if (!profile) return <Loader />;

  return (
    <Navbar
      width={{ sm: 200, lg: 300 }}
      p="md"
      className={classes.navbar}
      hiddenBreakpoint="sm"
      hidden={!opened}
    >
      <Navbar.Section className={classes.section}>
        <UserButton
          image={
            profile.images.length > 0 &&
            profile.images[0] &&
            profile.images[0].url
          }
          name={profile.display_name}
          email="hamidfarmani1@gmail.com"
          icon={<Selector size={14} stroke={1.5} />}
        />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <NavLink
          label="Top artists"
          component={Link}
          to="/artists"
          icon={<Microphone2 />}
          active={location.pathname === "/artists"}
        />
        <NavLink
          label="Top tracks"
          component={Link}
          to="/tracks"
          icon={<Music />}
          active={location.pathname === "/tracks"}
        />
        <NavLink
          label="Recent tracks"
          component={Link}
          to="/recent-tracks"
          icon={<History />}
          active={location.pathname === "/recent-tracks"}
        />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <NavLink
          label="To GitHub repo"
          component="a"
          href="https://github.com/hamidfarmani/spotify-stats"
          target="_blank"
          variant="outline"
          icon={<BrandGithub />}
        />
      </Navbar.Section>
    </Navbar>
  );
};
