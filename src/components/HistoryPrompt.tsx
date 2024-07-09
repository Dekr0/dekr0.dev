import { bolt, pulse, warning } from "../icon.mts";

export default function HistoryPrompt(buffer: string, runtime: string, error: string) {
    return (
        <div class="flex flex-wrap gap-2 items-center lg:text-lg">
            <div class="basis-full gap-2 items-center">
                <i class="text-[#0f8493] pt-0.5">{bolt}</i>
                <span class="text-[#4d8206] pl-[18px] pr-[22px] font-mono pt-1">{runtime} s</span>
                {error && <i class="text-[#d11141]">{warning}</i>}
                {error && <span class="text-[#d11141] px-3 font-mono pt-1">{error}</span>}
            </div>
            <i class="text-solar-yellow-500">{pulse}</i>
            <span class="whitespace-pre text-solar-base-1 font-mono">{buffer}</span>
        </div>
    );
}
