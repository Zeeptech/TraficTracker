declare module "hono" {
  interface ContextVariableMap {
    userId: number;
    token: string;
  }
}
