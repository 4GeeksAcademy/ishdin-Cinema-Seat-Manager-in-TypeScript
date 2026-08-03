let theaterRoom = [];
let rows = 8;
let columns = 10;
for(let i = 0; i < rows; i++){
    let rowSeats = [];
    for(let j = 0; j < columns; j++){
        rowSeats.push(Math.floor(Math.random()*2));
      
    }
    theaterRoom.push(rowSeats);    
   }
    //  for (let a = 0; a < theaterRoom.length; a++) {
    //      console.log(theaterRoom[a].join(' '));
     

   
    
   function displaySeat(rows, column){
      for(let a = 0; a < rows; a++){
        for (let b = 0; b < column; b++){
            if(theaterRoom[a][b] === 0){
                theaterRoom[a][b] = 'L';
            } else {
                theaterRoom[a][b] = 'X';
            }
            
        }
        console.log(theaterRoom[a].join(' '));
      }
   }

  displaySeat(8, 10);