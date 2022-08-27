export class Node {
  value: Cell;
  next: any;

  constructor(value: Cell) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: Node;
  tail: Node;

  constructor(value: any) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }
}

export class Cell {
  row: number;
  col: number;
  cell: any;

  constructor(row: number, col: number, value: number) {
    this.row = row;
    this.col = col;
    this.cell = value;
  }
}
