// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.5.16;

import "./LensTokenContext.sol";
import "./LensToken.sol";
import "./librairies/SafeMath.sol";
import "./LensTokenOwnable.sol";
import "./LensTokenBEP20.sol";

contract LensToken is LensTokenBEP20 {
    constructor() LensTokenBEP20("Lensia Token", "LENS", 18, 10000000000000*10**18) public {}
}