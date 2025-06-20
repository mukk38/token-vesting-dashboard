// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenVesting {
    IERC20 public immutable token;

    struct VestingInfo {
        uint256 totalAmount;
        uint256 claimedAmount;
        uint256 startTime;
        uint256 duration;
    }

    mapping(address => VestingInfo) public vestings;
    address public admin;

    event VestingCreated(address indexed beneficiary, uint256 amount, uint256 startTime, uint256 duration);
    event TokensClaimed(address indexed beneficiary, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        admin = msg.sender;
    }

    function createVesting(address beneficiary, uint256 totalAmount, uint256 startTime, uint256 duration) external onlyAdmin {
        require(vestings[beneficiary].totalAmount == 0, "Vesting exists");
        require(beneficiary != address(0), "Invalid address");
        require(totalAmount > 0, "Amount 0");
        require(duration > 0, "Duration 0");

        vestings[beneficiary] = VestingInfo(totalAmount, 0, startTime, duration);
        emit VestingCreated(beneficiary, totalAmount, startTime, duration);
    }

    function claimableAmount(address user) public view returns (uint256) {
        VestingInfo memory v = vestings[user];
        if (block.timestamp < v.startTime) return 0;

        uint256 elapsed = block.timestamp - v.startTime;
        if (elapsed > v.duration) elapsed = v.duration;

        uint256 vested = (v.totalAmount * elapsed) / v.duration;
        if (vested <= v.claimedAmount) return 0;

        return vested - v.claimedAmount;
    }

    function claim() external {
        uint256 amount = claimableAmount(msg.sender);
        require(amount > 0, "Nothing to claim");

        vestings[msg.sender].claimedAmount += amount;
        require(token.transfer(msg.sender, amount), "Transfer failed");

        emit TokensClaimed(msg.sender, amount);
    }
}
