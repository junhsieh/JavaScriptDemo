package main

import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()
	r.Static("/static", "./static")
	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tpl.html", gin.H{})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}
