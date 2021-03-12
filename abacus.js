const NUM_ROWS = 15;

let thisRowEquals = (tableId, rowIndex, beadIndex) => {
    if (tableId === 'byOne') {
        return 10**rowIndex * beadIndex;
    }
    if (tableId === 'byFive') {
        if (beadIndex === 0) return 10**rowIndex *  5;
        return 0;
    }
    return 0;
}

let totalAbacus = (rows) => {
    let rtnNumber = 0;
    rows.forEach((row, index) => {
        let table = row.parentElement.parentElement;
        blank = row.querySelector('.blank');
        let rowIndex = index >= NUM_ROWS ? index - NUM_ROWS : index;
        beadIndex = [...row.children].indexOf(blank);
        rtnNumber += thisRowEquals(table.id, rowIndex, beadIndex);
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
        let [tableId, rowNumber, beadNumber] = identifyBlankBead(e.target);
        let row = e.target.parentElement;
        let currentBlank = row.querySelector('.blank');
        currentBlank.classList.remove('blank');
        e.target.classList.add('blank');
        numberHeader.textContent = totalAbacus(allRows)
            .toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    });
});

let numberHeader = document.getElementById('number');
numberHeader.textContent = 0;