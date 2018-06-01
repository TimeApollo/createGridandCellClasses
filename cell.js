function Cell ( rowIndex , columnIndex ){
    this.row = rowIndex;
    this.column = columnIndex;
    this.isClicked = false;
    this.value = 0;
    this.createElement();
}

Cell.prototype.createElement = function(){
    this.element = document.createElement( 'div' );
    this.element.dataset.row = this.row;
    this.element.dataset.column = this.column;
    this.element.classList.add( 'cell' );
}

Cell.prototype.setAsClicked = function(){
    this.isClicked = true;
    //console.log('cell function' , this)
}

Cell.prototype.appendToPage = function(parentElement){
    parentElement.appendChild(this.element);
}

Cell.prototype.assignValueToTextContent = function(){
    this.element.textContent = this.value;
}

Cell.prototype.removeTextContentValue = function(){
    this.element.textContent = '';
}