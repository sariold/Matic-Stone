const Migrations = artifacts.require("Migrations");

// Deploy the Migrations contract.
module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
