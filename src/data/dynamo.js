import { DynamoDB } from 'aws-sdk';

export { find, findAll };

const dynamo = new DynamoDB();

async function find(name, id) {

  const params = {
    ExpressionAttributeValues: {
      ':id': {
        S: id,
      },
    },
    KeyConditionExpression: 'id = :id',
    TableName: name,
  };

  return dynamo.query(params).promise();

}

async function findAll(name) {

  const params = {
    TableName: name,
  };

  return dynamo.scan(params).promise();

}
