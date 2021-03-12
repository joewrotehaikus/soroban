let thisRowEquals = (tableId, rowIndex, beadIndex) => {
    if (tableId === 'byOne') {
        return 10**rowIndex * beadIndex;
    }
    if (tableId === 'byFive') {
        if (beadIndex === 0) return 10**rowIndex *  5;
        return 0;
    }
}

let totalAbacus = (rows) => {
    let rtnNumber = 0;
    rows.forEach(row => {
        blank = row.querySelector('.blank');
        let [tableId, rowIndex, beadIndex] = identifyBlankBead(blank);
        rtnNumber += thisRowEquals(tableId, rowIndex, beadIndex);
    });
    return rtnNumber;
}

let identifyBlankBead = (beardTD) => {
    let row = beardTD.parentElement;
    let rowNumber = [...row.parentElement.children].indexOf(row);
    let beadNumber = [...row.children].indexOf(beardTD);
    let table = row.parentElement.parentElement;
    return [table.id, rowNumber, beadNumber];
}

let allRows = document.querySelectorAll('tr');
allRows.forEach(row => {
    row.addEventListener('click', e => {
        let row = e.target.parentElement;
        let currentBlank = row.querySelector('.blank');
        currentBlank.classList.remove('blank');
        e.target.classList.add('blank');
        numberHeader.textContent = totalAbacus(allRows);
    });
});

let numberHeader = document.getElementById('number');
numberHeader.textContent = totalAbacus(allRows);