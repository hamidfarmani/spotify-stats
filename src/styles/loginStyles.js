import { createStyles } from "@mantine/core";

export const useLoginStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 800,
    boxShadow: theme.shadows.md,
    border: 0,
    borderRadius: theme.radius.sm,
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 800,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
