const hre = require("hardhat")
const { items } = require("../src/items.json")


const tokens = (num)=> ethers.utils.parseUnits(num.toString(), "ether")

async function main() {

  const [deployer] = await ethers.getSigners()

  const Dappazon = await hre.ethers.getContractFactory("Dappazon")
  const dappazon = await Dappazon.deploy()

  await dappazon.deployed()
  

  // contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  console.log(`Contract deployed to ${dappazon.address}`)

  for(let i = 0; i < items.length; i++){

    const txt = await dappazon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock
    )

    await txt.wait() 

    console.log(`Listed item id: ${items[i].id} with name: ${items[i].name}`)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// "id": 1,
//       "name": "Camera",
//       "category": "electronics",
//       "image": "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/camera.jpg",
//       "price": "1",
//       "rating": 4,
//       "stock": 10