import { Show } from "solid-js";
import { bolt, pulse, warning } from "../icon.mts";

export default function HistoryPrompt(buffer: string, runtime: string, error: string) {
    return (
        <div class="flex flex-wrap gap-2 items-center">
            <div class="flex gap-2 basis-full items-center">
                <span class="text-solar-yellow-300">{bolt}</span>
                <span class="text-solar-green-700 px-3">{runtime} s</span>
                <Show when={error}>
                    <span class="text-solar-red-300 text-2xl">{warning}</span>
                    <span class="text-solar-red-300 pl-1.5">{error}</span>
                </Show>
            </div>
            <span class="text-solar-yellow-500 text-2xl">{pulse}</span>
            <span class="whitespace-pre text-solar-base-1">{buffer}</span>
        </div>
    );
}
