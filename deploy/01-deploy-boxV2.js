const { network } = require("hardhat")
const { devChains } = require("../helper-hardhat-config")
const {verify}  = require('../utils/verfiy')

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  log("---------------------------------------")
  const boxV2 = await deploy("BoxV2", {
    from: deployer,
    args: [],
    waitConfirmtions: network.config.blockConfirmations || 1,
    log:true,
  })
  if (!devChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("verifying on Etherscan...")
    await verify(boxV2.address, [])
  }
}
