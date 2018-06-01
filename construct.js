let board = new Grid( 10 , 5 );
console.log('this is board' , board);

let cell = new Cell( 11 , 11 )
cell.appendToPage(document.body)

cell.assignValueToTextContent();

board.grid[0][0].assignValueToTextContent();