declare module "config" {
  interface IConfig {
    port: number;
    baseRoute: string;
    db: {
      url: string;
    };
  }

  const config: IConfig;
  export = config;
}
