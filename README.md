# WowzaStats-v4
Plugin to check current connections of a Wowza Streaming Server.

### Prerequisites

|     OS    | Linux | Windows | SmartOS | OS X |
|:----------|:-----:|:-------:|:-------:|:----:|
| Supported |   v   |    v    |    v    |  v   |


|  Runtime | node.js | npm | Python | Java |
|:---------|:-------:|:---:|:------:|:----:|
| Required |    +    |  +  |        |      |

### Dependencies:
* jsdom@0.2.13
* optimist
* request

### Plugin Setup
None

#### Plugin Configuration Fields

|Field Name |Description                                                                                           |
|:----------|:-----------------------------------------------------------------------------------------------------|
|URL        |The URL of the server to poll. Include Username and password. Ex.                                     |
|           |--------------------------------------------http://username:passsword@127.0.0.1:8086/connectioncounts |
|Interval   |Interval to run poll server at.  Defaults to 1000ms = 1 second                                        |
|Delay      |Delay to run the poll at.  Defaults to 1000ms = 1 second                                              |
|Source     |The Source to display in the legend for the Wowza data.  It will default to Wowza-Stats               |


### Metrics
The following metrics are returned. 
 * WOWZA_CONNECTIONS_CURRENT
 * WOWZA_CONNECTIONS_TOTAL
 * WOWZA_CONNECTIONS_BYTES_IN
 * WOWZA_CONNECTIONS_BYTES_OUT
