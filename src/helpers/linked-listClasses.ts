interface ICell {
  row: number;
  col: number;
  cell: number;
}

export class Node {
  value: ICell;
  next: Node | null;

  constructor(value: ICell) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  head: Node;
  tail: Node;

  constructor(value: ICell) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }

  unshift(newHead: Node) {
    if (!this.head) {
      this.head = newHead;
    } else {
      newHead.next = this.head;
      this.head = newHead;
    }

    return this;
  }

  pop() {
    let current = this.head;
    let prev = current;

    while (current?.next) {
      prev = current;
      current = current.next;
    }

    this.tail = prev;
    this.tail!.next = null;
    if (this.tail === null) this.tail = this.head;

    return current;
  }

  reverse() {
    let curr: Node | null = this.head;
    this.head = this.tail;
    this.tail = curr;
    let next;
    let prev = null;

    while (curr !== null) {
      next = curr!.next;
      curr!.next = prev;
      prev = curr;
      curr = next;
    }

    return this;
  }
}
