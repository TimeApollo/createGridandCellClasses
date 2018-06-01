function Grid ( rowLength , columnLength , gridParentElement = document.getElementById( 'main' ) ){
    this.rowLength = rowLength;
    this.columnLength = columnLength;
    this.gridParentElement = gridParentElement; //defaults to main tag if none is specified.
    
    this.createGrid(); //makes a grid using the size parameters passed in.

    this.directions = {
        up: [ -1 , 0 ],
        down: [ 1 , 0 ],
        left: [ 0 , -1 ],
        right: [ 0 , 1 ],
    }
    
    console.log( this.grid )
}

//creates the grid array. stores the cell objects and the elements they are attached to.
Grid.prototype.createGrid = function(){

    this.grid = new Array( this.rowLength ).fill();
    this.createElement();

    this.grid.forEach( ( _ , rowIndex ) => {
        this.grid[rowIndex] = this.createRow();
        this.grid[rowIndex].forEach (( _ , columnIndex ) => {
            this.grid[ rowIndex ][ columnIndex ] = this.createCell( rowIndex , columnIndex );
        });        
        this.grid.element.appendChild( this.grid[ rowIndex ].rowElement );
    });
    this.gridParentElement.appendChild( this.grid.element );
    return this;
}

//creates the element that contains the whole grid. also is where the event listeners are attached to the grid.
Grid.prototype.createElement = function(){
    this.grid.element = document.createElement( 'article' );
    this.grid.element.classList.add( 'container' );
    this.grid.element.addEventListener( 'click' , this );
    this.grid.element.addEventListener( 'contextmenu' , this );
}

//makes the row elements for the cells to be appended to and the row array for the cells to be stored in.
Grid.prototype.createRow = function(){
    const row = new Array( this.columnLength ).fill()
    row.rowElement = document.createElement( 'section' )
    row.rowElement.classList.add( 'row' )
    
    return row 
}

//creates instance of cell and appends to grid rowelement. returns cell
Grid.prototype.createCell = function( rowIndex , columnIndex ){
    const cell = new Cell( rowIndex , columnIndex );
    this.grid[rowIndex].rowElement.appendChild( cell.element );

    return cell;
}

//returns the cell object from the grid array
Grid.prototype.findCell = function( rowIndex , columnIndex ){
    if( this.grid[ rowIndex ] && this.grid[ rowIndex ][ columnIndex ] ){ //checks if exists
        const cell = this.grid[ rowIndex ][ columnIndex ];
        return cell
    }
}

//takes cell object and returns the neighbors above, below, left and right of the cell object passed in.
Grid.prototype.returnNeighbors = function( Cell ){
    if( !Cell ) return console.log('hey');
    let neighborArray = []
    let rowIndex = Number( Cell.element.dataset.row );
    let columnIndex = Number( Cell.element.dataset.column );

    //loops through an object in the constructor that has the row and index values needed to move up,down,left, and right from point of origin.
    for ( let direction in this.directions ){
        let cell = this.findCell( rowIndex + this.directions[direction][0] , columnIndex + this.directions[direction][1] );
        if ( cell ) neighborArray.push(cell);
    }
    return neighborArray;
}

Grid.prototype.handleEvent = function( event ){
    let clickedCell = this.findCell( Number( event.target.dataset.row) , Number(event.target.dataset.column ))
    if( event.type === 'click' ){
        console.log('target' , event.target);
        clickedCell.setAsClicked();
        this.returnNeighbors( clickedCell ).forEach( cell => cell.setAsClicked());
        console.log( 'neighbors' , this.returnNeighbors( clickedCell ));
        console.log( 'changed' , clickedCell )

    }else if( event.type === 'contextmenu'){
        event.preventDefault();
        console.log( 'yo' )
    }

}