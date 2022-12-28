import { Button } from "@mantine/core";
import { useAppContext } from "../context/AppContext";
import Stats from "./Stats";

const TracksPage = () => {
  const { infoState } = useAppContext();

  return (
    <>
      <Stats data={infoState.objectArray} />
      <Button fullWidth>Action</Button>
      {infoState &&
        infoState.objectArray &&
        infoState.objectArray.map((item) => item.number + " ")}
    </>
  );
};
export default TracksPage;
