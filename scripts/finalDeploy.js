const hre = require('hardhat');

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const chai = await hre.ethers.getContractFactory('chai');
  const contract = await chai.deploy(); // instances of contact

  await contract.deployed();
  console.log(`Address of contract:`, contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x4ae8Ecc6a0758Dd191527153161c78A9225D5da9
