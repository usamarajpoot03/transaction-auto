pragma solidity ^0.6.2;

contract Test {
    string private name;
    uint256 private supply;

    function setName(string memory _name) public {
        name = _name;
    }

    function setSupply(uint256 _supply) public {
        supply = _supply;
    }

    function getName() public view returns(string memory) {
        return name;
    }

    function getSupply() public view returns(uint256) {
        return supply;
    }
}