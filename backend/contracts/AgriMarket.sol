// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgriMarket {
    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
    }

    Product[] public products;
    uint public nextId;

    function addProduct(string memory name, uint price) public {
        products.push(Product(nextId, name, price, payable(msg.sender)));
        nextId++;
    }

    function buyProduct(uint id) public payable {
        Product storage product = products[id];
        require(msg.value == product.price, "Incorrect amount");
        product.seller.transfer(msg.value);
    }

    function getProducts() public view returns (Product[] memory) {
        return products;
    }
}
