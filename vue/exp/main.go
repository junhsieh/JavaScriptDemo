package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Person struct {
	Name    string
	ItemArr []Item
}

type Item struct {
	ID       int
	Name     string
	Qty      int
	ColorArr []string
	IsActive int
}

func main() {
	r := gin.Default()
	r.Static("/static", "./static")
	r.LoadHTMLGlob("templates/*")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tpl.html", gin.H{})
	})

	r.POST("/hello", func(ctx *gin.Context) {
		var err error

		var data struct {
			Name string
		}

		//
		if err = ctx.ShouldBindJSON(&data); err != nil {
			ctx.JSON(http.StatusOK, gin.H{
				"error": err.Error(),
			})
			return
		}

		ctx.JSON(http.StatusOK, gin.H{
			"Hello": "You just provided: " + data.Name,
		})

	})

	r.GET("/person/info", func(ctx *gin.Context) {
		//
	})

	r.POST("/person/save", func(ctx *gin.Context) {
		var err error

		//var data struct {
		//	Name string
		//}
		p1 := Person{}

		// Fill in data
		if err = ctx.ShouldBindJSON(&p1); err != nil {
			ctx.JSON(http.StatusOK, gin.H{
				"error": err.Error(),
			})
			return
		}

		fmt.Printf("HERE is DEBUG INFO:\n")
		fmt.Printf("%#v\n", p1)

		// Save data

		// Response
		ctx.JSON(http.StatusOK, gin.H{
			"Hello":  "You just provided: " + p1.Name,
			"Status": "Person data saved",
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}
