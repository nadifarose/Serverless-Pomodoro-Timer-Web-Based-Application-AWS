const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { userId, sessionId, duration, completedAt } = JSON.parse(event.body);

    const params = {
        TableName: 'PomodoroSessions',
        Item: {
            userId: userId,
            sessionId: sessionId,
            duration: duration,
            completedAt: completedAt
        }
    };

    try {
        await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Session logged successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to log session', error: error.message })
        };
    }
};
