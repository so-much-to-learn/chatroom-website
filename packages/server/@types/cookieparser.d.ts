declare module 'cookieparser' {
  export const parse: (cookie: string) => Record<string, any>
}