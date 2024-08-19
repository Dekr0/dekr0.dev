## Introduction

- This is repository that contains the source code of my personal website.
- The current state of my personal website is under re-design and re-implementation.
- The UI design is almost identical to the apperance of my day-to-day used terminal, neovim,
and glow (a TUI based markdown viewer). Checkout my dotfile if you're interested in it.
- Currently, this website is lacking the ability of leaving comments in the guestbook page or
booking an appointment for meeting like the old version of this website.
    - They will come back in the future once I get some spare time to port the code
    from the [old branch](https://github.com/Dekr0/dekr0.dev/tree/main/src/pages/api/auth/oauth) away
    from my self-hosted infrastructure (a Linode server with NGINX that ran both PostgreSQL and
    [golang backend](https://github.com/dekwo-dev/messenger) for the guestbook) to other free-tire
    ones.
- The website comes with two version static and interactive. Visitors can switch from one to
another.

### Static Version

- This version is intended for visitors that
    - want minimial amount or zero JavaScript and other non-essential payloads requested every
    time they visit this website,
    - minimal amount or zero visual (eye candy) effects,
    - solely focus on reading contents (articles, blog posting, ...).

### Interactive Version

- This version attempts the basic behaviors of a shell. Visitors can still access different
contents in the website but they need to type in specific commands beforehand.

## TODO

## Optimization List

- Refactor when most features are stable
    - Child components
    - Better state flow
- Optimize for SEO, use semantic HTML tag.
- Profiling
    - Optimize GC and memory
    - Optimize DOM
