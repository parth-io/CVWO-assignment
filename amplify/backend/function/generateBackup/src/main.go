package main

import (
	"context"
	"fmt"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"log"
	"time"
)

type MyEvent struct {
	Name string `json:"name"`
}

func HandleRequest(ctx context.Context, name MyEvent) (string, error) {
	// Using the SDK's default configuration, loading additional config
	// and credentials values from the environment variables, shared
	// credentials, and shared configuration files
	cfg, err := config.LoadDefaultConfig(context.TODO(),
		config.WithRegion("ap-southeast-1"),
	)
	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	// Create the DynamoDB client
	svc := dynamodb.NewFromConfig(cfg)

	// Build the request with its input parameters
	resp, err := svc.ListTables(context.TODO(), &dynamodb.ListTablesInput{
		Limit: aws.Int32(5),
	})
	if err != nil {
		log.Fatalf("failed to list tables, %v", err)
	}

	fmt.Println("Tables:")
	for _, tableName := range resp.TableNames {
		fmt.Println(tableName)
	}

	t0 := time.Now()
	fmt.Printf("\nIt begins at %v\n", t0)

	bucketName := "cvwo-backup"
	TableArn := "arn:aws:dynamodb:ap-southeast-1:842585766221:table/User-i67zisjnmja6xmjyue5olc62ji-dev"
	S3BucketOwner := "842585766221"
	S3Prefix := "userBackup"

	output, err2 := svc.ExportTableToPointInTime(context.TODO(), &dynamodb.ExportTableToPointInTimeInput{
		S3Bucket:      &bucketName,
		TableArn:      &TableArn,
		S3BucketOwner: &S3BucketOwner,
		S3Prefix:      &S3Prefix,
	})

	if err2 != nil {
		log.Fatalf("unable to do backup, %v\n", err2)
	} else {
		fmt.Printf("%+v\n", output.ResultMetadata)
	}

	return fmt.Sprintf(""), nil
}

func main() {
	lambda.Start(HandleRequest)
}
