var BankAccount =  (function () {
    function BankAccount(name, gender, dob, email, mobile, address, initialBalance, adharNo, panNo) {
        this.accountDetails = {
            name: name,
            gender: gender,
            dob: dob,
            email: email,
            mobile: mobile,
            address: address,
            adharNo: adharNo,
            panNo: panNo,
            balance: initialBalance,
            transactions: [],
            isOpen: true
        };
    }
    BankAccount.prototype.updateKYC = function (name, dob, email, mobile, adharNo, panNo) {
        this.accountDetails.name = name;
        this.accountDetails.dob = dob;
        this.accountDetails.email = email;
        this.accountDetails.mobile = mobile;
        this.accountDetails.adharNo = adharNo;
        this.accountDetails.panNo = panNo;
    };
    BankAccount.prototype.depositMoney = function (amount, details) {
        if (details === void 0) { details = ''; }
        if (!this.accountDetails.isOpen) {
            throw new Error('Account is closed');
        }
        this.accountDetails.balance += amount;
        var transaction = {
            type: 'deposit',
            amount: amount,
            date: new Date(),
            details: details
        };
        this.accountDetails.transactions.push(transaction);
    };
    BankAccount.prototype.withdrawMoney = function (amount, details) {
        if (details === void 0) { details = ''; }
        if (!this.accountDetails.isOpen) {
            throw new Error('Account is closed');
        }
        if (amount > this.accountDetails.balance) {
            throw new Error('Insufficient balance');
        }
        this.accountDetails.balance -= amount;
        var transaction = {
            type: 'withdrawal',
            amount: amount,
            date: new Date(),
            details: details
        };
        this.accountDetails.transactions.push(transaction);
    };
    BankAccount.prototype.transferMoney = function (toAccount, amount, details) {
        if (details === void 0) { details = ''; }
        if (!this.accountDetails.isOpen) {
            throw new Error('Account is closed');
        }
        if (amount > this.accountDetails.balance) {
            throw new Error('Insufficient balance');
        }
        this.accountDetails.balance -= amount;
        toAccount.depositMoney(amount, details);
        var transaction = {
            type: 'transfer',
            amount: amount,
            date: new Date(),
            details: "".concat(details, " - Transferred to ").concat(toAccount.getAccountDetails().name)
        };
        this.accountDetails.transactions.push(transaction);
    };
    BankAccount.prototype.receiveMoney = function (fromAccount, amount, details) {
        if (details === void 0) { details = ''; }
        if (!this.accountDetails.isOpen) {
            throw new Error('Account is closed');
        }
        fromAccount.withdrawMoney(amount, details);
        this.depositMoney(amount, "".concat(details, " - Received from ").concat(fromAccount.getAccountDetails().name));
        var transaction = {
            type: 'receive',
            amount: amount,
            date: new Date(),
            details: "".concat(details, " - Received from ").concat(fromAccount.getAccountDetails().name)
        };
        this.accountDetails.transactions.push(transaction);
    };
    BankAccount.prototype.printStatement = function () {
        console.log("Account Details: Name: ".concat(this.accountDetails.name, " Gender: ").concat(this.accountDetails.gender, " Date of Birth: ").concat(this.accountDetails.dob, " Email: ").concat(this.accountDetails.email, " Mobile: ").concat(this.accountDetails.mobile, " Address: ").concat(this.accountDetails.address, " Aadhar No.: ").concat(this.accountDetails.adharNo, " PAN No.: ").concat(this.accountDetails.panNo, " Balance: ").concat(this.accountDetails.balance));
        console.log('Transaction History:');
        for (var _i = 0, _a = this.accountDetails.transactions; _i < _a.length; _i++) {
            var transaction = _a[_i];
            console.log("Type: ".concat(transaction.type, "\n        Amount: ").concat(transaction.amount, "\n        Date: ").concat(transaction.date, "\n        Details: ").concat(transaction.details));
        }
    };
    BankAccount.prototype.closeAccount = function () {
        this.accountDetails.isOpen = false;
    };
    BankAccount.prototype.getAccountDetails = function () {
        return this.accountDetails;
    };
    return BankAccount;
}());
var account1 = new BankAccount('John Doe', 'male', new Date('1990-01-01'), 'johndoe@example.com', '1234567890', '123 Main St', 10000, '1234 5678 9012', 'ABCDE1234F');
var account2 = new BankAccount('Jane Smith', 'female', new Date('1995-01-01'), 'janesmith@example.com', '9876543210', '456 Oak Ave', 5000, '5678 9012 3456', 'FGHIJ5678K');
// Test updateKYC method
account1.updateKYC('John M. Doe', new Date('1990-01-01'), 'johndoe@example.com', '1234567890', '1234 5678 9012', 'ABCDE1234F');
console.log(account1.getAccountDetails());
// Test depositMoney method
account1.depositMoney(5000, 'Salary');
console.log(account1.getAccountDetails());
// Test withdrawMoney method
account1.withdrawMoney(2000, 'Grocery shopping');
console.log(account1.getAccountDetails());
// Test transferMoney method
account1.transferMoney(account2, 3000, 'Rent');
console.log(account1.getAccountDetails());
console.log(account2.getAccountDetails());
// Test receiveMoney method
account2.receiveMoney(account1, 1500, 'Loan repayment');
console.log(account1.getAccountDetails());
console.log(account2.getAccountDetails());
// Test printStatement method
account1.printStatement();
// Test closeAccount method
account1.closeAccount();
console.log(account1.getAccountDetails());
