const MaticStone = artifacts.require("MaticStone");

// Deploy the MaticStone contract.
module.exports = function (deployer) {
  deployer.deploy(MaticStone);
};
