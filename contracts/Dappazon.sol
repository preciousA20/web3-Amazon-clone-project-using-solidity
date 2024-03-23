// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    address public owner;
    constructor(){
        owner = msg.sender;
    }

    struct Item {
        uint256 Id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256=>Item) public items;

    struct Order{
        uint256 time;
        Item item;
    }

    mapping(address=>uint256) public orderCount;
    mapping(address=>mapping(uint256=>Order)) public orders;


    event List(string name, uint256 cost, uint256 stock);
    event Buy(address buyer, uint256 count, uint256 id);

    modifier onlyOwner(){
        require(msg.sender == owner, "only the founder can call this function");
        _;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner(){
        Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);

        items[_id] = item;
        emit List(_name, _cost, _stock);
    }


    function buy(uint256 _id) public payable{

        Item memory item = items[_id];

        Order memory order = Order(block.timestamp, item);

        uint256 counter = orderCount[msg.sender] += 1;

        orders[msg.sender][counter] = order;

        items[_id].stock -= 1;

        emit Buy(msg.sender,counter, item.Id);
    }

    function withdraw() public onlyOwner{
        
        (bool success, ) = owner.call{value: address(this).balance}(" ");
        require(success);
    }
    
}
