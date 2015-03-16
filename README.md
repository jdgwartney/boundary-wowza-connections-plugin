# boundary-wowza-connections-plugin
Plugin to check current connections of a Wowza Streaming Server.

### Prerequisites

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    v    |  v   |


|  Runtime | node.js | Python | Java |
|:---------|:-------:|:------:|:----:|
| Required |    +    |        |      |

###@ Dependencies:
* jsdom@0.2.13
* optimist
* request

- [How to install node.js?](https://help.boundary.com/hc/articles/202360701)

### Plugin Setup
None

#### Plugin Configuration Fields

|Field Name |Description                                                                                           |
|:----------|:-----------------------------------------------------------------------------------------------------|
|URL        |The URL of the server to poll. Include Username and password. Ex.                                     |
|           |                                              http://wowza:i-bcde6cef@localhost:8086/connectioncounts |
|Interval   |Interval to run poll server at.  Defaults to 1000ms = 1 second                                        |
|Source     |The Source to display in the legend for the Wowza data.  It will default to the hostname of the server|
