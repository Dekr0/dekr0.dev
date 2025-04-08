export type Project = {
    name: string
    url: string
    p: string
}

export const open_source: Project[] = [
    {
        name: "Helldivers 2 Audio Modding Tool",
        url: "https://github.com/RaidingForPants/hd2-audio-modder",
        p: `This is an audio modding tool for Helldivers 2 that provides a 
            convenient way of exploring, export, and modifying SFX assets and 
            music track. I'm currently focus on developing workflow automation 
            via external scripting and CLI so that users can import / export, 
            modify, and create audio mods with minimal amount of manual work.`
    },
    {
        name: "Helldivers 2 Audio Assets Database",
        url: "http://github.com/Dekr0/hd2_audio_db",
        p: `This is a database of SFX assets (Wwise) in Helldivers 2. The 
            database stores basic information and human-readable label of 
            all SFX assets and how they may be used by the Stingray game engine. 
            It's part of the integration with the audio modding tool to assist
            query and explore SFX assets. It also comes with a CLI for export 
            binary content of SFX assets and XML analysis from Wwiser. This is 
            useful for users who want to manually adjust parameters in the SFX 
            asset via hex editor.`
    },
    {
        name: "RPC.nvim",
        url: "https://github.com/Dekr0/RPC.nvim",
        p: `RPC.nvim is a Neovim plugin that integrates Discord Rich Presence, 
            displaying live status (keystroke per minute, editor mode, current 
            workspace, etc.) update from Neovim and directly to users' Discord 
            profiles.`
    },
    {
        name: "8086 Simulator",
        url: "https://github.com/Dekr0/8086-sim",
        p: `8086 simulator is a set of tools for 8086 instructions set that 
            capable of dissembling binary assembly code, simulating instructions 
            execution, and outputting dissemble result and simulation result. An 
            TUI visualizer similar to GDB is provided to display the internal 
            state of the virtual 8086 CPU and the 1 MB virtual memory.`
    }
];

export const reinvent_wheel: Project[] = [
    {
        name: "HTTP Server",
        url: "https://github.com/Dekr0/c-http",
        p: `a HTTP server written in C, capable of parsing HTTP message efficiently, 
            perform simple dynamic endpoint routing, and handling multiple concurrent 
            client connections.`
    }
]
