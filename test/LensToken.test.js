const LENS_TOKEN = artifacts.require("./LensToken.sol");
const ETHERS = require("ethers");
const EXPECT = require("chai").expect;

const TOTAL_SUPPLY = ETHERS.BigNumber.from(10).pow(15);
const DECIMALS = 15;
const TOKEN_NAME = "Lensia Token";
const TOKEN_SYMBOL = "LENS";
const TRANSFER_AMOUNT = ETHERS.BigNumber.from(10).pow(3);

contract('lensToken', accounts => {

    let lensToken;
    let ownerAddress = accounts[0];
    let anotherAddress = accounts[1];
    let ownerBalance = TOTAL_SUPPLY;

    beforeEach(async () => {
        lensToken = await LENS_TOKEN.deployed();

    })

    it('check:token_name', async () => {
        EXPECT(await lensToken.name()).to.eq(TOKEN_NAME);
    });

    it("check:token_symbol", async () => {
        EXPECT(await lensToken.symbol()).to.eq(TOKEN_SYMBOL);
    });

    it("check:total_supply", async () => {
       let totalSupply = await lensToken.totalSupply();
        EXPECT(parseInt(totalSupply)).to.eq(TOTAL_SUPPLY.toNumber());
    });

    it("check:decimals", async () => {
        let decimals = await lensToken.decimals();
        EXPECT(parseInt(decimals)).to.eq(DECIMALS);
    });

    it("check:owner", async () => {
        EXPECT(await lensToken.getOwner()).to.eq(ownerAddress);
    });

    it("check:balance_of", async () => {
        let balanceOf = await lensToken.balanceOf(ownerAddress);
        EXPECT(parseInt(balanceOf)).to.eq(TOTAL_SUPPLY.toNumber());
    });

    it("check:transfer", async () => {
        let transfer = await lensToken.transfer(anotherAddress, TRANSFER_AMOUNT.toNumber());
        let balanceOf = await lensToken.balanceOf(ownerAddress);
        ownerBalance = ownerBalance.sub(TRANSFER_AMOUNT);
        EXPECT(parseInt(balanceOf)).to.eq(ownerBalance.toNumber());
    });

    it("check:approve", async () => {
        let approve = await lensToken.approve(anotherAddress, TRANSFER_AMOUNT.toNumber());
        let allowance = await lensToken.allowance(ownerAddress, anotherAddress);
        EXPECT(parseInt(allowance)).to.eq(TRANSFER_AMOUNT.toNumber());
    });

    it("check:transferFrom", async () => {
        let approve = await lensToken.approve(ownerAddress, TRANSFER_AMOUNT.toNumber());
        let transferFrom = await lensToken.transferFrom(ownerAddress, anotherAddress, TRANSFER_AMOUNT.toNumber());
        let balanceOf = await lensToken.balanceOf(ownerAddress);
        ownerBalance = ownerBalance.sub(TRANSFER_AMOUNT);
        EXPECT(parseInt(balanceOf)).to.eq(ownerBalance.toNumber());
    });

    it("check:decreaseAllowance", async () => {
        await lensToken.decreaseAllowance(anotherAddress, TRANSFER_AMOUNT.toNumber());
        let allowance = await lensToken.allowance(ownerAddress, anotherAddress);
        EXPECT(parseInt(allowance)).to.eq(0);
    });

    it("check:increaseAllowance", async () => {
        await lensToken.increaseAllowance(anotherAddress, TRANSFER_AMOUNT.toNumber());
        let allowance = await lensToken.allowance(ownerAddress, anotherAddress);
        EXPECT(parseInt(allowance)).to.eq(TRANSFER_AMOUNT.toNumber());
    });

    it("check:mint", async () => {
        await lensToken.mint(TRANSFER_AMOUNT.toNumber());
        let totalSupply = await lensToken.totalSupply();
        EXPECT(parseInt(totalSupply)).to.eq(TOTAL_SUPPLY.add(TRANSFER_AMOUNT).toNumber());
    });
});