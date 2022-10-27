import { Component, OnInit } from "@angular/core";

//Practicing with generic types and destructuring.

// Simple funtion with generic type
function test<T>(arg: T): T {
  console.log(arg);
  return arg;
}

// Function interface
interface IdentityFn<T> {
  <T>(arg: T): T;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: IdentityFn<number> = identity;

//Extending generic type T to avoid Generic Constraints.
interface AsList {
  length: number;
}

const myF = <T extends AsList>(arg: T): string => {
  console.log(arg.length);
  return "test";
};

type dict = { a: 1; b: 1 };

const b: number = 1;
const a: typeof b = 2;

const d = { a: 1, b: 1 };
function foo<Type, Key extends keyof dict>(arg1: Type, arg2: Key): number {
  return d[arg2];
}

class A {
  test() {}
}

interface C<T> {
  do(): T;
}

class B extends A implements C<number> {
  do() {
    return 1;
  }
}

enum e {
  a = 1,
  b = 2,
}

type t = {
  a: number;
  b: string;
};

const variable: e = e.a;
const variable1: t = { a: 4, b: "a" };
const variable2: keyof t = "a";

//Conditional type
function foo1<T extends number | string>(arg: T): T {
  return arg;
}

function foo2<T extends { msg: string }>(arg: T): string {
  return arg.msg;
}

function aa({ test }: { test: number; test1: number }) {
  console.log(test);
  return test;
}

aa({ test: 1123123, test1: 2 });

//Mapped type
type I = {
  [key: string]: string;
};

const S: I = { test: "test" };

const DDD = {
  test: 1,
  test1: { tt: 33333 },
};

const {
  test1: { tt: abc },
} = DDD;
console.log(abc);

@Component({
  selector: "app-generics",
  template: "",
})
export class GenericsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    test("test");
    test(1);

    console.log(myIdentity(1));

    console.log(foo(1, "a"));
  }
}
