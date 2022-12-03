// @ts-ignore
import axios from "axios";

var userAddress;
var contract;
var ingredients = [];

/**
 * Contract call to get the number of tokens owned by the user.
 * @returns Contract token balance of a user
 */
const getBalance = () => {
  // @ts-ignore
  return contract.methods.balanceOf(userAddress).call({ from: userAddress });
};

/**
 * Retrieves token ID based on index.
 * @param {number} index - Index of token
 * @returns Token ID
 */
const getTokenID = (index) => {
  // @ts-ignore
  return contract.methods
    .tokenOfOwnerByIndex(userAddress, index)
    .call({ from: userAddress });
};

/**
 * Retrieves token URI based on token ID.
 * @param {number} id - ID of token
 * @returns Token URI
 */
const getTokenURI = (id) => {
  // @ts-ignore
  return contract.methods.tokenURI(id).call({ from: userAddress });
};

/**
 * Retrieves all token URIs for a user.
 * @returns Array of token URIs
 */
const getTokens = async () => {
  let arr = [];
  let balance = await getBalance();

  for (let i = 0; i < balance; i++) {
    let tokenID = await getTokenID(i);
    let tokenURI = await getTokenURI(tokenID);
    arr.push(tokenURI);
  }
  return arr;
};

/**
 * Retrieve JSON metadata from IPFS hash.
 * @param {string} uri - IPFS hash
 * @returns Array of creature attributes
 */
const retrieveJSON = async (uri) => {
  let res = axios.get(`https://ipfs.io/ipfs/${uri}`).then((resp) => {
    let attributes = resp.data["attributes"];
    let name = attributes[1]["value"];
    let mana = attributes[2]["value"];
    let damage = attributes[3]["value"];
    let health = attributes[4]["value"];
    let c = [name, mana, damage, health];
    return c;
  });
  return res;
};

/**
 * Create array of creature attributes for first 30 tokens owned by user.
 * @param {string} u - User address
 * @param {Object} c - Contract instance
 * @returns Array of creature attributes for all input tokens
 */
export const fetcher = async (u, c) => {
  userAddress = u;
  contract = c;
  let arr = await getTokens();
  let creatures = [];
  for (let i = 0; i < 30; i++) {
    let uri = arr[i];
    let c = await retrieveJSON(uri);
    console.log(c);
    creatures.push(c);
  }

  ingredients = creatures;
  return ingredients;
};
