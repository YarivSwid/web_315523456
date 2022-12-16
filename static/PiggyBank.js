
    function addDataResults(){
        for(i=0;i<tripsResults.length;i++){
        }
    }
    function addRowDo(i){
        let table = document.getElementById("AccountingTable");
        let row = table.insertRow(0);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell9 = row.insertCell(7);

        cell1.innerHTML = table.rows.length;/*document.getElementById("ID");*/
        cell2.innerHTML = document.getElementById("Name").value;
        cell3.innerHTML = document.getElementById("Type").value;
        cell4.innerHTML = document.getElementById("Date").value;
        cell5.innerHTML = document.getElementById("Essential").value;
        cell6.innerHTML = document.getElementById("Store").value;
        cell7.innerHTML = document.getElementById("Category").value;
        if(String(document.getElementById("Type").value).includes("Income")){
            cell9.innerHTML = Number(document.getElementById("Payment").value)*(-1);
        }
        else{
            cell9.innerHTML = document.getElementById("Payment").value;
        }
        updateSummaryTable();
    }

    function updateSummaryTable(){
        let sumTable = document.getElementById("summaryTable");
        let table = document.getElementById("AccountingTable");
        sumTable.deleteRow(0);
        let row = sumTable.insertRow(0);

        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        let cell5 = row.insertCell(5);
        var paymentSum = 0;
        var balance = 0;
        var notEssential = 0;
        var numOfEssential = 0;
        var countExpenses = 0;
        var paymentsThisMonth = 0;
        const date = new Date();
        var month;
        for(let i=0;i<table.rows.length;i++){
            balance += Number(table.rows[i].cells[7].firstChild.nodeValue);
            if(String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense")){
                paymentSum += Number(table.rows[i].cells[7].firstChild.nodeValue);
            }
            month = table.rows[i].cells[3].firstChild.nodeValue;
            if(String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") &&((date.getFullYear()==month.substring(0,4)) && (date.getMonth()+1)==month.substring(5,7))){
                countExpenses += 1;
            }
            if(String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && ((date.getFullYear()==month.substring(0,4)) && (date.getMonth()+1)==month.substring(5,7))){
                paymentsThisMonth += Number(table.rows[i].cells[7].firstChild.nodeValue);
            }
            if(String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && table.rows[i].cells[4].firstChild.nodeValue === "No"){
                notEssential += 1;
            }
            if(String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && table.rows[i].cells[4].firstChild.nodeValue === "Yes"){
                numOfEssential += 1;
            }
        }
        cell0.innerHTML = balance;
        cell1.innerHTML = paymentSum;
        cell2.innerHTML = notEssential;
        cell3.innerHTML = numOfEssential;
        cell4.innerHTML = paymentsThisMonth;
        cell5.innerHTML = countExpenses;
        updateKPI();
    }

    function updateKPI(){
        let TheCategoryWithMostExpenses = document.getElementById("TheCategoryWithMostExpenses");
        let NotEssentialExpensesPercentage = document.getElementById("NotEssentialExpensesPercentage");
        let RecurringNotEssentialExpenses = document.getElementById("RecurringNotEssentialExpenses");
        let RecurringNumberofExpenses = document.getElementById("RecurringNumberofExpenses");
        let RecurringSavings = document.getElementById("RecurringSavings");
        let RecurringExpenses = document.getElementById("RecurringExpenses");
        let table = document.getElementById("AccountingTable");
                var catMostExp = 0;
                var NotEssExpPer = 0;
                var NotEssExpPerNum = 0;
                var RecNotEssExpPer = 0;
                var RecNumOfExp = 0;
                var RecNotEssExpPerNum = 0;
                var RecSav = 0;
                var RecExp = 0;
                var thisMonthExp = 0;
                var lastMonthExp = 0;
                var thisMonthInc = 0;
                var lastMonthInc = 0;
                var thisMonthExpNum = 0;
                var lastMonthExpNum = 0;
                var thisMonthIncNum = 0;
                var lastMonthIncNum = 0;
                var thisMonthExpNotEss = 0;
                var thisMonthExpNumNotEss = 0;
                var lastMonthExpNotEss = 0;
                var lastMonthExpNumNotEss = 0;
                var RecIncNum = 0;
                var RecInc = 0;
                var notEssExp = 0;
                var notEssExpNum = 0;
                var Exp = 0;
                var ExpNum = 0;
                const date = new Date();
                var month;
                const arr = Array(9).fill(0);

                for(let i=0;i<table.rows.length;i++) {

                    month = table.rows[i].cells[3].firstChild.nodeValue;

                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && (table.rows[i].cells[4].firstChild.nodeValue === "No") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth() + 1) == month.substring(5, 7))) {
                        thisMonthExpNotEss += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        thisMonthExpNumNotEss += 1;
                    }

                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && (table.rows[i].cells[4].firstChild.nodeValue === "No")) {
                        notEssExp += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        notEssExpNum += 1;
                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense")) {
                        Exp += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        ExpNum += 1;
                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && (table.rows[i].cells[4].firstChild.nodeValue === "No") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth()) == month.substring(5, 7))) {
                        lastMonthExpNotEss += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        lastMonthExpNumNotEss += 1;
                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth() + 1) == month.substring(5, 7))) {
                        thisMonthExp += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        thisMonthExpNum += 1;
                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Income") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth() + 1) == month.substring(5, 7))) {
                        thisMonthInc += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        thisMonthIncNum += 1;

                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth()) == month.substring(5, 7))) {
                        lastMonthExp += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        lastMonthExpNum += 1;

                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Income") && ((date.getFullYear() == month.substring(0, 4)) && (date.getMonth()) == month.substring(5, 7))) {
                        lastMonthInc += Number(table.rows[i].cells[7].firstChild.nodeValue);
                        lastMonthIncNum += 1;
                    }
                    if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Food")) {
                        arr[0] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Technology")) {
                        arr[1] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Friends")) {
                        arr[2] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Restaurants")) {
                        arr[3] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Shopping")) {
                        arr[4] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Clothing")) {
                        arr[5] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Sport")) {
                        arr[6] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Home")) {
                        arr[7] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Study")) {
                        arr[8] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    } else if (String(table.rows[i].cells[2].firstChild.nodeValue).includes("Expense") && String(table.rows[i].cells[6].firstChild.nodeValue).includes("Wellbeing")) {
                        arr[9] += Number(table.rows[i].cells[7].firstChild.nodeValue);
                    }
                }
        let maxIndex = 0;
        for(let i=0; i<arr.length;i++){
            if(arr[i]>arr[maxIndex]){
                maxIndex = i;
            }
        }
        if(maxIndex == 0){
            catMostExp = "Food";
        }

        else if (maxIndex == 1){
            catMostExp = "Technology";
        }
        else if (maxIndex == 2){
            catMostExp = "Friends";
        }
        else if (maxIndex == 3){
            catMostExp = "Restaurants";
        }
        else if (maxIndex == 4){
            catMostExp = "Shopping";
        }
        else if (maxIndex == 5){
            catMostExp = "Clothing";
        }
        else if (maxIndex == 6){
            catMostExp = "Home";
        }
        else if (maxIndex == 7){
            catMostExp = "Study";
        }
        else if (maxIndex == 8){
            catMostExp = "Wellbeing";
        }

        NotEssExpPer = (notEssExp/Exp)*100;
        NotEssExpPerNum = notEssExpNum/ExpNum;
        RecNotEssExpPer = (thisMonthExpNotEss/lastMonthExpNotEss)*100;
        RecNotEssExpPerNum = thisMonthExpNumNotEss/lastMonthExpNumNotEss;
        RecNumOfExp = (thisMonthExpNum/lastMonthExpNum)*100;
        RecExp = (thisMonthExp/lastMonthExp)*100;
        RecInc = (thisMonthInc/lastMonthInc)*100;
        RecIncNum = (thisMonthIncNum/lastMonthIncNum)*100;
        NotEssentialExpensesPercentage.innerHTML = `${NotEssExpPer.toFixed(2)} %`;
        RecurringNotEssentialExpenses.innerHTML = `${RecNotEssExpPer.toFixed(2)} %`;
        RecurringNumberofExpenses.innerHTML = `${RecNumOfExp.toFixed(2)} %`;
        RecurringSavings.innerHTML = `${RecInc.toFixed(2)} %`;
        RecurringExpenses.innerHTML =`${RecExp.toFixed(2)} %`;

        TheCategoryWithMostExpenses.innerHTML = catMostExp;
     }

