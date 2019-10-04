# Error handling

| Error type                | Action type (s)                                                                        |
|---------------------------|----------------------------------------------------------------------------------------|
| GraphQl query error       | Display error component (Message) <br>or<br>Open AppMessage and display error                |
| GraphQl mutation error    | Open AppMessage and display error <br>or<br>Set internal error state and display error component |
| React error during render | Set up boundary component                                                              |

