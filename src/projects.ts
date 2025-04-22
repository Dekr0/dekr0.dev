export type Project = {
    name: string
    url: string
    p: string
}

export const open_source: Project[] = [
    {
        name: "Wwise Teller",
        url: "https://github.com/Dekr0/wwise-teller",
        p: `Wwise teller is a SDK built in ImGUI to editing data of generated 
            Wwise sound banks. Wwise teller essentially attemp to replicate 
            different functionalities in Wwise sound engine authoring tool.
            Currently, wwise teller is only targeting toward sound bank version 
            141. This sound bank version is targeting version used by Helldivers 
            2.`
    },
    {
        name: "Shutil",
        url: "https://github.com/Dekr0/shutil",
        p: `Shutil is a CLI application built in Go. It includes a set of 
            automation and workflow optimization that is specifically for my 
            personal development environment in Linux and Windows`
    },
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
            asset via hex editor, or want to use hd2-audio-modder as a library 
            to automate the process of editing sound bank.`
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
    },
    {
        name: "Auto Scaler",
        url: "https://github.com/Dekr0/auto-scaler",
        p: `a bare bond implementation of an auto scaler for web services 
        using docker swarm and Queuing Theory.`
    },
    {
        name: "C Shell",
        url: "https://github.com/Dekr0/sh-clone",
        p: `a bare bone implementation of a terminal shell with a small number 
        of essential commands.`
    }
]

export const legacy_school_projects: Project[] = [
    {
        name: "CSTC",
        url: "https://github.com/CMPUT-492-W2023-Capstone",
        p: `A traffic counter powered by YOLO real-time object detection system`
    },
    {
        name: "Nosh",
        url: "https://github.com/Dekr0/nosh",
        p: `A prototype meal planning android application`
    }
]
