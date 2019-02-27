package demo

import (
	"log"
	"strconv"
	"time"
)

import (
	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	// Note: Code here will be executed only once, when this middleware is called.
	// That's where you set up all the global objects, connections etc. Everything thta happens one per application lifetime.
	log.Println("demo.Logger: Init Demo middleware")

	return func(c *gin.Context) {
		// Note: Code here will be executed on every request.
		// For a database middleware you simply inject your "global" db object into the context.
		// Once it's inside the context, you can retrieve it from within other middlewares and your handler function.

		t := time.Now()

		// Set example variable
		c.Set("example", "12345")

		// before request

		c.Next()

		// after request
		latency := time.Since(t)
		log.Println("demo.Logger: " + latency.String())

		// access the status we are sending
		status := c.Writer.Status()
		log.Println("demo.Logger: " + strconv.Itoa(status))
	}
}
