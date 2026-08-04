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
  console.log(chalk.yellow("4.") + " Save & quit");
  console.log(chalk.gray("═".repeat(30)));
};

let running = true;
const theatreRoom = generateTheaterRoom(8, 10);
while (running) {
  showMenu();
  const choice = await rl.question(chalk.green("\nChoose an option [1-4]: "));

  switch (choice.trim()) {
    case "1":
      // console.log(chalk.blue("\n📋 Available seats — coming soon!"));
      console.log(displaySeat(theatreRoom));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "2":
      console.log(chalk.blue("\n🎫 Reserve seats — coming soon!"));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "3":
      console.log(chalk.blue("\n🔄 Free seats — coming soon!"));
      await rl.question(chalk.dim("Press ENTER to continue..."));
      break;

    case "4":
      console.log(chalk.green("\n💾 Goodbye!"));
      running = false;
      break;

    default:
      console.log(chalk.red("\n❌ Invalid option. Choose 1-4."));
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
export { };
