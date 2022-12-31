import emailjs from "@emailjs/browser";
import { Button, Drawer, Textarea, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRef, useState } from "react";
import { User } from "tabler-icons-react";

const SendEmailPage = () => {
  const [opened, setOpened] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        `${process.env.REACT_APP_EMAIL_SERVICE}`,
        `${process.env.REACT_APP_EMAIL_TEMPLATE}`,
        form.current,
        `${process.env.REACT_APP_EMAIL_PUBLIC_KEY}`
      )
      .then(
        (result) => {
          setOpened(false);
          showNotification({
            title: "Success",
            message:
              "Your message received. I will add you as a user and notify you with an email!",
          });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Be a user of Spotify stats"
        padding="xl"
        size="xl"
      >
        <form ref={form} onSubmit={sendEmail}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Your name"
            name="user_name"
          />

          <TextInput
            mt="md"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            name="user_email"
          />

          <Textarea
            mt="md"
            label="Message"
            placeholder="Optional message"
            name="message"
          />

          <Button type="submit" mt="md">
            Send
          </Button>
        </form>
      </Drawer>

      <Button leftIcon={<User />} onClick={() => setOpened(true)}>
        Sign up as a user!
      </Button>
    </>
  );
};
export default SendEmailPage;
