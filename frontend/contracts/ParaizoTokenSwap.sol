// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ParaizoTokenSwap is Ownable {
    IERC20 public paraizoToken;
    uint256 public rate; // Cantidad de tokens de Paraízo por 1 ETH
    uint256 public maxPurchase; // Límite máximo de compra por transacción
    uint256 public minPurchase; // Cantidad mínima de compra

    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 tokenAmount);

    constructor(address _paraizoToken, uint256 _rate, uint256 _maxPurchase, uint256 _minPurchase) {
        paraizoToken = IERC20(_paraizoToken);
        rate = _rate; // Por ejemplo, 1000 PARAIZO por 1 ETH
        maxPurchase = _maxPurchase; // Por ejemplo, 10000 PARAIZO por transacción
        minPurchase = _minPurchase; // Por ejemplo, 100 PARAIZO por compra mínima
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Debe enviar ETH para comprar tokens");
        require(msg.value >= minPurchase / rate, "Compra mínima no alcanzada");
        require(msg.value <= maxPurchase / rate, "Compra máxima excedida");

        uint256 tokenAmount = msg.value * rate;
        uint256 contractBalance = paraizoToken.balanceOf(address(this));
        require(contractBalance >= tokenAmount, "Saldo insuficiente en el contrato");

        (bool sent, ) = payable(owner()).call{value: msg.value}("");
        require(sent, "Fallo al enviar ETH al owner");

        require(paraizoToken.transfer(msg.sender, tokenAmount), "Fallo al transferir tokens al comprador");

        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }

    // Para que el owner pueda depositar tokens en el contrato
    function depositTokens(uint256 _amount) external onlyOwner {
        paraizoToken.transferFrom(msg.sender, address(this), _amount);
    }

    // Actualizar el ratio
    function setRate(uint256 _newRate) external onlyOwner {
        rate = _newRate;
    }

    // Actualizar límites
    function setPurchaseLimits(uint256 _min, uint256 _max) external onlyOwner {
        minPurchase = _min;
        maxPurchase = _max;
    }

    // Verificar balance disponible
    function availableTokens() public view returns (uint256) {
        return paraizoToken.balanceOf(address(this));
    }

    // Retirar ETH del contrato (en caso de emergencia)
    function withdrawEth() external onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent, ) = payable(owner()).call{value: balance}("");
        require(sent, "Fallo al retirar ETH");
    }
}