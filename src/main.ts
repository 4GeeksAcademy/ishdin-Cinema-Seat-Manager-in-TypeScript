if (typeof document !== "undefined") {
  import("./style.css").then(() => {
    const app = document.querySelector<HTMLParagraphElement>("#app");
    if (app) {
      app.textContent = "If you can see this, Tailwind is working.";
    }
  });
}
import chalk from "chalk";
import { createInterface } from "readline/promises";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
function showMenu(): void {
  console.clear();
  console.log(chalk.bold.cyan("\n🎬 CINEMA SEAT MANAGER"));
  console.log(chalk.gray("═".repeat(30)));
  console.log(chalk.yellow("1.") + " Check available seats");
  console.log(chalk.yellow("2.") + " Reserve seats");
  console.log(chalk.yellow("3.") + " Free seats");
  console.log(chalk.yellow("4.") + " Adjacent seats");
  console.log(chalk.yellow("5.") + " Save & quit");
  console.log(chalk.gray("═".repeat(30)));
};

let running = true;
const theatreRoom = generateTheaterRoom(8, 10);
while (running) {
  showMenu();
  const choice = await rl.question(chalk.green("\nChoose an option [1-5]: "));

  switch (choice.trim()) {
    case "1":
      // console.log(chalk.blue("\n📋 Available seats — coming soon!"));
      console.log(displaySeat(theatreRoom));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "2":
      const rowInput = await rl.question(chalk.green("Enter row number (1-8): "));
      const columnInput = await rl.question(chalk.green("Enter column number (1-10): "));

      const row = Number(rowInput) - 1;
      const column = Number(columnInput) - 1;

      if (
        Number.isNaN(row) ||
        Number.isNaN(column) ||
        row < 0 ||
        row >= theatreRoom.length ||
        column < 0 ||
        column >= theatreRoom[0].length
      ) {
        console.log(chalk.red("\n❌ Invalid seat position."));
      } else {
        console.log(
          reserveSeat(row, column)
            ? chalk.green("\n✅ Seat reserved successfully!")
            : chalk.red("\n❌ Seat is already taken!")
        );
      }
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "3":
      // console.log(chalk.blue("\n🔄 Free seats — coming soon!"));
      console.log(countSeats(theatreRoom));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "4":
      // console.log(chalk.blue("\n💾 Adjacent seats — coming soon!"));
      console.log(findAdjacentSeats(theatreRoom));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "5":
      console.log(chalk.green("\n💾 Goodbye!"));
      running = false;
      break;

    default:
      console.log(chalk.red("\n❌ Invalid option. Choose 1-5."));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;
  }
}

rl.close();
function generateTheaterRoom(rows: number, seats: number) {
  let theaterRoom = [];
  for (let i = 0; i < rows; i++) {
    let rowSeats = [];
    for (let j = 0; j < seats; j++) {
      rowSeats.push(0);
    }
    theaterRoom.push(rowSeats);
  }
  return theaterRoom;
}

function displaySeat(matrix: number[][]): string {
  const columnHeader = ['-', ...Array.from({ length: matrix[0].length }, (_, i) => String(i + 1))].join(' ');
  const seatMap = [];

  for (let a = 0; a < matrix.length; a++) {
    const rowSeats = [];
    for (let b = 0; b < matrix[a].length; b++) {
      if (matrix[a][b] === 0) {
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

function reserveSeat(row: number, column: number): boolean {
  if (theatreRoom[row][column] === 0) {
    theatreRoom[row][column] = 1;
    return true;
  }
  return false;
}
function countSeats(theatreRoom: number[][]) {
  let occupied = 0;
  let available = 0;

  for (let i = 0; i < theatreRoom.length; i++) {
    for (let j = 0; j < theatreRoom[i].length; j++) {
      if (theatreRoom[i][j] === 1) {
        occupied++;
      } else {
        available++;
      }
    }
  }
  return { occupied, available };
}

function findAdjacentSeats(theatreRoom: number[][]) {
  let adjacentSeats = [];
  let finalAdjacentSeats = [];
  let count = 0;
  for (let i = 0; i < theatreRoom.length; i++) {
    for (let j = 0; j < theatreRoom[i].length - 1; j++) {
      if (theatreRoom[i][j] === 0 && theatreRoom[i][j + 1] === 0) {
        adjacentSeats.push([[i, j], [i, j + 1]]);
        count++;
      }
    }
  }
  if (count === 0) {
    console.log('No adjacent seats available.');
  } else {
    for (let i = 0; i < adjacentSeats.length; i++) {
      finalAdjacentSeats.push(`Row: ${adjacentSeats[i][0][0] + 1}, Seats: ${adjacentSeats[i][0][1] + 1} and ${adjacentSeats[i][1][1] + 1}`);
    }
  }
     return finalAdjacentSeats;
}
export { };

