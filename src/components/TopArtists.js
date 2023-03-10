import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Loader,
  Paper,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link } from "react-router-dom";
import { useGetUsersTopArtists } from "./data-access/useGetUsersTopArtists";

const useStyles = createStyles((theme) => ({
  card: {
    height: 250,
    width: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 20,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 400,
    textTransform: "uppercase",
  },
}));

function Card({ image, title, to }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      component={Link}
      to={to}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

export const TopArtists = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const { data: topArtists } = useGetUsersTopArtists();

  if (!topArtists) return <Loader />;

  const data =
    topArtists &&
    topArtists.items.map((item) => ({
      image: item.images[0].url,
      title: item.name,
      to: `/artist/${item.id}`,
    }));
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      sx={{ maxWidth: "80%" }}
      slideSize="20%"
      breakpoints={[{ maxWidth: "sm", slideSize: "20%", slideGap: 4 }]}
      slideGap="xl"
      align="start"
      slidesToScroll={mobile ? 1 : 4}
      styles={{
        control: {
          "&[data-inactive]": {
            opacity: 0,
            cursor: "default",
          },
        },
      }}
    >
      {slides}
    </Carousel>
  );
};
