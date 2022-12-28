import { Group, Navbar, NavLink, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  BrandGithub,
  LayoutDashboard,
  Microphone2,
  Music,
  Selector,
  User,
} from "tabler-icons-react";
import image from "../styles/images/profile.jpg";
import { navStyles } from "../styles/navStyles";
import UserButton from "./UserButton";

export const NavMenu = ({ opened }) => {
  const location = useLocation();
  const { classes } = navStyles();

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
          image={image}
          name="Hamid Farmani"
          email="hamidfarmani1@gmail.com"
          icon={<Selector size={14} stroke={1.5} />}
        />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <NavLink
          label="Dashboard"
          component={Link}
          to="/dashboard"
          icon={<LayoutDashboard />}
          active={location.pathname === "/dashboard"}
        />

        <NavLink
          label="Profile"
          component={Link}
          to="/profile"
          icon={<User />}
          active={location.pathname === "/profile"}
        />
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader}>
          <Text size="xs" weight={500} color="dimmed">
            First category
          </Text>
        </Group>
        <div className={classes.collections}>
          <NavLink
            label="Artists"
            component={Link}
            to="/artists"
            icon={<Microphone2 />}
            active={location.pathname === "/artists"}
          />
        </div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader}>
          <Text size="xs" weight={500} color="dimmed">
            Second category
          </Text>
        </Group>

        <div className={classes.collections}>
          <NavLink
            label="Tracks"
            component={Link}
            to="/tracks"
            icon={<Music />}
            active={location.pathname === "/tracks"}
          />
        </div>
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
