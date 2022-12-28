import { Group, Navbar, NavLink, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  ChartBubble,
  ExternalLink,
  LayoutDashboard,
  Selector,
  SquareHalf,
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
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader}>
          <Text size="xs" weight={500} color="dimmed">
            First category
          </Text>
        </Group>
        <div className={classes.collections}>
          <NavLink
            label="Link1"
            component={Link}
            to="/link1"
            icon={<SquareHalf />}
            active={location.pathname === "/link1"}
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
            label="Link2"
            component={Link}
            to="/link2"
            icon={<ChartBubble />}
            active={location.pathname === "/link2"}
          />
        </div>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <NavLink
          label="To GitHub repo"
          component="a"
          href="https://github.com/hamidfarmani/visualizr"
          target="_blank"
          variant="outline"
          icon={<ExternalLink />}
        />
      </Navbar.Section>
    </Navbar>
  );
};
