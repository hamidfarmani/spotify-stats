import {
  AppShell,
  Burger,
  ColorSchemeProvider,
  Header,
  MantineProvider,
  MediaQuery,
  useMantineTheme,
} from "@mantine/core";
import axios from "axios";

import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import ArtistDetailsPage from "../components/ArtistDetailsPage";
import ArtistsPage from "../components/ArtistsPage";
import { Login } from "../components/Login";
import MainHeader from "../components/MainHeader";
import { NavMenu } from "../components/NavMenu";
import { PageNotFound } from "../components/PageNotFound";
import ProfilePage from "../components/ProfilePage";
import RecentTracksPage from "../components/RecentTracksPage";
import TracksPage from "../components/TracksPage";
import { useAuthContext } from "../context/AuthProvider";
import Guard from "./Guard";

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
  const { authState } = useAuthContext();

  useEffect(() => {
    const exchangeCodeForToken = async (code) => {
      const encodedAuth = Buffer.from(
        `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
      ).toString("base64");

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.REACT_APP_REDIRECT_URI,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encodedAuth}`,
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
      window.location.replace(process.env.REACT_APP_BASE_NAME);
    };

    const code = window.location.search.split("code=")[1];
    exchangeCodeForToken(code);
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <HashRouter basename={process.env.REACT_APP_BASE_NAME}>
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
            navbar={
              authState.userLoggedIn ? (
                <NavMenu opened={opened} setOpened={setOpened} />
              ) : (
                ""
              )
            }
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
              <Route
                path="/"
                element={
                  <Guard>
                    <Login />
                  </Guard>
                }
              />
              <Route
                path="/spotify-stats"
                element={
                  <Guard>
                    <Login />
                  </Guard>
                }
              />
              <Route path="/login" element={<Login />} exact />
              <Route path="/profile" element={<ProfilePage />} exact />
              <Route path="/artists" element={<ArtistsPage />} exact />
              <Route path="/artist/:id" element={<ArtistDetailsPage />} exact />
              <Route path="/tracks" element={<TracksPage />} exact />
              <Route
                path="/recent-tracks"
                element={<RecentTracksPage />}
                exact
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AppShell>
        </MantineProvider>
      </HashRouter>
    </ColorSchemeProvider>
  );
};

export default AppRouter;
