module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("NFog", {
    from: deployer,
    args: ["NFogCollection", "NFOG"],
    log: true,
  });
};
module.exports.tags = ["NFog"];
