// @ts-ignore
import axios from "axios";

var userAddress;
var contract;
var ingredients = [];

const getBalance = () => {
  // @ts-ignore
  return contract.methods.balanceOf(userAddress).call({ from: userAddress });
};

const getTokenID = (index) => {
  // @ts-ignore
  return contract.methods
    .tokenOfOwnerByIndex(userAddress, index)
    .call({ from: userAddress });
};

const getTokenURI = (id) => {
  // @ts-ignore
  return contract.methods.tokenURI(id).call({ from: userAddress });
};

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

export async function fetcher(u, c) {
  userAddress = u;
  contract = c;
  let arr = await getTokens();
  let creatures = [];
  for (let i = 0; i < arr.length; i++) {
    let uri = arr[i];
    let c = await retrieveJSON(uri);
    console.log(c);
    creatures.push(c);
  }

  ingredients = creatures;
  return ingredients;
}
