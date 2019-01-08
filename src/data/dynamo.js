import { DynamoDB } from 'aws-sdk';

export default findAll;

const dynamo = new DynamoDB();

async function findAll(name) {

  const params = {
    // ExpressionAttributeValues: {
    //   ":v1": {
    //     S: "No One You Know"
    //   }
    // },
    // KeyConditionExpression: "Artist = :v1",
    // ProjectionExpression: "SongTitle",
    TableName: name,
  };

  return dynamo.scan(params).promise();

}
