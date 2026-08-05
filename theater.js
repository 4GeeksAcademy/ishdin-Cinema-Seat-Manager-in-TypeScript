function generateTheaterRoom(rows, seats) {
    let theaterRoom = [];
    for(let i = 0; i < rows; i++){
    let rowSeats = [];
    for(let j = 0; j < seats; j++){
        rowSeats.push(Math.floor(Math.random()*2));
      
    }
    theaterRoom.push(rowSeats);    
   }
      for (let a = 0; a < theaterRoom.length; a++) {
          console.log(theaterRoom[a].join(' '));
      } 

   
    
   function displaySeat(){
        const columnHeader = ['  ', ...Array.from({ length: theaterRoom[0].length }, (_, i) => String(i + 1))].join(' ');
      const seatMap = [];

      for(let a = 0; a < theaterRoom.length; a++){
        const rowSeats = [];
        for (let b = 0; b < theaterRoom[a].length; b++){
            if(theaterRoom[a][b] === 0){
                rowSeats.push('L');
            } else {
                rowSeats.push('X');
            }
        }
        seatMap.push(`${a + 1} ${rowSeats.join(' ')}`);
      }

      return `${columnHeader}\n${seatMap.join('\n')}`;
    // return `${seatMap.join('\n')}`;
   }

  console.log(displaySeat());

//   Reserve a seat given a row and column number and return true if the seat was successfully reserved or false if the seat was already taken. 
function reserveSeat(row, column) {
    if (theaterRoom[row][column] === 0) {
        theaterRoom[row][column] = 1;
        return true;
    }
    return false;
}

// Create a function that counts the number how many seats are occupied and how many are available.
function countSeats() {
    let occupied = 0;
    let available = 0;

    for (let i = 0; i < theaterRoom.length; i++) {
        for (let j = 0; j < theaterRoom[i].length; j++) {
            if (theaterRoom[i][j] === 1) {
                occupied++;
            } else {
                available++;
            }
        }
    }
    return { occupied, available };
}
//implement the function that searches two adjacent seats available (horizontally, in the same row) and returns their positions
//implement the function that searches two adjacent seats available (horizontally, in the same row) and returns their positions    
function findAdjacentSeats() {
    let adjacentSeats = [];
    let count = 0;
    for (let i = 0; i < theaterRoom.length; i++) {
        for (let j = 0; j < theaterRoom[i].length - 1; j++) {
            if (theaterRoom[i][j] === 0 && theaterRoom[i][j + 1] === 0) {
                adjacentSeats.push([ [i, j], [i, j + 1] ]);
                count++;
            }
        }
    }
        if (count === 0) {
            console.log('No adjacent seats available.');
        } else {
            for(let i = 0; i < adjacentSeats.length; i++){
                console.log(`Row: ${adjacentSeats[i][0][0] + 1}, Seats: ${adjacentSeats[i][0][1] + 1} and ${adjacentSeats[i][1][1] + 1}`);
            }
        }
    // return adjacentSeats;
}
findAdjacentSeats(); // Example usage of the findAdjacentSeats function