import {
  AppShell,
  Burger,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TracksPage from "../components/TracksPage";
import DashboardPage from "../components/DashboardPage";
import MainHeader from "../components/MainHeader";
import ArtistsPage from "../components/ArtistsPage";
import { NavMenu } from "../components/NavMenu";
import ProfilePage from "../components/ProfilePage";
import { Login } from "../components/Login";
import ArtistDetailsPage from "../components/ArtistDetailsPage";
import RecentTracksPage from "../components/RecentTracksPage";

const AppRouter = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [colorScheme, setColorScheme] = useState(
    localStorage.getItem("color") ? localStorage.getItem("color") : "dark"
  );

  const toggleColorScheme = () => {
    localStorage.color = colorScheme === "dark" ? "light" : "dark";
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  const dark = colorScheme === "dark";
  const userLoggedIn = localStorage.getItem("token") ? true : false;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <BrowserRouter>
        <MantineProvider
          theme={{
            loader: "oval",
            colorScheme,
          }}
          emotionOptions={{ key: "mantine" }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppShell
            styles={{
              main: {
                background: dark ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={userLoggedIn ? <NavMenu opened={opened} /> : ""}
            header={
              <Header height={70} p="md" background={theme.colors.gray[6]}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </MediaQuery>
                  <MainHeader
                    toggleColorScheme={toggleColorScheme}
                    dark={dark}
                  />
                </div>
              </Header>
            }
          >
            <Routes>
              <Route path="/" element={<DashboardPage />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/dashboard" element={<DashboardPage />} exact />
              <Route path="/profile" element={<ProfilePage />} exact />
              <Route path="/artists" element={<ArtistsPage />} exact />
              <Route path="/artist/:id" element={<ArtistDetailsPage />} exact />
              <Route path="/tracks" element={<TracksPage />} exact />
              <Route
                path="/recent-tracks"
                element={<RecentTracksPage />}
                exact
              />
            </Routes>
          </AppShell>
        </MantineProvider>
      </BrowserRouter>
    </ColorSchemeProvider>
  );
};

export default AppRouter;
