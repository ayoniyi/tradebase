// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowV2 {

 enum EscrowState { Created, Funded, Completed, Refunded }

    struct Transaction {
        address payable buyer;
        address payable seller;
        address payable arbiter;
        uint256 amount;
        EscrowState state;
    }

    mapping(uint256 => Transaction) public transactions;
    uint256 public transactionCounter;

    event EscrowCreated(uint256 indexed transactionId, address indexed buyer, address indexed seller, address arbiter, uint256 amount);
    event FundsDeposited(uint256 indexed transactionId, address indexed depositor, uint256 amount);
    event TransactionCompleted(uint256 indexed transactionId, address indexed receiver);
    event TransactionRefunded(uint256 indexed transactionId, address indexed refundReceiver);
    event EscrowAmountChanged(uint256 indexed transactionId, uint256 newAmount);
    event BalanceChanged(uint256 indexed transactionId, uint256 newAmount);

    modifier onlyBuyer(uint256 transactionId) {
        require(msg.sender == transactions[transactionId].buyer, "Not the buyer");
        _;
    }

    modifier inState(uint256 transactionId, EscrowState state) {
        require(transactions[transactionId].state == state, "Invalid state");
        _;
    }

    modifier onlyArbiter(uint256 transactionId) {
        require(msg.sender == transactions[transactionId].arbiter, "Not the arbiter");
        _;
    }

    // function createEscrow(address payable _seller, address payable _arbiter, uint256 _amount) external {
    //     require(_amount > 0, "Invalid amount");
    //     transactionCounter++;
    //     Transaction storage transaction = transactions[transactionCounter];
    //     transaction.buyer = payable(msg.sender);
    //     transaction.seller = _seller;
    //     transaction.arbiter = _arbiter;
    //     transaction.amount = _amount;
    //     transaction.state = EscrowState.Created;

    //     emit EscrowCreated(transactionCounter, msg.sender, _seller, _arbiter, _amount);
    // }

    function createEscrow(address payable _seller, address payable _arbiter, uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        transactionCounter++;
        Transaction storage transaction = transactions[transactionCounter];
        transaction.buyer = payable(msg.sender);
        transaction.seller = _seller;
        transaction.arbiter = _arbiter;

        // Append 18 zeros to the end of the value to convert it to wei
        transaction.amount = _amount * 1e18;

        transaction.state = EscrowState.Created;

        emit EscrowCreated(transactionCounter, msg.sender, _seller, _arbiter, _amount);
    }

    function depositFunds(uint256 transactionId) external payable onlyBuyer(transactionId) inState(transactionId, EscrowState.Created) {
        require(msg.value > 0, "Invalid amount");
        require(msg.value == transactions[transactionId].amount, "Deposit amount does not match the escrow amount");
        
        //uint256 amount = (msg.value) / 2;
        transactions[transactionId].amount = msg.value;
        transactions[transactionId].state = EscrowState.Funded;

        emit FundsDeposited(transactionId, msg.sender, msg.value);
        emit EscrowAmountChanged(transactionId, transactions[transactionId].amount);
        emit BalanceChanged(transactionId, address(this).balance);
    }

    function completeTransaction(uint256 transactionId) external onlyBuyer(transactionId) inState(transactionId, EscrowState.Funded) {
    // Ensure the contract's balance is sufficient
    require(address(this).balance >= transactions[transactionId].amount, "Insufficient contract balance");

    // Calculate the payment to the seller (99% of the escrow amount)
    uint256 payment = (transactions[transactionId].amount * 95) / 100;
    //uint256 payment = (transactions[transactionId].amount);

    // Calculate the payment to the arbiter (1% of the escrow amount)
    uint256 fee = transactions[transactionId].amount - payment;

    // Transfer funds to the seller and arbiter
    require(transactions[transactionId].seller.send(payment), "Failed to send payment to the seller");
   require(transactions[transactionId].arbiter.send(fee), "Failed to send fee to the arbiter");

    // Update the escrow state to Completed
    transactions[transactionId].state = EscrowState.Completed;

    emit TransactionCompleted(transactionId, transactions[transactionId].seller);
    }


    function arbiterCompleteTransaction(uint256 transactionId) external onlyArbiter(transactionId) inState(transactionId, EscrowState.Funded) {
        // Calculate the payment to the seller (99% of the escrow amount)
        uint256 payment = (transactions[transactionId].amount * 95) / 100;

        // Calculate the payment to the arbiter (1% of the escrow amount)
        uint256 fee = transactions[transactionId].amount - payment;

        // Transfer funds to the seller and arbiter
        require(transactions[transactionId].seller.send(payment), "Failed to send payment to the seller");
        require(transactions[transactionId].arbiter.send(fee), "Failed to send fee to the arbiter");

        // Update the escrow state to Completed
        transactions[transactionId].state = EscrowState.Completed;

        // Emit the TransactionCompleted event
        emit TransactionCompleted(transactionId, transactions[transactionId].seller);
    }

    function arbiterRefundTransaction(uint256 transactionId) external onlyArbiter(transactionId) inState(transactionId, EscrowState.Funded) {
        // Refund the escrowed funds to the buyer
        transactions[transactionId].state = EscrowState.Refunded;
        transactions[transactionId].buyer.transfer(transactions[transactionId].amount);

        // Emit the TransactionRefunded event
        emit TransactionRefunded(transactionId, transactions[transactionId].buyer);
    }


    function getEscrowAmount(uint256 transactionId) external view returns (uint256) {
        return transactions[transactionId].amount;
    }

}