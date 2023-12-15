/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { ConnectorTypeEnum } from "../enums";
import { TBigqueryConf } from "./TBigqueryConf";
import { TClickhouseConf } from "./TClickhouseConf";
import { TDruidConf } from "./TDruidConf";
import { TElasticsearchConf } from "./TElasticsearchConf";
import { TGsheetsConf } from "./TGsheetsConf";
import { TIgniteConf } from "./TIgniteConf";
import { TMariadbConf } from "./TMariadbConf";
import { TMongoConf } from "./TMongoConf";
import { TMssqlConf } from "./TMssqlConf";
import { TMysqlConf } from "./TMysqlConf";
import { TOracleConf } from "./TOracleConf";
import { TPostgresConf } from "./TPostgresConf";
import { TRedshiftConf } from "./TRedshiftConf";

/**
 * An object to define connector configuration parameters.
 */
export type TConnector =
  | {
      name: string;
      type: ConnectorTypeEnum.bigquery;
      conf: TBigqueryConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.clickhouse;
      conf: TClickhouseConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.druid;
      conf: TDruidConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.elasticsearch;
      conf: TElasticsearchConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.gsheets;
      conf: TGsheetsConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.ignite;
      conf: TIgniteConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.mariadb;
      conf: TMariadbConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.mongodb;
      conf: TMongoConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.mysql;
      conf: TMysqlConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.sqlserver;
      conf: TMssqlConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.oracle;
      conf: TOracleConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.postgresql;
      conf: TPostgresConf;
    }
  | {
      name: string;
      type: ConnectorTypeEnum.redshift;
      conf: TRedshiftConf;
    };
