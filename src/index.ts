import {Customer} from './customerClass';
import {Account} from './accountClass';
import {Invoice} from './invoiceClass';

let customerList: Customer[] = [];
let accountList: Account[] = [];
let invoiceList: Invoice[] = [];

document.getElementById('addCustomer-btn').addEventListener('click',()=> addCustomer());
document.getElementById('purchase-btn').addEventListener('click',()=> purchase());
document.getElementById('displayModal-btn').addEventListener('click',()=> displayModal());
document.getElementById('deposit-btn').addEventListener('click',()=> deposit());
document.getElementById('withdraw-btn').addEventListener('click',()=> withdraw());

let addCustomer = () => {
    let cName = (<HTMLInputElement>document.getElementById('customerName')).value.trim();
    let discount = +(<HTMLInputElement>document.getElementById('discount')).value;
    if(cName !== '' && discount >= 0) {
    let customer = new Customer(customerList.length + 1, cName, discount);
    customerList.push(customer);
    (<HTMLInputElement>document.getElementById('customerName')).value = '';
    (<HTMLInputElement>document.getElementById('discount')).value = '';
    updateCustomerSelectList();
    let cAccount = new Account(accountList.length + 1, customer);
    accountList.push(cAccount);
    // console.log(customerList);
}
};

let updateCustomerSelectList = () => {
    let purchaseSelect = <HTMLInputElement>document.getElementById('purchaseCustomerList');
    purchaseSelect.innerHTML = '';
    let walletSelect = <HTMLInputElement>document.getElementById('walletCustomerList');
    walletSelect.innerHTML = '';
    let selectedOption = document.createElement('option');
    selectedOption.selected = true;
    selectedOption.innerHTML = 'Select...';
    walletSelect.append(selectedOption);
    selectedOption = document.createElement('option');
    selectedOption.selected = true;
    selectedOption.innerHTML = 'Select...';
    purchaseSelect.append(selectedOption);

    for (let i in customerList) {
        let option = document.createElement('option');
        option.value = customerList[i].getID().toString();
        option.innerHTML = customerList[i].getName();
        option.selected = false;
        purchaseSelect.append(option);
        option = document.createElement('option');
        option.value = customerList[i].getID().toString();
        option.innerHTML = customerList[i].getName();
        option.selected = false;
        walletSelect.append(option);
    }

}

let deposit = () => {
    let customerID = + (<HTMLSelectElement>document.getElementById('walletCustomerList')).value;
    let amount = +(<HTMLInputElement>document.getElementById('walletAmount')).value;
    //console.log(customerID);
    if(customerID !== NaN && amount != 0) {
    let customer: Customer;
    let details = 'Amount Deposit';
    
    //console.log(customerID,amount);
    for (let i in accountList) {
        if (accountList[i].customer.ID == customerID) {
            customer = accountList[i].customer;
            accountList[i].deposit(amount);
            cAlert('Amount Deposited. '+ accountList[i].toString() , 'alert-success');
        }
    }
    let gCheck = (<HTMLInputElement>document.getElementById('generateInvoice')).checked;
    if (gCheck){ 
        let depositInvoice = new Invoice(invoiceList.length+1,customer,amount,details);
        invoiceList.push(depositInvoice);
        generateInvoice(depositInvoice);  
}
    (<HTMLSelectElement>document.getElementById('walletCustomerList')).options[0].selected = true;
    (<HTMLInputElement>document.getElementById('walletAmount')).value = '';
}
}

let withdraw = () => {
    let customerID = + (<HTMLSelectElement>document.getElementById('walletCustomerList')).value;
    let amount = +(<HTMLInputElement>document.getElementById('walletAmount')).value;
    if(customerID !== NaN && amount != 0) {
    //console.log(customerID);
    let customer: Customer;
    let details = 'Amount withdrawed'
    
    
    let wCheck:boolean;
    //console.log(customerID,amount);
    for (let i in accountList) {
        if (accountList[i].customer.ID == customerID) {
            customer = accountList[i].customer;
            wCheck = accountList[i].withdraw(amount);
            if(wCheck){
                cAlert('Amount withdrawed. ' + accountList[i].toString() , 'alert-primary');
            }
            else{
                cAlert('Withdrawl amount Exceeds balance. Try again!', 'alert-danger');
            }
        }
    }
    let gCheck = (<HTMLInputElement>document.getElementById('generateInvoice')).checked;
    if(gCheck && wCheck){
        let withdrawlInvoice = new Invoice(invoiceList.length+1,customer,amount,details);
        invoiceList.push(withdrawlInvoice);
        generateInvoice(withdrawlInvoice);  
    }
    (<HTMLSelectElement>document.getElementById('walletCustomerList')).options[0].selected = true;
    (<HTMLInputElement>document.getElementById('walletAmount')).value = '';
}
}

