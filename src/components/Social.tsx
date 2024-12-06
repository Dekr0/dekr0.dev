import type { Social } from "src/social.mts";

export default function Socials(props: Social) {
    return (
        <li class="underline underline-offset-2 hover:text-solar-cyna-300 animate-ease-in-out text-sm xs:text-base">
            <a class="text-center" href={props.url} target="_blank">
                <span>{props.icon}</span> <span>{props.text}</span>
            </a>
        </li>
    )
}
