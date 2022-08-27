export class Node {
  value: any;
  next: any;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

export class SinglyLinkedList {
  head: Node;
  tail: Node;

  constructor(value: any) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }
}
