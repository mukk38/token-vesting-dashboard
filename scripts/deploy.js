const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy ERC20 token for testing (optional)
  const Token = await hre.ethers.getContractFactory("ERC20PresetMinterPauser");
  const token = await Token.deploy("TestToken", "TTK");
  await token.deployed();
  console.log("Token deployed to:", token.address);

  // Mint some tokens to deployer
  await token.mint(deployer.address, hre.ethers.utils.parseEther("10000"));

  // Deploy Vesting contract with token address
  const Vesting = await hre.ethers.getContractFactory("TokenVesting");
  const vesting = await Vesting.deploy(token.address);
  await vesting.deployed();
  console.log("Vesting deployed to:", vesting.address);

  // Approve vesting contract to spend tokens on behalf of deployer
  await token.approve(vesting.address, hre.ethers.utils.parseEther("10000"));

  // Create a vesting for deployer as example
  const now = Math.floor(Date.now() / 1000);
  const duration = 60 * 60 * 24 * 30 * 6; // 6 months
  await vesting.createVesting(deployer.address, hre.ethers.utils.parseEther("1000"), now, duration);

  console.log("Vesting created for deployer");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
