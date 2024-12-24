declare global {
  interface Window {
    ym: {
      (id: string, action: 'hit', url: string, options?: SubParams): void;
      (id: string, action: 'reachGoal', target: string, params?: ActionParams, callback?: ()=> void, ctx?: unknown): void;
      (id: string, action: "userParams", params: VisitorParams): void;
    }
  }
}

export type VisitorParams = {
  [key: string]: unknown;
}

interface Metrika {
  hit: (url: string, options?: SubParams) => void
  reachGoal: (target: string, params?: ActionParams, callback?: () => void, ctx?: unknown) => void
  userParams: (params: VisitorParams) => void
}

export declare interface ActionParams {
  order_price?:number,
  currency?: string
}

export declare interface SubParams {
  callback?: ()=>void,
  ctx?: unknown,
  params?: ActionParams,
  referer?: string,
  title?: string
}

declare module '#app' {
  interface NuxtApp {
    $metrika: Metrika
  }
}

export { }
