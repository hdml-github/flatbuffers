/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

export type TMongoConf = {
  host: string;
  port: number;
  user: string;
  pass: string;
  ssl: boolean;
  schema: string;
};
