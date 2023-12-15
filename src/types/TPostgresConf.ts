/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

export type TPostgresConf = {
  host: string;
  port: number;
  user: string;
  pass: string;
  ssl: boolean;
};
