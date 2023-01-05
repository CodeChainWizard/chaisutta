// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consolBalances(addresses) {
  let conuner = 0;
  for (const address of addresses) {
    console.log(`Address ${conuner} Balance:`, await getBalances(address));
  }
}

async function consolememos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.address;
    const message = memo.message;

    console.log(
      `At ${timestamp}, Name ${name}, Address ${from}, Message ${message}`
    );
  }
}

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy(); // instances of contact

  await contract.deployed();
  console.log(`Address of contract:`, contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];

  console.log('Before buying tea: ');
  await consolBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther('0.01') };
  await contract.connect(from1).paychai('from1', 'very nice tea', amount);
  await contract.connect(from2).paychai('from2', 'very nice tea2', amount);
  await contract.connect(from3).paychai('from3', 'very nice tea3', amount);

  console.log('After buying tea: ');
  await consolBalances(addresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
