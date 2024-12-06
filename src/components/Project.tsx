import Anchor from "./Anchor"

export default function Project(props) {
    return (
        <h3 class="font-bold w-fit">
            <Anchor name={`### ${props.name}`} url={props.url}/>
            <p class="font-normal text-justify">{props.p}</p>
        </h3>
    );
}
