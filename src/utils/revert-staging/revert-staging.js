import { spawnSync } from "child_process";

const revertStaging = () => {
  const revertStagingCommand = "git restore --staged .";
  const [bin, ...args] = revertStagingCommand.split(" ");

  spawnSync(bin, args);
};

export default revertStaging;
