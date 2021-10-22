type F<T> = T
// тип A обобщён другим типом

type E = F<number>
const i: E = 1
type S = F<string>
type MyArr<T> = T[]
const d: MyArr<string> = ['ggg', 'ddf']

const arr: Array<string> = ['hi', 'TS']

function identity<Type>(arg: Type): Type {
    return arg;
}

console.log(arr);

function identity(arg: number): number {
    return arg;
}

identity(2)



// function echo<T>(x: T): T {
//     return x
// }
// функция использующа обобщение

// const echo = <T>(x: T): T => {
//     return x
// }


const echo: <T>(x: T) => T = <T>(x: T): T => {
    return x
}
// указываем у функции тип

const res = echo('hello')
const res2 = echo<number>(2)
// когда нет явного указатия типа TS сам это делает

// обобщение класса
// class List<T> {
//     elements: T[] = []

//     add(element: T) {
//         this.elements.push(element)
//     }
// }

// const list = new List<string>()
// list.add('hello')
// list.add(3)

// обобщение интерфейса
interface IList<T> {
    elements: T[],
    add(element: T): void,
}

class List implements IList<string> {
    elements: string[] = []
    add(element: string): void {
        this.elements.push(element)
    }
}

const list = new List()
list.add('hello')
list.add(4)

type A<T extends string> = T
// T расширяется от string если так, то строка, иначе ничего
type A<T> = T extends string ? string : never

// type B = A<string>
// type C = A<'hello'>
// type D = A<number>

// интерфейсы можно использовать для описания объектов
interface IName {
    name: string
}

function printName<T extends IName>(person: T) {
    console.log(person.name);
}

printName({ name: 'HH', age: 23 })
// printName({ age: 23 })

// interface A {
//     a: string,
//     b: number,
//     c: boolean
// }

// тип B содержит ключи A
// type B = keyof A

function getProperty<ObjectType, KeyType extends keyof ObjectType>(object: ObjectType, key: KeyType): ObjectType[KeyType] {
    return object[key]
}

const res3 = getProperty({ name: 'gg', age: 23}, 'name')

// если можно определить тип массива, то U иначе never
// infer можно использовать только в условных типах

// const arr2 = [1, 'hi', false]
// type A<T> = T extends (infer U)[] ? U : never
// type B = typeof arr2
// type C = A<B>

const persone = { name: 'ff', age: 43 }
type A<T> = T extends {
    [key: string]: infer U
} ? U : never
type B = typeof persone
type C = A<B>



class Cat {
    say(): string {
        return 'meow'
    }
}
class Dog {
    say(): string {
        return 'woof'
    }
}

// интерфейс где задаётся механизм создания объекта нужного класса
interface IClass<T> {
    new (): T
}

function createObject<T>(c: IClass<T>): T {
    return new c()
}

const pet = createObject(Cat)



type UserType = {
    firsrName: string,
    lastName: string,
    age: string,
}

type PhotoType = {
    large: string,
    small: string,
}

// type ServerResponseType = {
//     errorCode: number,
//     messages: Array<string>,
//     data: UserType,
// }

// type ServerResponsePhotoType = {
//     errorCode: number,
//     messages: Array<string>,
//     data: PhotoType,
// }

type ServerResponseType<T> = {
    errorCode: number,
    messages: Array<string>,
    data: T,
}

const response1: ServerResponseType<UserType> = {
    errorCode: 1,
    messages: ['it', 'hi'],
    data: {
        firsrName: 'Ivan',
        lastName: 'Petrov',
        age: 33,
    }
}

// const response2: ServerResponsePhotoType = {
//     errorCode: 1,
//     messages: ['it', 'hi'],
//     data: {
//         large: 'url1',
//         small: 'url2',
//     }
// }

const response2: ServerResponseType<PhotoType> = {
    errorCode: 1,
    messages: ['it', 'hi'],
    data: {
        large: 'url1',
        small: 'url2',
    }
}

