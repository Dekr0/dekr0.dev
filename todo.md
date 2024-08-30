## Unlikely To Do List

- I don't expect a lot of people visiting this site. The following to do item 
won't happen unless thing become bad.

## Performance

- Doing a throughout profile on the server and client. 

## Static content rendering

- I feel like I might abuse Astro component template even though hydration 
in SSR and render is quiet fast in Astro.

### Terminal 

- The state flow got quiet out of hand quickly when I was writing it. I cut 
different corners just to make thing work as close to a terminal.

### Guest book

- Find grain control on how comments should be updated in the UI. Right now the 
comment section is completely erase, fetch all comments, and then render the 
whole section again.
- There's desync between SSE and database change. Right now, the solution is 
is reopen an SSE and extend each SSE (1 minutes). The further away from the server, 
the worse it becomes.
- Security relative issues, particularly comments deletion.
