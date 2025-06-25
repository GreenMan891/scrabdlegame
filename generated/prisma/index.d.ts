
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Counter
 * 
 */
export type Counter = $Result.DefaultSelection<Prisma.$CounterPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model DailyScore
 * 
 */
export type DailyScore = $Result.DefaultSelection<Prisma.$DailyScorePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Counters
 * const counters = await prisma.counter.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Counters
   * const counters = await prisma.counter.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.counter`: Exposes CRUD operations for the **Counter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Counters
    * const counters = await prisma.counter.findMany()
    * ```
    */
  get counter(): Prisma.CounterDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyScore`: Exposes CRUD operations for the **DailyScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyScores
    * const dailyScores = await prisma.dailyScore.findMany()
    * ```
    */
  get dailyScore(): Prisma.DailyScoreDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Counter: 'Counter',
    Player: 'Player',
    DailyScore: 'DailyScore'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "counter" | "player" | "dailyScore"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Counter: {
        payload: Prisma.$CounterPayload<ExtArgs>
        fields: Prisma.CounterFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CounterFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CounterFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          findFirst: {
            args: Prisma.CounterFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CounterFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          findMany: {
            args: Prisma.CounterFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          create: {
            args: Prisma.CounterCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          createMany: {
            args: Prisma.CounterCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CounterCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          delete: {
            args: Prisma.CounterDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          update: {
            args: Prisma.CounterUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          deleteMany: {
            args: Prisma.CounterDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CounterUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CounterUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>[]
          }
          upsert: {
            args: Prisma.CounterUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CounterPayload>
          }
          aggregate: {
            args: Prisma.CounterAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCounter>
          }
          groupBy: {
            args: Prisma.CounterGroupByArgs<ExtArgs>
            result: $Utils.Optional<CounterGroupByOutputType>[]
          }
          count: {
            args: Prisma.CounterCountArgs<ExtArgs>
            result: $Utils.Optional<CounterCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      DailyScore: {
        payload: Prisma.$DailyScorePayload<ExtArgs>
        fields: Prisma.DailyScoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyScoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyScoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          findFirst: {
            args: Prisma.DailyScoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyScoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          findMany: {
            args: Prisma.DailyScoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>[]
          }
          create: {
            args: Prisma.DailyScoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          createMany: {
            args: Prisma.DailyScoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyScoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>[]
          }
          delete: {
            args: Prisma.DailyScoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          update: {
            args: Prisma.DailyScoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          deleteMany: {
            args: Prisma.DailyScoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyScoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyScoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>[]
          }
          upsert: {
            args: Prisma.DailyScoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyScorePayload>
          }
          aggregate: {
            args: Prisma.DailyScoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyScore>
          }
          groupBy: {
            args: Prisma.DailyScoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyScoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyScoreCountArgs<ExtArgs>
            result: $Utils.Optional<DailyScoreCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    counter?: CounterOmit
    player?: PlayerOmit
    dailyScore?: DailyScoreOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    scores: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | PlayerCountOutputTypeCountScoresArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountScoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyScoreWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Counter
   */

  export type AggregateCounter = {
    _count: CounterCountAggregateOutputType | null
    _avg: CounterAvgAggregateOutputType | null
    _sum: CounterSumAggregateOutputType | null
    _min: CounterMinAggregateOutputType | null
    _max: CounterMaxAggregateOutputType | null
  }

  export type CounterAvgAggregateOutputType = {
    value: number | null
  }

  export type CounterSumAggregateOutputType = {
    value: number | null
  }

  export type CounterMinAggregateOutputType = {
    id: string | null
    name: string | null
    value: number | null
  }

  export type CounterMaxAggregateOutputType = {
    id: string | null
    name: string | null
    value: number | null
  }

  export type CounterCountAggregateOutputType = {
    id: number
    name: number
    value: number
    _all: number
  }


  export type CounterAvgAggregateInputType = {
    value?: true
  }

  export type CounterSumAggregateInputType = {
    value?: true
  }

  export type CounterMinAggregateInputType = {
    id?: true
    name?: true
    value?: true
  }

  export type CounterMaxAggregateInputType = {
    id?: true
    name?: true
    value?: true
  }

  export type CounterCountAggregateInputType = {
    id?: true
    name?: true
    value?: true
    _all?: true
  }

  export type CounterAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Counter to aggregate.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Counters
    **/
    _count?: true | CounterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CounterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CounterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CounterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CounterMaxAggregateInputType
  }

  export type GetCounterAggregateType<T extends CounterAggregateArgs> = {
        [P in keyof T & keyof AggregateCounter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCounter[P]>
      : GetScalarType<T[P], AggregateCounter[P]>
  }




  export type CounterGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CounterWhereInput
    orderBy?: CounterOrderByWithAggregationInput | CounterOrderByWithAggregationInput[]
    by: CounterScalarFieldEnum[] | CounterScalarFieldEnum
    having?: CounterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CounterCountAggregateInputType | true
    _avg?: CounterAvgAggregateInputType
    _sum?: CounterSumAggregateInputType
    _min?: CounterMinAggregateInputType
    _max?: CounterMaxAggregateInputType
  }

  export type CounterGroupByOutputType = {
    id: string
    name: string
    value: number
    _count: CounterCountAggregateOutputType | null
    _avg: CounterAvgAggregateOutputType | null
    _sum: CounterSumAggregateOutputType | null
    _min: CounterMinAggregateOutputType | null
    _max: CounterMaxAggregateOutputType | null
  }

  type GetCounterGroupByPayload<T extends CounterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CounterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CounterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CounterGroupByOutputType[P]>
            : GetScalarType<T[P], CounterGroupByOutputType[P]>
        }
      >
    >


  export type CounterSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    value?: boolean
  }, ExtArgs["result"]["counter"]>

  export type CounterSelectScalar = {
    id?: boolean
    name?: boolean
    value?: boolean
  }

  export type CounterOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "value", ExtArgs["result"]["counter"]>

  export type $CounterPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Counter"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      value: number
    }, ExtArgs["result"]["counter"]>
    composites: {}
  }

  type CounterGetPayload<S extends boolean | null | undefined | CounterDefaultArgs> = $Result.GetResult<Prisma.$CounterPayload, S>

  type CounterCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CounterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CounterCountAggregateInputType | true
    }

  export interface CounterDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Counter'], meta: { name: 'Counter' } }
    /**
     * Find zero or one Counter that matches the filter.
     * @param {CounterFindUniqueArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CounterFindUniqueArgs>(args: SelectSubset<T, CounterFindUniqueArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Counter that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CounterFindUniqueOrThrowArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CounterFindUniqueOrThrowArgs>(args: SelectSubset<T, CounterFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Counter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindFirstArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CounterFindFirstArgs>(args?: SelectSubset<T, CounterFindFirstArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Counter that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindFirstOrThrowArgs} args - Arguments to find a Counter
     * @example
     * // Get one Counter
     * const counter = await prisma.counter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CounterFindFirstOrThrowArgs>(args?: SelectSubset<T, CounterFindFirstOrThrowArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Counters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Counters
     * const counters = await prisma.counter.findMany()
     * 
     * // Get first 10 Counters
     * const counters = await prisma.counter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const counterWithIdOnly = await prisma.counter.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CounterFindManyArgs>(args?: SelectSubset<T, CounterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Counter.
     * @param {CounterCreateArgs} args - Arguments to create a Counter.
     * @example
     * // Create one Counter
     * const Counter = await prisma.counter.create({
     *   data: {
     *     // ... data to create a Counter
     *   }
     * })
     * 
     */
    create<T extends CounterCreateArgs>(args: SelectSubset<T, CounterCreateArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Counters.
     * @param {CounterCreateManyArgs} args - Arguments to create many Counters.
     * @example
     * // Create many Counters
     * const counter = await prisma.counter.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CounterCreateManyArgs>(args?: SelectSubset<T, CounterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Counters and returns the data saved in the database.
     * @param {CounterCreateManyAndReturnArgs} args - Arguments to create many Counters.
     * @example
     * // Create many Counters
     * const counter = await prisma.counter.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Counters and only return the `id`
     * const counterWithIdOnly = await prisma.counter.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CounterCreateManyAndReturnArgs>(args?: SelectSubset<T, CounterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Counter.
     * @param {CounterDeleteArgs} args - Arguments to delete one Counter.
     * @example
     * // Delete one Counter
     * const Counter = await prisma.counter.delete({
     *   where: {
     *     // ... filter to delete one Counter
     *   }
     * })
     * 
     */
    delete<T extends CounterDeleteArgs>(args: SelectSubset<T, CounterDeleteArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Counter.
     * @param {CounterUpdateArgs} args - Arguments to update one Counter.
     * @example
     * // Update one Counter
     * const counter = await prisma.counter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CounterUpdateArgs>(args: SelectSubset<T, CounterUpdateArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Counters.
     * @param {CounterDeleteManyArgs} args - Arguments to filter Counters to delete.
     * @example
     * // Delete a few Counters
     * const { count } = await prisma.counter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CounterDeleteManyArgs>(args?: SelectSubset<T, CounterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Counters
     * const counter = await prisma.counter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CounterUpdateManyArgs>(args: SelectSubset<T, CounterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counters and returns the data updated in the database.
     * @param {CounterUpdateManyAndReturnArgs} args - Arguments to update many Counters.
     * @example
     * // Update many Counters
     * const counter = await prisma.counter.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Counters and only return the `id`
     * const counterWithIdOnly = await prisma.counter.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CounterUpdateManyAndReturnArgs>(args: SelectSubset<T, CounterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Counter.
     * @param {CounterUpsertArgs} args - Arguments to update or create a Counter.
     * @example
     * // Update or create a Counter
     * const counter = await prisma.counter.upsert({
     *   create: {
     *     // ... data to create a Counter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Counter we want to update
     *   }
     * })
     */
    upsert<T extends CounterUpsertArgs>(args: SelectSubset<T, CounterUpsertArgs<ExtArgs>>): Prisma__CounterClient<$Result.GetResult<Prisma.$CounterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Counters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterCountArgs} args - Arguments to filter Counters to count.
     * @example
     * // Count the number of Counters
     * const count = await prisma.counter.count({
     *   where: {
     *     // ... the filter for the Counters we want to count
     *   }
     * })
    **/
    count<T extends CounterCountArgs>(
      args?: Subset<T, CounterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CounterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Counter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CounterAggregateArgs>(args: Subset<T, CounterAggregateArgs>): Prisma.PrismaPromise<GetCounterAggregateType<T>>

    /**
     * Group by Counter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CounterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CounterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CounterGroupByArgs['orderBy'] }
        : { orderBy?: CounterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CounterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCounterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Counter model
   */
  readonly fields: CounterFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Counter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CounterClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Counter model
   */
  interface CounterFieldRefs {
    readonly id: FieldRef<"Counter", 'String'>
    readonly name: FieldRef<"Counter", 'String'>
    readonly value: FieldRef<"Counter", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Counter findUnique
   */
  export type CounterFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter findUniqueOrThrow
   */
  export type CounterFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter findFirst
   */
  export type CounterFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counters.
     */
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter findFirstOrThrow
   */
  export type CounterFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter, which Counter to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counters.
     */
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter findMany
   */
  export type CounterFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter, which Counters to fetch.
     */
    where?: CounterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counters to fetch.
     */
    orderBy?: CounterOrderByWithRelationInput | CounterOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Counters.
     */
    cursor?: CounterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counters.
     */
    skip?: number
    distinct?: CounterScalarFieldEnum | CounterScalarFieldEnum[]
  }

  /**
   * Counter create
   */
  export type CounterCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data needed to create a Counter.
     */
    data: XOR<CounterCreateInput, CounterUncheckedCreateInput>
  }

  /**
   * Counter createMany
   */
  export type CounterCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Counters.
     */
    data: CounterCreateManyInput | CounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Counter createManyAndReturn
   */
  export type CounterCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data used to create many Counters.
     */
    data: CounterCreateManyInput | CounterCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Counter update
   */
  export type CounterUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data needed to update a Counter.
     */
    data: XOR<CounterUpdateInput, CounterUncheckedUpdateInput>
    /**
     * Choose, which Counter to update.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter updateMany
   */
  export type CounterUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Counters.
     */
    data: XOR<CounterUpdateManyMutationInput, CounterUncheckedUpdateManyInput>
    /**
     * Filter which Counters to update
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to update.
     */
    limit?: number
  }

  /**
   * Counter updateManyAndReturn
   */
  export type CounterUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The data used to update Counters.
     */
    data: XOR<CounterUpdateManyMutationInput, CounterUncheckedUpdateManyInput>
    /**
     * Filter which Counters to update
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to update.
     */
    limit?: number
  }

  /**
   * Counter upsert
   */
  export type CounterUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * The filter to search for the Counter to update in case it exists.
     */
    where: CounterWhereUniqueInput
    /**
     * In case the Counter found by the `where` argument doesn't exist, create a new Counter with this data.
     */
    create: XOR<CounterCreateInput, CounterUncheckedCreateInput>
    /**
     * In case the Counter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CounterUpdateInput, CounterUncheckedUpdateInput>
  }

  /**
   * Counter delete
   */
  export type CounterDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
    /**
     * Filter which Counter to delete.
     */
    where: CounterWhereUniqueInput
  }

  /**
   * Counter deleteMany
   */
  export type CounterDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Counters to delete
     */
    where?: CounterWhereInput
    /**
     * Limit how many Counters to delete.
     */
    limit?: number
  }

  /**
   * Counter without action
   */
  export type CounterDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Counter
     */
    select?: CounterSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Counter
     */
    omit?: CounterOmit<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    id: number | null
    highScore: number | null
  }

  export type PlayerSumAggregateOutputType = {
    id: number | null
    highScore: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: number | null
    highScore: number | null
    createdAt: Date | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: number | null
    highScore: number | null
    createdAt: Date | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    highScore: number
    createdAt: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    id?: true
    highScore?: true
  }

  export type PlayerSumAggregateInputType = {
    id?: true
    highScore?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    highScore?: true
    createdAt?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    highScore?: true
    createdAt?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    highScore?: true
    createdAt?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: number
    highScore: number
    createdAt: Date
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    highScore?: boolean
    createdAt?: boolean
    scores?: boolean | Player$scoresArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    highScore?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    highScore?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    highScore?: boolean
    createdAt?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "highScore" | "createdAt", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    scores?: boolean | Player$scoresArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      scores: Prisma.$DailyScorePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      highScore: number
      createdAt: Date
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    scores<T extends Player$scoresArgs<ExtArgs> = {}>(args?: Subset<T, Player$scoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'Int'>
    readonly highScore: FieldRef<"Player", 'Int'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.scores
   */
  export type Player$scoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    where?: DailyScoreWhereInput
    orderBy?: DailyScoreOrderByWithRelationInput | DailyScoreOrderByWithRelationInput[]
    cursor?: DailyScoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DailyScoreScalarFieldEnum | DailyScoreScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model DailyScore
   */

  export type AggregateDailyScore = {
    _count: DailyScoreCountAggregateOutputType | null
    _avg: DailyScoreAvgAggregateOutputType | null
    _sum: DailyScoreSumAggregateOutputType | null
    _min: DailyScoreMinAggregateOutputType | null
    _max: DailyScoreMaxAggregateOutputType | null
  }

  export type DailyScoreAvgAggregateOutputType = {
    score: number | null
    timeTaken: number | null
    playerId: number | null
  }

  export type DailyScoreSumAggregateOutputType = {
    score: number | null
    timeTaken: number | null
    playerId: number | null
  }

  export type DailyScoreMinAggregateOutputType = {
    id: string | null
    date: string | null
    score: number | null
    timeTaken: number | null
    createdAt: Date | null
    playerId: number | null
  }

  export type DailyScoreMaxAggregateOutputType = {
    id: string | null
    date: string | null
    score: number | null
    timeTaken: number | null
    createdAt: Date | null
    playerId: number | null
  }

  export type DailyScoreCountAggregateOutputType = {
    id: number
    date: number
    score: number
    timeTaken: number
    createdAt: number
    playerId: number
    _all: number
  }


  export type DailyScoreAvgAggregateInputType = {
    score?: true
    timeTaken?: true
    playerId?: true
  }

  export type DailyScoreSumAggregateInputType = {
    score?: true
    timeTaken?: true
    playerId?: true
  }

  export type DailyScoreMinAggregateInputType = {
    id?: true
    date?: true
    score?: true
    timeTaken?: true
    createdAt?: true
    playerId?: true
  }

  export type DailyScoreMaxAggregateInputType = {
    id?: true
    date?: true
    score?: true
    timeTaken?: true
    createdAt?: true
    playerId?: true
  }

  export type DailyScoreCountAggregateInputType = {
    id?: true
    date?: true
    score?: true
    timeTaken?: true
    createdAt?: true
    playerId?: true
    _all?: true
  }

  export type DailyScoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyScore to aggregate.
     */
    where?: DailyScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyScores to fetch.
     */
    orderBy?: DailyScoreOrderByWithRelationInput | DailyScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyScores
    **/
    _count?: true | DailyScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DailyScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DailyScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyScoreMaxAggregateInputType
  }

  export type GetDailyScoreAggregateType<T extends DailyScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyScore[P]>
      : GetScalarType<T[P], AggregateDailyScore[P]>
  }




  export type DailyScoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyScoreWhereInput
    orderBy?: DailyScoreOrderByWithAggregationInput | DailyScoreOrderByWithAggregationInput[]
    by: DailyScoreScalarFieldEnum[] | DailyScoreScalarFieldEnum
    having?: DailyScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyScoreCountAggregateInputType | true
    _avg?: DailyScoreAvgAggregateInputType
    _sum?: DailyScoreSumAggregateInputType
    _min?: DailyScoreMinAggregateInputType
    _max?: DailyScoreMaxAggregateInputType
  }

  export type DailyScoreGroupByOutputType = {
    id: string
    date: string
    score: number
    timeTaken: number
    createdAt: Date
    playerId: number
    _count: DailyScoreCountAggregateOutputType | null
    _avg: DailyScoreAvgAggregateOutputType | null
    _sum: DailyScoreSumAggregateOutputType | null
    _min: DailyScoreMinAggregateOutputType | null
    _max: DailyScoreMaxAggregateOutputType | null
  }

  type GetDailyScoreGroupByPayload<T extends DailyScoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyScoreGroupByOutputType[P]>
            : GetScalarType<T[P], DailyScoreGroupByOutputType[P]>
        }
      >
    >


  export type DailyScoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    score?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyScore"]>

  export type DailyScoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    score?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyScore"]>

  export type DailyScoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    score?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    playerId?: boolean
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dailyScore"]>

  export type DailyScoreSelectScalar = {
    id?: boolean
    date?: boolean
    score?: boolean
    timeTaken?: boolean
    createdAt?: boolean
    playerId?: boolean
  }

  export type DailyScoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "score" | "timeTaken" | "createdAt" | "playerId", ExtArgs["result"]["dailyScore"]>
  export type DailyScoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type DailyScoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type DailyScoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    player?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $DailyScorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyScore"
    objects: {
      player: Prisma.$PlayerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: string
      score: number
      timeTaken: number
      createdAt: Date
      playerId: number
    }, ExtArgs["result"]["dailyScore"]>
    composites: {}
  }

  type DailyScoreGetPayload<S extends boolean | null | undefined | DailyScoreDefaultArgs> = $Result.GetResult<Prisma.$DailyScorePayload, S>

  type DailyScoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyScoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyScoreCountAggregateInputType | true
    }

  export interface DailyScoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyScore'], meta: { name: 'DailyScore' } }
    /**
     * Find zero or one DailyScore that matches the filter.
     * @param {DailyScoreFindUniqueArgs} args - Arguments to find a DailyScore
     * @example
     * // Get one DailyScore
     * const dailyScore = await prisma.dailyScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyScoreFindUniqueArgs>(args: SelectSubset<T, DailyScoreFindUniqueArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyScore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyScoreFindUniqueOrThrowArgs} args - Arguments to find a DailyScore
     * @example
     * // Get one DailyScore
     * const dailyScore = await prisma.dailyScore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyScoreFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyScoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreFindFirstArgs} args - Arguments to find a DailyScore
     * @example
     * // Get one DailyScore
     * const dailyScore = await prisma.dailyScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyScoreFindFirstArgs>(args?: SelectSubset<T, DailyScoreFindFirstArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyScore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreFindFirstOrThrowArgs} args - Arguments to find a DailyScore
     * @example
     * // Get one DailyScore
     * const dailyScore = await prisma.dailyScore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyScoreFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyScoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyScores
     * const dailyScores = await prisma.dailyScore.findMany()
     * 
     * // Get first 10 DailyScores
     * const dailyScores = await prisma.dailyScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyScoreWithIdOnly = await prisma.dailyScore.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyScoreFindManyArgs>(args?: SelectSubset<T, DailyScoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyScore.
     * @param {DailyScoreCreateArgs} args - Arguments to create a DailyScore.
     * @example
     * // Create one DailyScore
     * const DailyScore = await prisma.dailyScore.create({
     *   data: {
     *     // ... data to create a DailyScore
     *   }
     * })
     * 
     */
    create<T extends DailyScoreCreateArgs>(args: SelectSubset<T, DailyScoreCreateArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyScores.
     * @param {DailyScoreCreateManyArgs} args - Arguments to create many DailyScores.
     * @example
     * // Create many DailyScores
     * const dailyScore = await prisma.dailyScore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyScoreCreateManyArgs>(args?: SelectSubset<T, DailyScoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyScores and returns the data saved in the database.
     * @param {DailyScoreCreateManyAndReturnArgs} args - Arguments to create many DailyScores.
     * @example
     * // Create many DailyScores
     * const dailyScore = await prisma.dailyScore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyScores and only return the `id`
     * const dailyScoreWithIdOnly = await prisma.dailyScore.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyScoreCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyScoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyScore.
     * @param {DailyScoreDeleteArgs} args - Arguments to delete one DailyScore.
     * @example
     * // Delete one DailyScore
     * const DailyScore = await prisma.dailyScore.delete({
     *   where: {
     *     // ... filter to delete one DailyScore
     *   }
     * })
     * 
     */
    delete<T extends DailyScoreDeleteArgs>(args: SelectSubset<T, DailyScoreDeleteArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyScore.
     * @param {DailyScoreUpdateArgs} args - Arguments to update one DailyScore.
     * @example
     * // Update one DailyScore
     * const dailyScore = await prisma.dailyScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyScoreUpdateArgs>(args: SelectSubset<T, DailyScoreUpdateArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyScores.
     * @param {DailyScoreDeleteManyArgs} args - Arguments to filter DailyScores to delete.
     * @example
     * // Delete a few DailyScores
     * const { count } = await prisma.dailyScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyScoreDeleteManyArgs>(args?: SelectSubset<T, DailyScoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyScores
     * const dailyScore = await prisma.dailyScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyScoreUpdateManyArgs>(args: SelectSubset<T, DailyScoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyScores and returns the data updated in the database.
     * @param {DailyScoreUpdateManyAndReturnArgs} args - Arguments to update many DailyScores.
     * @example
     * // Update many DailyScores
     * const dailyScore = await prisma.dailyScore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyScores and only return the `id`
     * const dailyScoreWithIdOnly = await prisma.dailyScore.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DailyScoreUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyScoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyScore.
     * @param {DailyScoreUpsertArgs} args - Arguments to update or create a DailyScore.
     * @example
     * // Update or create a DailyScore
     * const dailyScore = await prisma.dailyScore.upsert({
     *   create: {
     *     // ... data to create a DailyScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyScore we want to update
     *   }
     * })
     */
    upsert<T extends DailyScoreUpsertArgs>(args: SelectSubset<T, DailyScoreUpsertArgs<ExtArgs>>): Prisma__DailyScoreClient<$Result.GetResult<Prisma.$DailyScorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreCountArgs} args - Arguments to filter DailyScores to count.
     * @example
     * // Count the number of DailyScores
     * const count = await prisma.dailyScore.count({
     *   where: {
     *     // ... the filter for the DailyScores we want to count
     *   }
     * })
    **/
    count<T extends DailyScoreCountArgs>(
      args?: Subset<T, DailyScoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DailyScoreAggregateArgs>(args: Subset<T, DailyScoreAggregateArgs>): Prisma.PrismaPromise<GetDailyScoreAggregateType<T>>

    /**
     * Group by DailyScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DailyScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyScoreGroupByArgs['orderBy'] }
        : { orderBy?: DailyScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyScoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyScore model
   */
  readonly fields: DailyScoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyScoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    player<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyScore model
   */
  interface DailyScoreFieldRefs {
    readonly id: FieldRef<"DailyScore", 'String'>
    readonly date: FieldRef<"DailyScore", 'String'>
    readonly score: FieldRef<"DailyScore", 'Int'>
    readonly timeTaken: FieldRef<"DailyScore", 'Int'>
    readonly createdAt: FieldRef<"DailyScore", 'DateTime'>
    readonly playerId: FieldRef<"DailyScore", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DailyScore findUnique
   */
  export type DailyScoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter, which DailyScore to fetch.
     */
    where: DailyScoreWhereUniqueInput
  }

  /**
   * DailyScore findUniqueOrThrow
   */
  export type DailyScoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter, which DailyScore to fetch.
     */
    where: DailyScoreWhereUniqueInput
  }

  /**
   * DailyScore findFirst
   */
  export type DailyScoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter, which DailyScore to fetch.
     */
    where?: DailyScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyScores to fetch.
     */
    orderBy?: DailyScoreOrderByWithRelationInput | DailyScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyScores.
     */
    cursor?: DailyScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyScores.
     */
    distinct?: DailyScoreScalarFieldEnum | DailyScoreScalarFieldEnum[]
  }

  /**
   * DailyScore findFirstOrThrow
   */
  export type DailyScoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter, which DailyScore to fetch.
     */
    where?: DailyScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyScores to fetch.
     */
    orderBy?: DailyScoreOrderByWithRelationInput | DailyScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyScores.
     */
    cursor?: DailyScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyScores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyScores.
     */
    distinct?: DailyScoreScalarFieldEnum | DailyScoreScalarFieldEnum[]
  }

  /**
   * DailyScore findMany
   */
  export type DailyScoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter, which DailyScores to fetch.
     */
    where?: DailyScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyScores to fetch.
     */
    orderBy?: DailyScoreOrderByWithRelationInput | DailyScoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyScores.
     */
    cursor?: DailyScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyScores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyScores.
     */
    skip?: number
    distinct?: DailyScoreScalarFieldEnum | DailyScoreScalarFieldEnum[]
  }

  /**
   * DailyScore create
   */
  export type DailyScoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * The data needed to create a DailyScore.
     */
    data: XOR<DailyScoreCreateInput, DailyScoreUncheckedCreateInput>
  }

  /**
   * DailyScore createMany
   */
  export type DailyScoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyScores.
     */
    data: DailyScoreCreateManyInput | DailyScoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyScore createManyAndReturn
   */
  export type DailyScoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * The data used to create many DailyScores.
     */
    data: DailyScoreCreateManyInput | DailyScoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyScore update
   */
  export type DailyScoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * The data needed to update a DailyScore.
     */
    data: XOR<DailyScoreUpdateInput, DailyScoreUncheckedUpdateInput>
    /**
     * Choose, which DailyScore to update.
     */
    where: DailyScoreWhereUniqueInput
  }

  /**
   * DailyScore updateMany
   */
  export type DailyScoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyScores.
     */
    data: XOR<DailyScoreUpdateManyMutationInput, DailyScoreUncheckedUpdateManyInput>
    /**
     * Filter which DailyScores to update
     */
    where?: DailyScoreWhereInput
    /**
     * Limit how many DailyScores to update.
     */
    limit?: number
  }

  /**
   * DailyScore updateManyAndReturn
   */
  export type DailyScoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * The data used to update DailyScores.
     */
    data: XOR<DailyScoreUpdateManyMutationInput, DailyScoreUncheckedUpdateManyInput>
    /**
     * Filter which DailyScores to update
     */
    where?: DailyScoreWhereInput
    /**
     * Limit how many DailyScores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DailyScore upsert
   */
  export type DailyScoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * The filter to search for the DailyScore to update in case it exists.
     */
    where: DailyScoreWhereUniqueInput
    /**
     * In case the DailyScore found by the `where` argument doesn't exist, create a new DailyScore with this data.
     */
    create: XOR<DailyScoreCreateInput, DailyScoreUncheckedCreateInput>
    /**
     * In case the DailyScore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyScoreUpdateInput, DailyScoreUncheckedUpdateInput>
  }

  /**
   * DailyScore delete
   */
  export type DailyScoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
    /**
     * Filter which DailyScore to delete.
     */
    where: DailyScoreWhereUniqueInput
  }

  /**
   * DailyScore deleteMany
   */
  export type DailyScoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyScores to delete
     */
    where?: DailyScoreWhereInput
    /**
     * Limit how many DailyScores to delete.
     */
    limit?: number
  }

  /**
   * DailyScore without action
   */
  export type DailyScoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyScore
     */
    select?: DailyScoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyScore
     */
    omit?: DailyScoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DailyScoreInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CounterScalarFieldEnum: {
    id: 'id',
    name: 'name',
    value: 'value'
  };

  export type CounterScalarFieldEnum = (typeof CounterScalarFieldEnum)[keyof typeof CounterScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    highScore: 'highScore',
    createdAt: 'createdAt'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const DailyScoreScalarFieldEnum: {
    id: 'id',
    date: 'date',
    score: 'score',
    timeTaken: 'timeTaken',
    createdAt: 'createdAt',
    playerId: 'playerId'
  };

  export type DailyScoreScalarFieldEnum = (typeof DailyScoreScalarFieldEnum)[keyof typeof DailyScoreScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CounterWhereInput = {
    AND?: CounterWhereInput | CounterWhereInput[]
    OR?: CounterWhereInput[]
    NOT?: CounterWhereInput | CounterWhereInput[]
    id?: StringFilter<"Counter"> | string
    name?: StringFilter<"Counter"> | string
    value?: IntFilter<"Counter"> | number
  }

  export type CounterOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type CounterWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: CounterWhereInput | CounterWhereInput[]
    OR?: CounterWhereInput[]
    NOT?: CounterWhereInput | CounterWhereInput[]
    value?: IntFilter<"Counter"> | number
  }, "id" | "name">

  export type CounterOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
    _count?: CounterCountOrderByAggregateInput
    _avg?: CounterAvgOrderByAggregateInput
    _max?: CounterMaxOrderByAggregateInput
    _min?: CounterMinOrderByAggregateInput
    _sum?: CounterSumOrderByAggregateInput
  }

  export type CounterScalarWhereWithAggregatesInput = {
    AND?: CounterScalarWhereWithAggregatesInput | CounterScalarWhereWithAggregatesInput[]
    OR?: CounterScalarWhereWithAggregatesInput[]
    NOT?: CounterScalarWhereWithAggregatesInput | CounterScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Counter"> | string
    name?: StringWithAggregatesFilter<"Counter"> | string
    value?: IntWithAggregatesFilter<"Counter"> | number
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: IntFilter<"Player"> | number
    highScore?: IntFilter<"Player"> | number
    createdAt?: DateTimeFilter<"Player"> | Date | string
    scores?: DailyScoreListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    highScore?: SortOrder
    createdAt?: SortOrder
    scores?: DailyScoreOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    highScore?: IntFilter<"Player"> | number
    createdAt?: DateTimeFilter<"Player"> | Date | string
    scores?: DailyScoreListRelationFilter
  }, "id">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    highScore?: SortOrder
    createdAt?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Player"> | number
    highScore?: IntWithAggregatesFilter<"Player"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
  }

  export type DailyScoreWhereInput = {
    AND?: DailyScoreWhereInput | DailyScoreWhereInput[]
    OR?: DailyScoreWhereInput[]
    NOT?: DailyScoreWhereInput | DailyScoreWhereInput[]
    id?: StringFilter<"DailyScore"> | string
    date?: StringFilter<"DailyScore"> | string
    score?: IntFilter<"DailyScore"> | number
    timeTaken?: IntFilter<"DailyScore"> | number
    createdAt?: DateTimeFilter<"DailyScore"> | Date | string
    playerId?: IntFilter<"DailyScore"> | number
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }

  export type DailyScoreOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    score?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
    playerId?: SortOrder
    player?: PlayerOrderByWithRelationInput
  }

  export type DailyScoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DailyScoreWhereInput | DailyScoreWhereInput[]
    OR?: DailyScoreWhereInput[]
    NOT?: DailyScoreWhereInput | DailyScoreWhereInput[]
    date?: StringFilter<"DailyScore"> | string
    score?: IntFilter<"DailyScore"> | number
    timeTaken?: IntFilter<"DailyScore"> | number
    createdAt?: DateTimeFilter<"DailyScore"> | Date | string
    playerId?: IntFilter<"DailyScore"> | number
    player?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
  }, "id">

  export type DailyScoreOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    score?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
    playerId?: SortOrder
    _count?: DailyScoreCountOrderByAggregateInput
    _avg?: DailyScoreAvgOrderByAggregateInput
    _max?: DailyScoreMaxOrderByAggregateInput
    _min?: DailyScoreMinOrderByAggregateInput
    _sum?: DailyScoreSumOrderByAggregateInput
  }

  export type DailyScoreScalarWhereWithAggregatesInput = {
    AND?: DailyScoreScalarWhereWithAggregatesInput | DailyScoreScalarWhereWithAggregatesInput[]
    OR?: DailyScoreScalarWhereWithAggregatesInput[]
    NOT?: DailyScoreScalarWhereWithAggregatesInput | DailyScoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyScore"> | string
    date?: StringWithAggregatesFilter<"DailyScore"> | string
    score?: IntWithAggregatesFilter<"DailyScore"> | number
    timeTaken?: IntWithAggregatesFilter<"DailyScore"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DailyScore"> | Date | string
    playerId?: IntWithAggregatesFilter<"DailyScore"> | number
  }

  export type CounterCreateInput = {
    id?: string
    name: string
    value?: number
  }

  export type CounterUncheckedCreateInput = {
    id?: string
    name: string
    value?: number
  }

  export type CounterUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type CounterUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type CounterCreateManyInput = {
    id?: string
    name: string
    value?: number
  }

  export type CounterUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type CounterUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
  }

  export type PlayerCreateInput = {
    id: number
    highScore?: number
    createdAt?: Date | string
    scores?: DailyScoreCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUncheckedCreateInput = {
    id: number
    highScore?: number
    createdAt?: Date | string
    scores?: DailyScoreUncheckedCreateNestedManyWithoutPlayerInput
  }

  export type PlayerUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: DailyScoreUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    scores?: DailyScoreUncheckedUpdateManyWithoutPlayerNestedInput
  }

  export type PlayerCreateManyInput = {
    id: number
    highScore?: number
    createdAt?: Date | string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyScoreCreateInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
    player: PlayerCreateNestedOneWithoutScoresInput
  }

  export type DailyScoreUncheckedCreateInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
    playerId: number
  }

  export type DailyScoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    player?: PlayerUpdateOneRequiredWithoutScoresNestedInput
  }

  export type DailyScoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: IntFieldUpdateOperationsInput | number
  }

  export type DailyScoreCreateManyInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
    playerId: number
  }

  export type DailyScoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyScoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playerId?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CounterCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type CounterAvgOrderByAggregateInput = {
    value?: SortOrder
  }

  export type CounterMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type CounterMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    value?: SortOrder
  }

  export type CounterSumOrderByAggregateInput = {
    value?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DailyScoreListRelationFilter = {
    every?: DailyScoreWhereInput
    some?: DailyScoreWhereInput
    none?: DailyScoreWhereInput
  }

  export type DailyScoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    highScore?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    highScore?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    highScore?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    highScore?: SortOrder
    createdAt?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    id?: SortOrder
    highScore?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type DailyScoreCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    score?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
    playerId?: SortOrder
  }

  export type DailyScoreAvgOrderByAggregateInput = {
    score?: SortOrder
    timeTaken?: SortOrder
    playerId?: SortOrder
  }

  export type DailyScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    score?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
    playerId?: SortOrder
  }

  export type DailyScoreMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    score?: SortOrder
    timeTaken?: SortOrder
    createdAt?: SortOrder
    playerId?: SortOrder
  }

  export type DailyScoreSumOrderByAggregateInput = {
    score?: SortOrder
    timeTaken?: SortOrder
    playerId?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DailyScoreCreateNestedManyWithoutPlayerInput = {
    create?: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput> | DailyScoreCreateWithoutPlayerInput[] | DailyScoreUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: DailyScoreCreateOrConnectWithoutPlayerInput | DailyScoreCreateOrConnectWithoutPlayerInput[]
    createMany?: DailyScoreCreateManyPlayerInputEnvelope
    connect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
  }

  export type DailyScoreUncheckedCreateNestedManyWithoutPlayerInput = {
    create?: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput> | DailyScoreCreateWithoutPlayerInput[] | DailyScoreUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: DailyScoreCreateOrConnectWithoutPlayerInput | DailyScoreCreateOrConnectWithoutPlayerInput[]
    createMany?: DailyScoreCreateManyPlayerInputEnvelope
    connect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DailyScoreUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput> | DailyScoreCreateWithoutPlayerInput[] | DailyScoreUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: DailyScoreCreateOrConnectWithoutPlayerInput | DailyScoreCreateOrConnectWithoutPlayerInput[]
    upsert?: DailyScoreUpsertWithWhereUniqueWithoutPlayerInput | DailyScoreUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: DailyScoreCreateManyPlayerInputEnvelope
    set?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    disconnect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    delete?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    connect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    update?: DailyScoreUpdateWithWhereUniqueWithoutPlayerInput | DailyScoreUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: DailyScoreUpdateManyWithWhereWithoutPlayerInput | DailyScoreUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: DailyScoreScalarWhereInput | DailyScoreScalarWhereInput[]
  }

  export type DailyScoreUncheckedUpdateManyWithoutPlayerNestedInput = {
    create?: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput> | DailyScoreCreateWithoutPlayerInput[] | DailyScoreUncheckedCreateWithoutPlayerInput[]
    connectOrCreate?: DailyScoreCreateOrConnectWithoutPlayerInput | DailyScoreCreateOrConnectWithoutPlayerInput[]
    upsert?: DailyScoreUpsertWithWhereUniqueWithoutPlayerInput | DailyScoreUpsertWithWhereUniqueWithoutPlayerInput[]
    createMany?: DailyScoreCreateManyPlayerInputEnvelope
    set?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    disconnect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    delete?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    connect?: DailyScoreWhereUniqueInput | DailyScoreWhereUniqueInput[]
    update?: DailyScoreUpdateWithWhereUniqueWithoutPlayerInput | DailyScoreUpdateWithWhereUniqueWithoutPlayerInput[]
    updateMany?: DailyScoreUpdateManyWithWhereWithoutPlayerInput | DailyScoreUpdateManyWithWhereWithoutPlayerInput[]
    deleteMany?: DailyScoreScalarWhereInput | DailyScoreScalarWhereInput[]
  }

  export type PlayerCreateNestedOneWithoutScoresInput = {
    create?: XOR<PlayerCreateWithoutScoresInput, PlayerUncheckedCreateWithoutScoresInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutScoresInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerUpdateOneRequiredWithoutScoresNestedInput = {
    create?: XOR<PlayerCreateWithoutScoresInput, PlayerUncheckedCreateWithoutScoresInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutScoresInput
    upsert?: PlayerUpsertWithoutScoresInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutScoresInput, PlayerUpdateWithoutScoresInput>, PlayerUncheckedUpdateWithoutScoresInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DailyScoreCreateWithoutPlayerInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
  }

  export type DailyScoreUncheckedCreateWithoutPlayerInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
  }

  export type DailyScoreCreateOrConnectWithoutPlayerInput = {
    where: DailyScoreWhereUniqueInput
    create: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput>
  }

  export type DailyScoreCreateManyPlayerInputEnvelope = {
    data: DailyScoreCreateManyPlayerInput | DailyScoreCreateManyPlayerInput[]
    skipDuplicates?: boolean
  }

  export type DailyScoreUpsertWithWhereUniqueWithoutPlayerInput = {
    where: DailyScoreWhereUniqueInput
    update: XOR<DailyScoreUpdateWithoutPlayerInput, DailyScoreUncheckedUpdateWithoutPlayerInput>
    create: XOR<DailyScoreCreateWithoutPlayerInput, DailyScoreUncheckedCreateWithoutPlayerInput>
  }

  export type DailyScoreUpdateWithWhereUniqueWithoutPlayerInput = {
    where: DailyScoreWhereUniqueInput
    data: XOR<DailyScoreUpdateWithoutPlayerInput, DailyScoreUncheckedUpdateWithoutPlayerInput>
  }

  export type DailyScoreUpdateManyWithWhereWithoutPlayerInput = {
    where: DailyScoreScalarWhereInput
    data: XOR<DailyScoreUpdateManyMutationInput, DailyScoreUncheckedUpdateManyWithoutPlayerInput>
  }

  export type DailyScoreScalarWhereInput = {
    AND?: DailyScoreScalarWhereInput | DailyScoreScalarWhereInput[]
    OR?: DailyScoreScalarWhereInput[]
    NOT?: DailyScoreScalarWhereInput | DailyScoreScalarWhereInput[]
    id?: StringFilter<"DailyScore"> | string
    date?: StringFilter<"DailyScore"> | string
    score?: IntFilter<"DailyScore"> | number
    timeTaken?: IntFilter<"DailyScore"> | number
    createdAt?: DateTimeFilter<"DailyScore"> | Date | string
    playerId?: IntFilter<"DailyScore"> | number
  }

  export type PlayerCreateWithoutScoresInput = {
    id: number
    highScore?: number
    createdAt?: Date | string
  }

  export type PlayerUncheckedCreateWithoutScoresInput = {
    id: number
    highScore?: number
    createdAt?: Date | string
  }

  export type PlayerCreateOrConnectWithoutScoresInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutScoresInput, PlayerUncheckedCreateWithoutScoresInput>
  }

  export type PlayerUpsertWithoutScoresInput = {
    update: XOR<PlayerUpdateWithoutScoresInput, PlayerUncheckedUpdateWithoutScoresInput>
    create: XOR<PlayerCreateWithoutScoresInput, PlayerUncheckedCreateWithoutScoresInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutScoresInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutScoresInput, PlayerUncheckedUpdateWithoutScoresInput>
  }

  export type PlayerUpdateWithoutScoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateWithoutScoresInput = {
    id?: IntFieldUpdateOperationsInput | number
    highScore?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyScoreCreateManyPlayerInput = {
    id?: string
    date: string
    score: number
    timeTaken: number
    createdAt?: Date | string
  }

  export type DailyScoreUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyScoreUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyScoreUncheckedUpdateManyWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    timeTaken?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}