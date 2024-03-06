## TODO
---
### Redesign
---
- websocket endpoint should not run alongside with other regular DB CRUD 
endpoint at the same server
- client-side JS should not just directly websocket into the DB server with the 
risk of exposing IP
    - add another layer (load balancer, proxy, ...)
    - add rate limiting
- spin off a redis for view count only
