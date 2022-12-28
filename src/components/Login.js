import {
  Button,
  createStyles,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { X } from "tabler-icons-react";
import { useAuthContext } from "../context/AuthProvider";
import Background from "../img/login.jpg";
import { useLogin } from "./data-access/useLogin";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 800,
    backgroundSize: "cover",
    backgroundImage: `url(${Background})`,
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

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export const Login = (props) => {
  const intl = useIntl();

  const authContext = useAuthContext();
  const { mutate: applyLogin } = useLogin();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        value.length === 0
          ? intl.formatMessage({ id: "general.email-required-error" })
          : /^\S+@\S+$/.test(value)
          ? null
          : intl.formatMessage({ id: "general.email-invalid-error" }),
      password: (value) =>
        value.length === 0
          ? intl.formatMessage({ id: "general.password-required-error" })
          : null,
    },
  });

  const submitPost = async ({ email, password }) => {
    applyLogin(
      { email, password },
      {
        onSuccess: (response) => {
          const access_token = response.access_token;
          const refresh_token = response.refresh_token;

          authContext.login({
            access_token,
            refresh_token,
          });
        },
        onError: (error) => {
          showNotification({
            title: intl.formatMessage({ id: "general.alert.error" }),
            icon: <X />,
            color: "red",
            message:
              error.response.status === 401
                ? "Please check your email and password."
                : "Something went wrong. Please contact customer service.",
          });
        },
      }
    );
  };

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} shadow="md" radius="sm" p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to GSM Electric!
        </Title>
        <form onSubmit={form.onSubmit(submitPost)}>
          <TextInput
            className="login-group__item"
            label={intl.formatMessage({ id: "Login.email" })}
            placeholder={intl.formatMessage({ id: "Login.email" })}
            withAsterisk
            {...form.getInputProps("email")}
          />
          <PasswordInput
            className="login-group__item"
            label={intl.formatMessage({ id: "Login.password" })}
            placeholder={intl.formatMessage({ id: "Login.password" })}
            withAsterisk
            {...form.getInputProps("password")}
          />
          <Button
            fullWidth
            mt="xl"
            size="md"
            type="submit"
            color="cyan"
            className="gs-default-button"
          >
            <FormattedMessage id="Login.login" defaultMessage="Login" />
          </Button>
        </form>

        <Text align="center" mt="md">
          <Link to="/forgot-password">Forgot password?</Link>
        </Text>
      </Paper>
    </div>
  );
};
