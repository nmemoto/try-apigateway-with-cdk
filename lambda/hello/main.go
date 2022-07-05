package main

import (
	"fmt"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Response struct {
	StatusCode int    `json:"statusCode"`
	Body       string `json:"body"`
}

func HandleRequest(request events.APIGatewayProxyRequest) (Response, error) {
	body := fmt.Sprintf("Hello %s!", request.Path)

	return Response{
		StatusCode: 200,
		Body:       body,
	}, nil
}

func main() {
	lambda.Start(HandleRequest)
}
