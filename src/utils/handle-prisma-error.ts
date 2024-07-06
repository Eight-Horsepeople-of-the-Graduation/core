import { Response } from "express";
import { HttpStatus } from "@enums/http-status.enum";
export default function handlePrismaError(
  code: string,
  meta: Record<string, any> | undefined,
  res: Response
) {
  switch (code) {
    case "P2000":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `The provided value for the column is too long for the column's type. Column: ${meta?.columnName}`,
      });
    case "P2001":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `The record searched for in the where condition (${meta?.modelName}.${meta?.argumentName} = ${meta?.argumentValue}) does not exist`,
      });
    case "P2002":
      return res.status(HttpStatus.CONFLICT).send({
        status: HttpStatus.CONFLICT,
        message: `Unique constraint failed on the "${meta?.target}" field(s) for the ${meta?.modelName} Entity`,
      });
    case "P2003":
      console.log
      return res.status(HttpStatus.CONFLICT).send({
        status: HttpStatus.CONFLICT,
        message: `Foreign key constraint failed on the field: ${meta?.field_name}`,
      });
    case "P2004":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `A constraint failed on the database: ${meta?.databaseError}`,
      });
    case "P2005":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `The value ${meta?.fieldValue} stored in the database for the field ${meta?.fieldName} is invalid for the field's type`,
      });
    case "P2006":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `The provided value ${meta?.fieldValue} for ${meta?.modelName} field ${meta?.fieldName} is not valid`,
      });
    case "P2007":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Data validation error ${meta?.databaseError}`,
      });
    case "P2008":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Failed to parse the query ${meta?.queryParsingError} at ${meta?.queryPosition}`,
      });
    case "P2009":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Failed to validate the query: ${meta?.queryValidationError} at ${meta?.queryPosition}`,
      });
    case "P2010":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Raw query failed. Code: ${meta?.code}. Message: ${meta?.message}`,
      });
    case "P2011":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Null constraint violation on the ${meta?.constraint}`,
      });
    case "P2012":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Missing a required value at ${meta?.path}`,
      });
    case "P2013":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Missing the required argument ${meta?.argumentName} for field ${meta?.fieldName} on ${meta?.objectName}`,
      });
    case "P2014":
      return res.status(HttpStatus.CONFLICT).send({
        status: HttpStatus.CONFLICT,
        message: `The change you are trying to make would violate the required relation '${meta?.relationName}' between the ${meta?.modelAName} and ${meta?.modelBName} models`,
      });
    case "P2015":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `A related record could not be found. ${meta?.details}`,
      });
    case "P2016":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Query interpretation error. ${meta?.details}`,
      });
    case "P2017":
      return res.status(HttpStatus.CONFLICT).send({
        status: HttpStatus.CONFLICT,
        message: `The records for relation ${meta?.relationName} between the ${meta?.parentName} and ${meta?.childName} models are not connected`,
      });
    case "P2018":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `The required connected records were not found. ${meta?.details}`,
      });
    case "P2019":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Input error. ${meta?.details}`,
      });
    case "P2020":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Value out of range for the type. ${meta?.details}`,
      });
    case "P2021":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `The table ${meta?.table} does not exist in the current database`,
      });
    case "P2022":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `The column ${meta?.column} does not exist in the current database`,
      });
    case "P2023":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Inconsistent column data: ${meta?.message}`,
      });
    case "P2024":
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).send({
        status: HttpStatus.SERVICE_UNAVAILABLE,
        message: `Timed out fetching a new connection from the connection pool. (More info: http://pris.ly/d/connection-pool (Current connection pool timeout: ${meta?.timeout}, connection limit: ${meta?.connectionLimit}))`,
      });
    case "P2025":
      return res.status(HttpStatus.NOT_FOUND).send({
        status: HttpStatus.NOT_FOUND,
        message: `${meta?.modelName || "Record"} not found`,
      });
    case "P2026":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `The current database provider doesn't support a feature that the query used: ${meta?.feature}`,
      });
    case "P2027":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Multiple errors occurred on the database during query execution: ${meta?.errors}`,
      });
    case "P2028":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Transaction API error: ${meta?.error}`,
      });
    case "P2029":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Query parameter limit exceeded error: ${meta?.message}`,
      });
    case "P2030":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema`,
      });
    case "P2031":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set`,
      });
    case "P2033":
      return res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: `A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers`,
      });
    case "P2034":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Transaction failed due to a write conflict or a deadlock. Please retry your transaction`,
      });
    case "P2035":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Assertion violation on the database: ${meta?.databaseError}`,
      });
    case "P2036":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error in external connector (id ${meta?.id})`,
      });
    case "P2037":
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Too many database connections opened: ${meta?.message}`,
      });
    default:
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Something went wrong",
      });
  }
}
