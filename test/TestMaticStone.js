const MaticStone = artifacts.require("MaticStone");

/**
 * Solidity Unit Testing for MaticStone smart contract functions.
 */

var accounts;
var ipfs = [
  "bafkreidvdet7nhhxn3zlt356o7higptz42gyum2yfwjupql3ybqepclyki",
  "bafkreib5mqy6meoideloju6kenlqxxgwai7kypbj3arn6fhhadwfrkyehi",
  "bafkreih26zxpruauwll65ujhbdaoej2cav3dhnps5yql4lhcsld7fr56lq",
  "bafkreibe52etzrymt3ok4opsnozfriepod3p3jyptpjlyjcn6am7x3e5uq",
  "bafkreicmvil5cpjvouaqydqd3njpx4sfw52lwdowmxrwbswq6bi54xzks4",
];
var alienURI = ipfs[0];

contract("MaticStone", (accs) => {
  accounts = accs;
});

/**
 * Testing for name retrieval.
 */
it("name", async () => {
  let instance = await MaticStone.deployed();
  assert.equal(await instance.name.call(), "MaticStone");
});

/**
 * Testing for symbol retrieval.
 */
it("symbol", async () => {
  let instance = await MaticStone.deployed();
  assert.equal(await instance.symbol.call(), "MTS");
});

/**
 * Testing for token creation and change in balance.
 */
it("can create a token", async () => {
  let instance = await MaticStone.deployed();
  await instance.safeMint(accounts[0], alienURI, { from: accounts[0] });
  assert.equal(await instance.balanceOf(accounts[0]), 1);
}).timeout(10000);

/**
 * Testing for retrieval of a token's owner.
 */
it("can retrieve owner of a token", async () => {
  let instance = await MaticStone.deployed();
  let tokenID = 0;
  assert.equal(await instance.ownerOf(tokenID), accounts[0]);
}).timeout(10000);

/**
 * Testing for retrieval of a token URI based on token ID.
 */
it("can retrieve tokenURI", async () => {
  let instance = await MaticStone.deployed();
  let tokenID = 0;
  assert.equal(await instance.tokenURI(tokenID), alienURI);
}).timeout(10000);

/**
 * Testing for user token balance increasing after minting.
 */
it("can increase user token balance", async () => {
  let instance = await MaticStone.deployed();
  assert.equal(await instance.balanceOf(accounts[0]), 1);
  await instance.safeMint(accounts[0], alienURI, { from: accounts[0] });
  assert.equal(await instance.balanceOf(accounts[0]), 2);
}).timeout(10000);

/**
 * Testing for user token balance decreasing after burning a token.
 */
it("can burn a token and decrease user token balance", async () => {
  let instance = await MaticStone.deployed();
  let tokenID = 1;
  assert.equal(await instance.balanceOf(accounts[0]), 2);
  await instance.burn(tokenID, { from: accounts[0] });
  assert.equal(await instance.balanceOf(accounts[0]), 1);
}).timeout(10000);

/**
 * Testing for user token balance increasing by 5 after multi
 * minting 5 tokens. Also testing for token owner retrieval and
 * token URI information matching.
 */
it("can mint multiple tokens and retrieve them all", async () => {
  let instance = await MaticStone.deployed();
  let tokenIDs = [2, 3, 4, 5, 6];
  assert.equal(await instance.balanceOf(accounts[1]), 0);
  await instance.mulitMint(accounts[1], ipfs, { from: accounts[1] });
  assert.equal(await instance.balanceOf(accounts[1]), 5);
  for (let i = 0; i < tokenIDs.length; i++) {
    assert.equal(await instance.ownerOf(tokenIDs[i]), accounts[1]);
    assert.equal(await instance.tokenURI(tokenIDs[i]), ipfs[i]);
  }
}).timeout(10000);

/**
 * Testing for user token balance changing after transferring a token.
 */
it("can transfer a token from one account to another", async () => {
  let instance = await MaticStone.deployed();
  let tokenID = 0;
  assert.equal(await instance.balanceOf(accounts[0]), 1);
  assert.equal(await instance.balanceOf(accounts[1]), 5);
  await instance.transferFrom(accounts[0], accounts[1], tokenID, {
    from: accounts[0],
  });
  assert.equal(await instance.balanceOf(accounts[0]), 0);
  assert.equal(await instance.balanceOf(accounts[1]), 6);
}).timeout(10000);

/**
 * Testing retrieval of entire token supply.
 */
it("can retrieve entire token supply", async () => {
  let instance = await MaticStone.deployed();
  assert.equal(await instance.totalSupply.call(), 6);
}).timeout(10000);