function openForm() {
    var x = document.getElementById('gridContainer');
    var y = document.getElementById('grid-container');
    var z = document.getElementById('LoginSignUp');

    if (x.style.display == "none") {
        x.style.display = "block";

    } else {
        x.style.display = "none";

    }
    if(y.style.display == "none")
    {
        y.style.display = "block";

    } else {
        y.style.display = "none";
        z.style.display = "none";

    }

    z.style.marginTop = "50px";

}


function checkPassword(){

    var password=document.getElementById(password).value;
    alert("Please insert more then 8 characters into your password");

    if (password.length<8){
        alert("Please insert more then 8 characters into your password");
        document.getElementById(password).value="";
    }
}

function submitSignup() {

    if (document.getElementById('firstname').value.length==0 ||
        document.getElementById('lastname').value.length==0 ||
        document.getElementById('phonenumer').value.length==0 ||
        document.getElementById('emailaddress').value.length==0)  {
        alert("Cant complete your signup, please fill all the fields below");
    }
    else {
        alert("Welcome to Piggy Bank! please login so we can start saving money");
        window.location="../views/PiggyBank.html";
    }
}

function submitFormLogin() {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;

    if (email.length==0 ||
        password.length==0  ){
        alert("Please fill all the fields");
        return false;
    }
    alert("Welcome to Piggy Bank!");
    window.location="../views/Piggy_Analytics.html";
    return true;
}

