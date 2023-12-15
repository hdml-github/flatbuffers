/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

/* eslint-disable no-case-declarations */

import { Builder } from "flatbuffers";
import {
  Connector,
  DatasourceConf,
  PostgresConf,
  MysqlConf,
  MssqlConf,
  MariadbConf,
  OracleConf,
  RedshiftConf,
  ClickhouseConf,
  DruidConf,
  IgniteConf,
  BigqueryConf,
  GsheetsConf,
  ElasticsearchConf,
  MongoConf,
} from "../.fbs/hdml.Connector_generated";
import {
  TBigqueryConf,
  TClickhouseConf,
  TDruidConf,
  TElasticsearchConf,
  TGsheetsConf,
  TIgniteConf,
  TMariadbConf,
  TMongoConf,
  TMssqlConf,
  TMysqlConf,
  TOracleConf,
  TPostgresConf,
  TRedshiftConf,
  TConnector,
} from "../types";
import { ConnectorTypeEnum } from "../enums";

/**
 * Connector helper class.
 */
export class ConnectorHelper {
  public constructor(private _builder: Builder) {}

  public parseConnector(
    data: null | Connector,
  ): undefined | TConnector {
    if (!data) return;
    let result: undefined | TConnector = undefined;
    switch (data.confType()) {
      case DatasourceConf.BigqueryConf:
        let bqConf: null | BigqueryConf = null;
        const getBqConf = () => {
          if (!bqConf) {
            bqConf = <BigqueryConf>data.conf(new BigqueryConf());
          }
          return bqConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TBigqueryConf>Object.defineProperties(
                  {},
                  {
                    project: {
                      enumerable: true,
                      get: () => getBqConf().project(),
                    },
                    credentials: {
                      enumerable: true,
                      get: () => getBqConf().credentials(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.ClickhouseConf:
        let chConf: null | ClickhouseConf = null;
        const getChConf = () => {
          if (!chConf) {
            chConf = <ClickhouseConf>data.conf(new ClickhouseConf());
          }
          return chConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TClickhouseConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getChConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getChConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getChConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getChConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getChConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.DruidConf:
        let drConf: null | DruidConf = null;
        const getDrConf = () => {
          if (!drConf) {
            drConf = <DruidConf>data.conf(new DruidConf());
          }
          return drConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TDruidConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getDrConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getDrConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getDrConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getDrConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getDrConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.ElasticsearchConf:
        let elConf: null | ElasticsearchConf = null;
        const getElConf = () => {
          if (!elConf) {
            elConf = <ElasticsearchConf>(
              data.conf(new ElasticsearchConf())
            );
          }
          return elConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TElasticsearchConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getElConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getElConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getElConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getElConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getElConf().ssl(),
                    },
                    region: {
                      enumerable: true,
                      get: () => getElConf().region(),
                    },
                    access: {
                      enumerable: true,
                      get: () => getElConf().access(),
                    },
                    secret: {
                      enumerable: true,
                      get: () => getElConf().secret(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.GsheetsConf:
        let gsConf: null | GsheetsConf = null;
        const getGsConf = () => {
          if (!gsConf) {
            gsConf = <GsheetsConf>data.conf(new GsheetsConf());
          }
          return gsConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TGsheetsConf>Object.defineProperties(
                  {},
                  {
                    meta: {
                      enumerable: true,
                      get: () => getGsConf().meta(),
                    },
                    credentials: {
                      enumerable: true,
                      get: () => getGsConf().credentials(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.IgniteConf:
        let igConf: null | IgniteConf = null;
        const getIgConf = () => {
          if (!igConf) {
            igConf = <IgniteConf>data.conf(new IgniteConf());
          }
          return igConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TIgniteConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getIgConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getIgConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getIgConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getIgConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getIgConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.MariadbConf:
        let mrConf: null | MariadbConf = null;
        const getMrConf = () => {
          if (!mrConf) {
            mrConf = <MariadbConf>data.conf(new MariadbConf());
          }
          return mrConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TMariadbConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getMrConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getMrConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getMrConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getMrConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getMrConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.MongoConf:
        let mnConf: null | MongoConf = null;
        const getMnConf = () => {
          if (!mnConf) {
            mnConf = <MongoConf>data.conf(new MongoConf());
          }
          return mnConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TMongoConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getMnConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getMnConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getMnConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getMnConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getMnConf().ssl(),
                    },
                    schema: {
                      enumerable: true,
                      get: () => getMnConf().schema(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.MssqlConf:
        let msConf: null | MssqlConf = null;
        const getMsConf = () => {
          if (!msConf) {
            msConf = <MssqlConf>data.conf(new MssqlConf());
          }
          return msConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TMssqlConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getMsConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getMsConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getMsConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getMsConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getMsConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.MysqlConf:
        let myConf: null | MysqlConf = null;
        const getMyConf = () => {
          if (!myConf) {
            myConf = <MysqlConf>data.conf(new MysqlConf());
          }
          return myConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TMysqlConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getMyConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getMyConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getMyConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getMyConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getMyConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.OracleConf:
        let orConf: null | OracleConf = null;
        const getOrConf = () => {
          if (!orConf) {
            orConf = <OracleConf>data.conf(new OracleConf());
          }
          return orConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TOracleConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getOrConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getOrConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getOrConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getOrConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getOrConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.PostgresConf:
        let pgConf: null | PostgresConf = null;
        const getPgConf = () => {
          if (!pgConf) {
            pgConf = <PostgresConf>data.conf(new PostgresConf());
          }
          return pgConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TPostgresConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getPgConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getPgConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getPgConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getPgConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getPgConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
      case DatasourceConf.RedshiftConf:
        let rdConf: null | RedshiftConf = null;
        const getRdConf = () => {
          if (!rdConf) {
            rdConf = <RedshiftConf>data.conf(new RedshiftConf());
          }
          return rdConf;
        };
        result = <TConnector>Object.defineProperties(
          {},
          {
            name: {
              enumerable: true,
              get: () => data?.name(),
            },
            type: {
              enumerable: true,
              get: () => data.type(),
            },
            conf: {
              enumerable: true,
              get: () => <TRedshiftConf>Object.defineProperties(
                  {},
                  {
                    host: {
                      enumerable: true,
                      get: () => getRdConf().host(),
                    },
                    port: {
                      enumerable: true,
                      get: () => getRdConf().port(),
                    },
                    user: {
                      enumerable: true,
                      get: () => getRdConf().user(),
                    },
                    pass: {
                      enumerable: true,
                      get: () => getRdConf().pass(),
                    },
                    ssl: {
                      enumerable: true,
                      get: () => getRdConf().ssl(),
                    },
                  },
                ),
            },
          },
        );
        break;
    }
    return result;
  }

  public bufferizeConnector(data: TConnector): number {
    const name = this._builder.createString(data.name);
    let type: DatasourceConf;
    let conf: number;
    switch (data.type) {
      case ConnectorTypeEnum.bigquery:
        type = DatasourceConf.BigqueryConf;
        conf = this.bufferizeBigqueryConf(data.conf);
        break;
      case ConnectorTypeEnum.clickhouse:
        type = DatasourceConf.ClickhouseConf;
        conf = this.bufferizeClickhouseConf(data.conf);
        break;
      case ConnectorTypeEnum.druid:
        type = DatasourceConf.DruidConf;
        conf = this.bufferizeDruidConf(data.conf);
        break;
      case ConnectorTypeEnum.elasticsearch:
        type = DatasourceConf.ElasticsearchConf;
        conf = this.bufferizeElasticsearchConf(data.conf);
        break;
      case ConnectorTypeEnum.gsheets:
        type = DatasourceConf.GsheetsConf;
        conf = this.bufferizeGsheetsConf(data.conf);
        break;
      case ConnectorTypeEnum.ignite:
        type = DatasourceConf.IgniteConf;
        conf = this.bufferizeIgniteConf(data.conf);
        break;
      case ConnectorTypeEnum.mariadb:
        type = DatasourceConf.MariadbConf;
        conf = this.bufferizeMariadbConf(data.conf);
        break;
      case ConnectorTypeEnum.mongodb:
        type = DatasourceConf.MongoConf;
        conf = this.bufferizeMongoConf(data.conf);
        break;
      case ConnectorTypeEnum.mysql:
        type = DatasourceConf.MysqlConf;
        conf = this.bufferizeMysqlConf(data.conf);
        break;
      case ConnectorTypeEnum.oracle:
        type = DatasourceConf.OracleConf;
        conf = this.bufferizeOracleConf(data.conf);
        break;
      case ConnectorTypeEnum.postgresql:
        type = DatasourceConf.PostgresConf;
        conf = this.bufferizePostgresConf(data.conf);
        break;
      case ConnectorTypeEnum.redshift:
        type = DatasourceConf.RedshiftConf;
        conf = this.bufferizeRedshiftConf(data.conf);
        break;
      case ConnectorTypeEnum.sqlserver:
        type = DatasourceConf.MssqlConf;
        conf = this.bufferizeMssqlConf(data.conf);
        break;
    }
    Connector.startConnector(this._builder);
    Connector.addName(this._builder, name);
    Connector.addType(this._builder, data.type);
    Connector.addConfType(this._builder, type);
    Connector.addConf(this._builder, conf);
    return Connector.endConnector(this._builder);
  }

  private bufferizeBigqueryConf(data: TBigqueryConf): number {
    const project = this._builder.createString(data.project);
    const credentials = this._builder.createString(data.credentials);
    return BigqueryConf.createBigqueryConf(
      this._builder,
      project,
      credentials,
    );
  }

  private bufferizeClickhouseConf(data: TClickhouseConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return ClickhouseConf.createClickhouseConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeDruidConf(data: TDruidConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return DruidConf.createDruidConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeElasticsearchConf(
    data: TElasticsearchConf,
  ): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    const region = this._builder.createString(data.region);
    const access = this._builder.createString(data.access);
    const secret = this._builder.createString(data.secret);
    return ElasticsearchConf.createElasticsearchConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
      region,
      access,
      secret,
    );
  }

  private bufferizeGsheetsConf(data: TGsheetsConf): number {
    const meta = this._builder.createString(data.meta);
    const credentials = this._builder.createString(data.credentials);
    return GsheetsConf.createGsheetsConf(
      this._builder,
      meta,
      credentials,
    );
  }

  private bufferizeIgniteConf(data: TIgniteConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return IgniteConf.createIgniteConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeMariadbConf(data: TMariadbConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return MariadbConf.createMariadbConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeMongoConf(data: TMongoConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    const schema = this._builder.createString(data.schema);
    return MongoConf.createMongoConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
      schema,
    );
  }

  private bufferizeMysqlConf(data: TMysqlConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return MysqlConf.createMysqlConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeOracleConf(data: TOracleConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return OracleConf.createOracleConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizePostgresConf(data: TPostgresConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return PostgresConf.createPostgresConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeRedshiftConf(data: TRedshiftConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return RedshiftConf.createRedshiftConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }

  private bufferizeMssqlConf(data: TMssqlConf): number {
    const host = this._builder.createString(data.host);
    const user = this._builder.createString(data.user);
    const pass = this._builder.createString(data.pass);
    return MssqlConf.createMssqlConf(
      this._builder,
      host,
      data.port,
      user,
      pass,
      data.ssl,
    );
  }
}
