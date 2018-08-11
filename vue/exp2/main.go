package main

import (
	"net/http"
)

import (
	"github.com/gin-gonic/gin"
)

import (
	"github.com/junxie6/JavaScriptDemo/vue/exp2/core/middleware/demo"
	"github.com/junxie6/JavaScriptDemo/vue/exp2/module/exp"
)

func main() {
	// Config Gin
	//gin.SetMode(gin.ReleaseMode)
	gin.SetMode(gin.DebugMode)

	// Create a new router
	r := gin.New()

	// Config router
	r.LoadHTMLGlob("template/*")

	r.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	// Load middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	//
	r1 := r.Group("/")
	r1.Use(demo.Logger())

	r1.Use()
	{
		r1.GET("/", func(c *gin.Context) {
			c.HTML(http.StatusOK, "index.tmpl", gin.H{
				"title": "Main website",
			})
		})

		r1.Static("/dist", "./dist")

		r1.GET("/demo", exp.SrvDemo)
	}

	r.Run(":8080")
}
