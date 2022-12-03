truffle(develop)> test
Using network 'develop'.


Compiling your contracts...
===========================
> Compiling @openzeppelin\contracts\token\ERC721\ERC721.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721.sol
> Compiling @openzeppelin\contracts\token\ERC721\IERC721Receiver.sol
> Compiling @openzeppelin\contracts\token\ERC721\extensions\ERC721Burnable.sol
> Compiling @openzeppelin\contracts\token\ERC721\extensions\ERC721Enumerable.sol
> Compiling @openzeppelin\contracts\token\ERC721\extensions\ERC721URIStorage.sol
> Compiling @openzeppelin\contracts\token\ERC721\extensions\IERC721Enumerable.sol
> Compiling @openzeppelin\contracts\token\ERC721\extensions\IERC721Metadata.sol
> Compiling @openzeppelin\contracts\utils\Address.sol
> Compiling @openzeppelin\contracts\utils\Context.sol
> Compiling @openzeppelin\contracts\utils\Counters.sol
> Compiling @openzeppelin\contracts\utils\Strings.sol
> Compiling @openzeppelin\contracts\utils\introspection\ERC165.sol
> Compiling @openzeppelin\contracts\utils\introspection\IERC165.sol
> Compiling @openzeppelin\contracts\utils\math\Math.sol
> Compiling .\contracts\MaticStone.sol
> Compiling .\contracts\Migrations.sol
> Artifacts written to C:\Users\diggy\AppData\Local\Temp\test--26692-HtZESTAXbug9
> Compiled successfully using:
   - solc: 0.8.9+commit.e5eed63a.Emscripten.clang


  ✔ name
  
  ✔ symbol
  
  ✔ can create a token (1100ms)
  
  ✔ can retrieve owner of a token
  
  ✔ can retrieve tokenURI
  
  ✔ can increase user token balance (1098ms)
  
  ✔ can burn a token and decrease user token balance (1103ms)
  
  ✔ can mint multiple tokens and retrieve them all (1263ms)
  
  ✔ can transfer a token from one account to another (1086ms)
  
  ✔ can retrieve entire token supply

  10 passing (6s)

truffle(develop)>