let purchase = () => {
    let customerID = + (<HTMLSelectElement>document.getElementById('purchaseCustomerList')).value;
    let amount = +(<HTMLInputElement>document.getElementById('purchaseAmount')).value;
    //console.log(customerID,amount);
    if(customerID===NaN || amount == 0) return;
    //console.log(customerID,amount);
    let customerAccount:Account;
    let details = 'Purchase';
    for (let i in accountList) {
        if (accountList[i].customer.ID == customerID) {
            customerAccount = accountList[i];
        }
    }
    let invoice = new Invoice(invoiceList.length+1,customerAccount.getCustomer(),amount,details);
    

    if(customerAccount.getBalance() >= invoice.getAmountAfterDiscount()){
        customerAccount.setBalance(customerAccount.getBalance()-invoice.getAmountAfterDiscount());
        invoiceList.push(invoice);
        generateInvoice(invoice);
        cAlert("Purchase Successful!!",'alert-success');
    }else{
        cAlert('Balance is low. Deposit Amount to make purchase.','alert-danger');
    }
    (<HTMLSelectElement>document.getElementById('purchaseCustomerList')).options[0].selected = true;
    (<HTMLInputElement>document.getElementById('purchaseAmount')).value = '';
}


let generateInvoice = (invoice:Invoice) => {

    
    let tableContainer = <HTMLDivElement>document.getElementById('invoiceTable');
    if (tableContainer.childElementCount == 0) {
        // Table layout Creation
        var table = <HTMLTableElement>document.createElement('table');
        table.setAttribute('class', 'table table-hover');
        var tableCaption = <HTMLTableCaptionElement>document.createElement('caption');
        tableCaption.id='tableCaption';
        tableCaption.innerHTML = `Total Invoices ${invoiceList.length}`;
        var tableHead = <HTMLTableHeaderCellElement><unknown>document.createElement('thead');
        tableHead.setAttribute('class', 'thead-dark');
        var tableBody = <HTMLTableElement><unknown>document.createElement('tbody');
        tableBody.id = 'tableBody';
        var tr = <HTMLTableRowElement>document.createElement('tr');
        var th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'Invoice no.';
        tr.append(th);
        var th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'Customer Name';
        tr.append(th);
        var th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'Details';
        tr.append(th);
        var th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'Amount';
        tr.append(th);
        var th = <HTMLTableHeaderCellElement>document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerHTML = 'After Discount';
        tr.append(th);
        tableHead.append(tr);
        table.append(tableCaption, tableHead, tableBody);
        tableContainer.append(table);
    }
    var ouputTableBody = <HTMLTableElement>document.getElementById('tableBody');
    var tCaption = <HTMLTableCaptionElement>document.getElementById('tableCaption');
    tCaption.innerHTML = `Total Invoices ${invoiceList.length}`;
    var tr = <HTMLTableRowElement>document.createElement('tr');
    var th = <HTMLTableHeaderCellElement>document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerHTML = (invoiceList.length).toString();
    var td = <HTMLTableDataCellElement>document.createElement('td');
    td.innerHTML = invoice.getCustomerName();
    tr.append(th, td);
    td = <HTMLTableDataCellElement>document.createElement('td');
    td.innerHTML = invoice.details;
    tr.append(td);
    td = <HTMLTableDataCellElement>document.createElement('td');
    td.innerHTML = `$${invoice.getAmount()}`;
    tr.append(td);
    td = <HTMLTableDataCellElement>document.createElement('td');
    if(invoice.details === 'Purchase')
    td.innerHTML = `$${invoice.getAmountAfterDiscount()}`;
    else
    td.innerHTML = '-';
    tr.append(td);
    ouputTableBody.append(tr);
    

}


let displayModal = ()=>{
    let customerID = + (<HTMLSelectElement>document.getElementById('purchaseCustomerList')).value;
    let amount = +(<HTMLInputElement>document.getElementById('purchaseAmount')).value;
    if(customerID === NaN || amount == 0) {
    (<HTMLDivElement>document.getElementById('purchaseConfirm')).innerText = 'Invalid Data'
    return;
}
    //console.log(customerID,amount);
    let customerAccount:Account;
    let details = 'Purchase';
    for (let i in accountList) {
        if (accountList[i].customer.ID == customerID) {
            customerAccount = accountList[i];
        }
    }
    let discountAmount = +(customerAccount.getCustomer().getDiscount() * amount / 100).toFixed(2);
    let afterDiscount = amount-discountAmount;
    
    (<HTMLDivElement>document.getElementById('purchaseConfirm')).innerText = 
        `Amount : ${amount}
         Discount : ${discountAmount}
         Amount after Discount : ${afterDiscount} `;
    
}


let cAlert = (message:string,type:string)=> {
    (<HTMLDivElement>document.getElementById('myalert-message')).innerHTML = message;
    (<HTMLDivElement>document.getElementById('myalert')).style.display = 'block';
    let classNames = (<HTMLDivElement>document.getElementById('myalert')).className;
    classNames = classNames.replace('alert-danger','');
    classNames = classNames.replace('alert-success','');
    classNames = classNames.replace('alert-primary','');
    (<HTMLDivElement>document.getElementById('myalert')).className = classNames + " " +type;
}