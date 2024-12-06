export default function Anchor(props) {
    return (
        <a 
            href={props.url}
            class="text-center underline underline-offset-2 text-solar-cyna-500 hover:text-solar-cyna-300 animate-ease-in-out"
            target="_blank">
            {props.name}
        </a>
    )
}
