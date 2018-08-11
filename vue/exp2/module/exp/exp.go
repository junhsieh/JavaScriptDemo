package exp

import (
	"net/http"
)

import (
	"github.com/gin-gonic/gin"
)

func SrvDemo(c *gin.Context) {
	out := gin.H{}

	defer func(c *gin.Context, out gin.H) {
		c.JSON(http.StatusOK, out)
	}(c, out)

	//
	out["status"] = "demo"
	return
}