function submitForm() {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = "none";
        setTimeout(() => form.submit(), 3000);
    } );
}

function accSubmit() {
    let count =0;
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(count==0){
            addRowDo(1);

        }
        count = count + 1;
    } );
}
function openAnalytics() {
    var x = document.getElementById("accounting");
    var y = document.getElementById("analytics");
    var z = document.getElementById("showAccounting");
    var q = document.getElementById("showAnalytics");
    if (x.style.display == "none") {
        x.style.display = "block";
        q.style.display = "block";
        z.style.display = "none";
        y.style.display = "none";

    }
    else {
        x.style.display = "none";
        q.style.display = "none";
        z.style.display = "block";
        y.style.display = "grid";
    }

}

function checkPhone(phonenumer){
    var phone = document.getElementById(phonenumer).value;
    var phoneFormat = /^\d{10}$/;
    var checkNumbersPhone = checkNumbers(phone);
    if (!checkNumbersPhone || phone.length < 10) {
        alert("Your phone number is not right, please insert 10 numbers");
        document.getElementById(phonenumer).value="";
    }
    else{
        document.getElementById(phonenumer).value= phone;
    }
}
/*function checkPayment(){

    var payment = document.getElementById("Payment").value;
    var checkNumbersPayment = checkNumbers(payment);

    if (!checkNumbersPayment) {

        alert("Payment field is not right, please insert numbers only");
        document.getElementById("Payment").value="";
        return false;
    }
    document.getElementById("Payment").value= payment;
    return true;

}*/
/*function checkDate(){
    var d_reg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[1-9]|2[1-9])$/;
    var user_date =  document.getElementById("Date").value;
    if (d_reg.test(user_date)) {
    }
    else{
        alert("Invalid date format, please use mm/dd/yy date format");
        document.getElementById("Date").value="";

        return false;
    }

    return true;
}*/

function checkNumbers(number){
    var ans=true;
    var i;
    for (i = 0; i < number.length; i++) {
        var digit = number[i];
        if (digit=='0' || digit=='1' || digit=='2' || digit=='3' || digit=='4' || digit=='5' || digit=='6' || digit=='7' || digit=='8' || digit=='9'){
        }
        else{
            ans = false
        }
    }
    return ans;
}

